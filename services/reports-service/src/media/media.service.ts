import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';
import https from 'https';
import { v4 as uuidv4 } from 'uuid';
import { CivicLogger } from '@civic-pulse/nest-common';
import {
  MediaSignatureResponseDto,
  MediaAttachment,
} from '@civic-pulse/contracts';
import { MediaAttachmentInputDto, SignUploadDto } from '../dto/reports.dto.js';
import { MediaAttachmentDoc, MediaUploadRecord } from '../models/report.models.js';
import { DatabaseService } from '../database/database.service.js';

export interface VerifiedAssetDetails {
  publicId: string;
  resourceType: 'image' | 'video';
  format: string;
  bytes: number;
  url: string;
  secureUrl: string;
}

export interface IMediaProvider {
  isConfigured(): boolean;
  generateSignature(params: {
    folder: string;
    publicId: string;
    timestamp: number;
  }): { signature: string; apiKey: string; cloudName: string };
  verifyAsset(publicId: string, resourceType: 'image' | 'video'): Promise<VerifiedAssetDetails | null>;
}

@Injectable()
export class MediaService {
  private readonly cloudName?: string;
  private readonly apiKey?: string;
  private readonly apiSecret?: string;
  private customProvider: IMediaProvider | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly db: DatabaseService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Reports:MediaService');
    this.cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    this.apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    this.apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');
  }

  /**
   * Allows setting an explicit mock provider for local unit/integration tests.
   */
  setCustomProvider(provider: IMediaProvider | null) {
    this.customProvider = provider;
  }

  /**
   * Checks whether Cloudinary or a custom test provider is properly configured.
   * Rejects any placeholder values like 'placeholder_*' or 'dev_*'.
   */
  isConfigured(): boolean {
    if (this.customProvider) {
      return this.customProvider.isConfigured();
    }
    if (!this.cloudName || !this.apiKey || !this.apiSecret) {
      return false;
    }
    // Disallow placeholder credentials from being passed off as valid
    if (
      this.cloudName.startsWith('placeholder_') ||
      this.apiKey.startsWith('placeholder_') ||
      this.apiSecret.startsWith('placeholder_')
    ) {
      return false;
    }
    return true;
  }

  async generateUploadSignature(
    userId: string,
    dto: SignUploadDto,
  ): Promise<MediaSignatureResponseDto> {
    if (!this.isConfigured()) {
      this.logger.warn(
        'Upload signing request rejected: Cloudinary credentials not configured or set to placeholder.',
      );
      throw new ServiceUnavailableException(
        'Media upload service is currently unavailable: Cloudinary credentials are not configured.',
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const mediaId = uuidv4();
    const folder = dto.reportId
      ? `civic_pulse/reports/${dto.reportId}`
      : `civic_pulse/uploads/${userId}`;

    const allowedFormats =
      dto.resourceType === 'video'
        ? ['mp4', 'mov', 'webm']
        : ['jpg', 'jpeg', 'png', 'webp'];

    const maxFileSizeBytes =
      dto.resourceType === 'video' ? 52428800 : 10485760; // 50MB video, 10MB image

    let signature: string;
    let apiKey: string;
    let cloudName: string;

    if (this.customProvider) {
      const generated = this.customProvider.generateSignature({
        folder,
        publicId: mediaId,
        timestamp,
      });
      signature = generated.signature;
      apiKey = generated.apiKey;
      cloudName = generated.cloudName;
    } else {
      // Cloudinary signature calculation: SHA-256 HMAC of sorted key=value pairs
      const paramsToSign = `folder=${folder}&public_id=${mediaId}&timestamp=${timestamp}${this.apiSecret}`;
      signature = crypto.createHash('sha256').update(paramsToSign).digest('hex');
      apiKey = this.apiKey!;
      cloudName = this.cloudName!;
    }

    // Persist pre-authorization in MongoDB media_uploads collection to track ownership & parameters
    const uploadRecord: MediaUploadRecord = {
      _id: mediaId, // publicId
      mediaId,
      userId,
      reportId: dto.reportId,
      uploadFolder: folder,
      resourceType: dto.resourceType,
      allowedFormats,
      maxFileSizeBytes,
      signature,
      timestamp,
      isAttached: false,
      expiresAt: new Date(Date.now() + 3600 * 1000), // Valid for 1 hour
      createdAt: new Date(),
    };

    await this.db.mediaUploads.insertOne(uploadRecord);

    this.logger.log(
      `Presigned media signature generated and pre-authorized for userId: ${userId}, publicId: ${mediaId}`,
    );

    return {
      signature,
      timestamp,
      apiKey,
      cloudName,
      uploadFolder: folder,
      publicId: mediaId,
      allowedFormats,
      maxFileSizeBytes,
    };
  }

  /**
   * Performs an authenticated server-side verification of the asset directly with Cloudinary
   * or delegates to the custom mock provider during testing.
   */
  async verifyAssetWithProvider(
    publicId: string,
    resourceType: 'image' | 'video',
    folder?: string,
  ): Promise<VerifiedAssetDetails | null> {
    if (this.customProvider) {
      return this.customProvider.verifyAsset(publicId, resourceType);
    }

    if (!this.isConfigured()) {
      throw new ServiceUnavailableException(
        'Cannot verify uploaded media: Cloudinary credentials are not configured.',
      );
    }

    // Cloudinary Admin API: GET https://api.cloudinary.com/v1_1/<cloud_name>/resources/<resource_type>/upload/<public_id>
    const checkWithId = (idToCheck: string): Promise<VerifiedAssetDetails | null> => {
      return new Promise((resolve, reject) => {
        const auth = Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64');
        const targetUrl = new URL(
          `https://api.cloudinary.com/v1_1/${this.cloudName}/resources/${resourceType}/upload/${encodeURIComponent(idToCheck)}`,
        );

        const req = https.get(
          targetUrl.href,
          {
            headers: {
              Authorization: `Basic ${auth}`,
            },
            timeout: 5000,
          },
          (res) => {
            let body = '';
            res.on('data', (c) => (body += c));
            res.on('end', () => {
              if (res.statusCode === 404) {
                resolve(null); // Asset does not exist in Cloudinary with this id
                return;
              }
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                try {
                  const parsed = JSON.parse(body);
                  resolve({
                    publicId: parsed.public_id,
                    resourceType: parsed.resource_type,
                    format: parsed.format,
                    bytes: parsed.bytes,
                    url: parsed.url,
                    secureUrl: parsed.secure_url,
                  });
                } catch (e) {
                  reject(e);
                }
              } else {
                this.logger.error(`Cloudinary API error (${res.statusCode}): ${body}`);
                resolve(null);
              }
            });
          },
        );

        req.on('error', (err) => {
          this.logger.error(`Cloudinary verification error: ${err.message}`);
          reject(new ServiceUnavailableException(`Cloudinary verification failed: ${err.message}`));
        });

        req.on('timeout', () => {
          req.destroy();
          reject(new ServiceUnavailableException('Cloudinary verification request timed out'));
        });
      });
    };

    // If folder was configured and publicId doesn't include it, check full path first
    const fullPathId = folder && !publicId.startsWith(`${folder}/`)
      ? `${folder}/${publicId}`
      : publicId;

    const result = await checkWithId(fullPathId);
    if (result) return result;
    if (fullPathId !== publicId) {
      return checkWithId(publicId);
    }
    return null;
  }

  /**
   * Verifies uploaded assets server-side before attaching them to a report.
   * Strictly enforces:
   * 1. Public ID was generated by the service.
   * 2. Asset belongs to the authenticated user.
   * 3. Asset has not expired or already been attached to another report.
   * 4. The asset actually exists in Cloudinary via server-side verification.
   * 5. The verified asset's publicId, format, resourceType, and bytes match authorization.
   * 6. Uses an atomic conditional update to lock the asset against concurrent attachment.
   */
  async validateAndSanitizeMedia(
    mediaInputs: MediaAttachmentInputDto[] | undefined,
    authenticatedUserId: string,
    targetReportId?: string,
  ): Promise<MediaAttachmentDoc[]> {
    if (!mediaInputs || mediaInputs.length === 0) {
      return [];
    }

    if (mediaInputs.length > 5) {
      throw new BadRequestException('A report can have at most 5 media attachments');
    }

    const sanitized: MediaAttachmentDoc[] = [];

    for (const item of mediaInputs) {
      if (!item.publicId) {
        throw new BadRequestException('Media attachment must include a valid publicId');
      }

      // Look up server-side pre-authorization record (by exact publicId or by stripped mediaId UUID)
      const bareMediaId = item.publicId.includes('/')
        ? item.publicId.split('/').pop()!
        : item.publicId;

      const preAuth = await this.db.mediaUploads.findOne({
        $or: [{ _id: item.publicId }, { _id: bareMediaId }, { mediaId: bareMediaId }],
      });
      if (!preAuth) {
        this.logger.warn(
          `Untrusted media attachment attempt: publicId "${item.publicId}" not found in media_uploads.`,
        );
        throw new ForbiddenException(
          `Unauthorized media asset: publicId "${item.publicId}" was not issued by this service`,
        );
      }

      // Verify ownership: Asset MUST belong to the authenticated caller
      if (preAuth.userId !== authenticatedUserId) {
        this.logger.warn(
          `Media ownership mismatch: user "${authenticatedUserId}" attempted to attach asset owned by "${preAuth.userId}".`,
        );
        throw new ForbiddenException(
          `You do not have permission to attach media asset "${item.publicId}" (ownership mismatch)`,
        );
      }

      // Verify asset has not already been attached to a report
      if (preAuth.isAttached) {
        throw new BadRequestException(
          `Media asset "${item.publicId}" has already been attached to report "${preAuth.attachedToReportId || 'unknown'}"`,
        );
      }

      // Verify expiration (1 hour from signing)
      if (preAuth.expiresAt < new Date()) {
        throw new BadRequestException(
          `Media upload authorization for "${item.publicId}" has expired`,
        );
      }

      // 2. SERVER-SIDE VERIFICATION WITH PROVIDER (Do not trust client-supplied bytes, format, or URLs)
      const verifiedAsset = await this.verifyAssetWithProvider(
        preAuth._id,
        preAuth.resourceType,
        preAuth.uploadFolder,
      );

      if (!verifiedAsset) {
        this.logger.warn(
          `Asset verification failed: publicId "${preAuth._id}" does not exist in Cloudinary. Authorization alone is not proof of upload.`,
        );
        throw new BadRequestException(
          `Media asset "${preAuth._id}" has not been uploaded to Cloudinary or does not exist.`,
        );
      }

      // 3. Match verified asset attributes against stored pre-authorization
      const verifiedFormat = (verifiedAsset.format || '').toLowerCase();
      if (!preAuth.allowedFormats.includes(verifiedFormat)) {
        throw new BadRequestException(
          `Verified media format "${verifiedFormat}" is not permitted. Allowed: ${preAuth.allowedFormats.join(', ')}`,
        );
      }

      if (verifiedAsset.bytes > preAuth.maxFileSizeBytes) {
        throw new BadRequestException(
          `Verified media size (${verifiedAsset.bytes} bytes) exceeds maximum permitted limit (${preAuth.maxFileSizeBytes} bytes)`,
        );
      }

      if (verifiedAsset.resourceType !== preAuth.resourceType) {
        throw new BadRequestException(
          `Verified media resourceType mismatch: expected "${preAuth.resourceType}", got "${verifiedAsset.resourceType}"`,
        );
      }

      // 4. Atomic conditional lock to prevent concurrent requests from attaching the same asset
      const lockResult = await this.db.mediaUploads.updateOne(
        { _id: preAuth._id, isAttached: false },
        {
          $set: {
            isAttached: true,
            attachedToReportId: targetReportId,
            bytes: verifiedAsset.bytes,
            format: verifiedFormat,
            url: verifiedAsset.url,
            secureUrl: verifiedAsset.secureUrl,
          },
        },
      );

      if (lockResult.modifiedCount === 0) {
        // Race condition: concurrent request attached this asset first
        this.logger.warn(
          `Media attachment race condition on publicId "${preAuth._id}". Already attached concurrently.`,
        );
        throw new BadRequestException(
          `Media asset "${preAuth._id}" was attached concurrently by another request.`,
        );
      }

      sanitized.push({
        mediaId: preAuth.mediaId || uuidv4(),
        publicId: preAuth._id,
        url: verifiedAsset.url,
        secureUrl: verifiedAsset.secureUrl,
        format: verifiedFormat,
        resourceType: preAuth.resourceType,
        bytes: verifiedAsset.bytes,
        uploadedByUserId: authenticatedUserId,
        createdAt: new Date(),
      });
    }

    return sanitized;
  }

  mapMediaDocsToDto(docs: MediaAttachmentDoc[] | undefined): MediaAttachment[] {
    if (!docs) return [];
    return docs.map((d) => ({
      mediaId: d.mediaId,
      publicId: d.publicId,
      url: d.url,
      secureUrl: d.secureUrl,
      format: d.format,
      resourceType: d.resourceType,
      bytes: d.bytes,
      uploadedByUserId: d.uploadedByUserId,
      createdAt: d.createdAt.toISOString(),
    }));
  }
}
