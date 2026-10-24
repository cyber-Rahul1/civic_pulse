import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ForbiddenException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CivicLogger } from '@civic-pulse/nest-common';
import { MediaService, IMediaProvider } from './media.service';
import { DatabaseService } from '../database/database.service';

describe('MediaService Security Hardening Tests', () => {
  const mediaStore = new Map<string, any>();

  const createMockDb = () => ({
    mediaUploads: {
      insertOne: jest.fn(async (doc: any) => {
        mediaStore.set(doc._id, { ...doc });
        return { insertedId: doc._id };
      }),
      findOne: jest.fn(async (query: any) => {
        return mediaStore.get(query._id) || null;
      }),
      updateOne: jest.fn(async (query: any, update: any) => {
        const doc = mediaStore.get(query._id);
        if (!doc) return { modifiedCount: 0 };
        if (update.$set) Object.assign(doc, update.$set);
        return { modifiedCount: 1 };
      }),
    },
  });

  describe('Missing or Placeholder Credentials', () => {
    it('should reject signUpload with ServiceUnavailableException when credentials are unconfigured', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          MediaService,
          CivicLogger,
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn(() => undefined),
            },
          },
          {
            provide: DatabaseService,
            useValue: createMockDb(),
          },
        ],
      }).compile();

      const service = module.get<MediaService>(MediaService);
      await expect(
        service.generateUploadSignature('user-1', { resourceType: 'image' }),
      ).rejects.toThrow(ServiceUnavailableException);
    });

    it('should reject signUpload with ServiceUnavailableException when placeholder credentials are used', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          MediaService,
          CivicLogger,
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn((key: string) => {
                if (key === 'CLOUDINARY_CLOUD_NAME') return 'placeholder_cloud';
                if (key === 'CLOUDINARY_API_KEY') return 'placeholder_key';
                if (key === 'CLOUDINARY_API_SECRET') return 'placeholder_secret';
                return undefined;
              }),
            },
          },
          {
            provide: DatabaseService,
            useValue: createMockDb(),
          },
        ],
      }).compile();

      const service = module.get<MediaService>(MediaService);
      await expect(
        service.generateUploadSignature('user-1', { resourceType: 'image' }),
      ).rejects.toThrow(ServiceUnavailableException);
    });
  });

  describe('Mock Provider Execution & Asset Pre-authorization', () => {
    let service: MediaService;
    let mockDb: any;

    beforeEach(async () => {
      mediaStore.clear();
      mockDb = createMockDb();

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          MediaService,
          CivicLogger,
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn(() => undefined),
            },
          },
          {
            provide: DatabaseService,
            useValue: mockDb,
          },
        ],
      }).compile();

      service = module.get<MediaService>(MediaService);

      const mockProvider: IMediaProvider = {
        isConfigured: () => true,
        generateSignature: ({ folder, publicId, timestamp }) => ({
          signature: `mock_sig_${folder}_${publicId}_${timestamp}`,
          apiKey: 'mock_api_key_test',
          cloudName: 'mock_cloud_test',
        }),
        verifyAsset: async (publicId: string, resourceType: 'image' | 'video') => {
          // If the publicId ends with '_missing', simulate asset not found in Cloudinary
          if (publicId.includes('missing')) {
            return null;
          }
          if (publicId.includes('format_mismatch')) {
            return {
              publicId,
              resourceType,
              format: 'exe',
              bytes: 1024,
              url: `http://res.cloudinary.com/mock/${publicId}.exe`,
              secureUrl: `https://res.cloudinary.com/mock/${publicId}.exe`,
            };
          }
          if (publicId.includes('oversized')) {
            return {
              publicId,
              resourceType,
              format: 'jpg',
              bytes: 20000000, // 20MB > 10MB
              url: `http://res.cloudinary.com/mock/${publicId}.jpg`,
              secureUrl: `https://res.cloudinary.com/mock/${publicId}.jpg`,
            };
          }
          return {
            publicId,
            resourceType,
            format: 'jpg',
            bytes: 2048576,
            url: `http://res.cloudinary.com/mock/${publicId}.jpg`,
            secureUrl: `https://res.cloudinary.com/mock/${publicId}.jpg`,
          };
        },
      };
      service.setCustomProvider(mockProvider);
    });

    it('should issue signature and store pre-authorization record using mock provider', async () => {
      const result = await service.generateUploadSignature('user-123', {
        resourceType: 'image',
      });

      expect(result.signature).toContain('mock_sig_');
      expect(result.apiKey).toBe('mock_api_key_test');
      expect(result.uploadFolder).toBe('civic_pulse/uploads/user-123');
      expect(result.publicId).toBeDefined();

      const savedPreAuth = mediaStore.get(result.publicId);
      expect(savedPreAuth).toBeDefined();
      expect(savedPreAuth.userId).toBe('user-123');
      expect(savedPreAuth.isAttached).toBe(false);
    });

    it('should reject attachment if asset was authorized but never uploaded to provider', async () => {
      const upload = await service.generateUploadSignature('user-123', {
        resourceType: 'image',
      });
      // Force publicId to simulate missing asset on provider
      const missingId = `${upload.publicId}_missing`;
      mediaStore.set(missingId, {
        ...mediaStore.get(upload.publicId),
        _id: missingId,
        mediaId: missingId,
      });

      await expect(
        service.validateAndSanitizeMedia(
          [
            {
              mediaId: 'med_m',
              publicId: missingId,
              url: 'https://res.cloudinary.com/sample/image/upload/missing.jpg',
              secureUrl: 'https://res.cloudinary.com/sample/image/upload/missing.jpg',
              format: 'jpg',
              resourceType: 'image',
              bytes: 1024,
            },
          ],
          'user-123',
        ),
      ).rejects.toThrow('has not been uploaded to Cloudinary or does not exist');
    });

    it('should reject attachment with ForbiddenException if publicId was forged / not generated', async () => {
      await expect(
        service.validateAndSanitizeMedia(
          [
            {
              mediaId: 'med_1',
              publicId: 'forged_unauthorized_public_id',
              url: 'https://res.cloudinary.com/sample/image/upload/forged.jpg',
              secureUrl: 'https://res.cloudinary.com/sample/image/upload/forged.jpg',
              format: 'jpg',
              resourceType: 'image',
              bytes: 1024,
            },
          ],
          'user-123',
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject attachment with ForbiddenException if asset belongs to another user', async () => {
      const upload = await service.generateUploadSignature('user-123', {
        resourceType: 'image',
      });

      // Another user attempts to attach user-123's asset
      await expect(
        service.validateAndSanitizeMedia(
          [
            {
              mediaId: 'med_2',
              publicId: upload.publicId,
              url: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              secureUrl: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              format: 'jpg',
              resourceType: 'image',
              bytes: 1024,
            },
          ],
          'attacker-user-456',
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject attachment if asset has already been attached to a report', async () => {
      const upload = await service.generateUploadSignature('user-123', {
        resourceType: 'image',
      });

      // Attach once
      await service.validateAndSanitizeMedia(
        [
          {
            mediaId: 'med_first',
            publicId: upload.publicId,
            url: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
            secureUrl: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
            format: 'jpg',
            resourceType: 'image',
            bytes: 2048576,
          },
        ],
        'user-123',
        'report-1',
      );

      // Attempt to attach again to report-2
      await expect(
        service.validateAndSanitizeMedia(
          [
            {
              mediaId: 'med_second',
              publicId: upload.publicId,
              url: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              secureUrl: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              format: 'jpg',
              resourceType: 'image',
              bytes: 2048576,
            },
          ],
          'user-123',
          'report-2',
        ),
      ).rejects.toThrow('has already been attached to report');
    });

    it('should reject oversized uploads based on verified provider byte size', async () => {
      const upload = await service.generateUploadSignature('user-123', {
        resourceType: 'image', // limit 10MB = 10485760
      });
      const oversizedId = `${upload.publicId}_oversized`;
      mediaStore.set(oversizedId, {
        ...mediaStore.get(upload.publicId),
        _id: oversizedId,
      });

      await expect(
        service.validateAndSanitizeMedia(
          [
            {
              mediaId: 'med_3',
              publicId: oversizedId,
              url: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              secureUrl: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              format: 'jpg',
              resourceType: 'image',
              bytes: 1024, // Client lies, but provider reports 20MB
            },
          ],
          'user-123',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject invalid formats based on verified provider format', async () => {
      const upload = await service.generateUploadSignature('user-123', {
        resourceType: 'image',
      });
      const formatMismatchId = `${upload.publicId}_format_mismatch`;
      mediaStore.set(formatMismatchId, {
        ...mediaStore.get(upload.publicId),
        _id: formatMismatchId,
      });

      await expect(
        service.validateAndSanitizeMedia(
          [
            {
              mediaId: 'med_4',
              publicId: formatMismatchId,
              url: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              secureUrl: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              format: 'jpg', // Client claims jpg, but provider verifies exe
              resourceType: 'image',
              bytes: 2048,
            },
          ],
          'user-123',
        ),
      ).rejects.toThrow('Verified media format "exe" is not permitted');
    });

    it('should reject concurrent attachment collision with 400 Bad Request', async () => {
      const upload = await service.generateUploadSignature('user-123', {
        resourceType: 'image',
      });

      // Simulate atomic conditional lock collision
      mockDb.mediaUploads.updateOne.mockImplementationOnce(async () => ({
        modifiedCount: 0, // Concurrent lock lost
      }));

      await expect(
        service.validateAndSanitizeMedia(
          [
            {
              mediaId: 'med_race',
              publicId: upload.publicId,
              url: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              secureUrl: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
              format: 'jpg',
              resourceType: 'image',
              bytes: 2048576,
            },
          ],
          'user-123',
          'report-1',
        ),
      ).rejects.toThrow('was attached concurrently by another request');
    });

    it('should successfully attach valid authorized media and mark as attached', async () => {
      const upload = await service.generateUploadSignature('user-123', {
        resourceType: 'image',
      });

      const sanitized = await service.validateAndSanitizeMedia(
        [
          {
            mediaId: 'med_5',
            publicId: upload.publicId,
            url: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
            secureUrl: 'https://res.cloudinary.com/sample/image/upload/test.jpg',
            format: 'jpg',
            resourceType: 'image',
            bytes: 2048576,
          },
        ],
        'user-123',
        'report-999',
      );

      expect(sanitized).toHaveLength(1);
      expect(sanitized[0]?.publicId).toBe(upload.publicId);
      expect(sanitized[0]?.uploadedByUserId).toBe('user-123');

      const updatedPreAuth = mediaStore.get(upload.publicId);
      expect(updatedPreAuth.isAttached).toBe(true);
      expect(updatedPreAuth.attachedToReportId).toBe('report-999');
    });
  });
});
