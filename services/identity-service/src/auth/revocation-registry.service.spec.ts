import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CivicLogger } from '@civic-pulse/nest-common';
import { RevocationRegistryService } from './revocation-registry.service';

describe('RevocationRegistryService WAITAOF Acknowledgement Unit Tests', () => {
  let service: RevocationRegistryService;
  let mockRedisClient: any;

  beforeEach(async () => {
    mockRedisClient = {
      set: jest.fn().mockResolvedValue('OK'),
      call: jest.fn().mockResolvedValue([1, 0]),
      on: jest.fn(),
      quit: jest.fn().mockResolvedValue('OK'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevocationRegistryService,
        CivicLogger,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'REDIS_HOST') return 'localhost';
              if (key === 'REDIS_PORT') return 6380;
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<RevocationRegistryService>(RevocationRegistryService);
    // Inject mock client directly and mark connected
    (service as any).redisClient = mockRedisClient;
    (service as any).isConnected = true;
    (service as any).connectionEpoch = 1;
  });

  describe('Strict WAITAOF Acknowledgement Validation', () => {
    it('should succeed when WAITAOF returns [1, 0] (sufficient local AOF acknowledgement)', async () => {
      mockRedisClient.call.mockResolvedValue([1, 0]);
      await expect(service.revokeUser('user-1', 1000)).resolves.not.toThrow();
      expect(mockRedisClient.set).toHaveBeenCalledWith('revocation:user:user-1', '1000', 'EX', 900);
      expect(mockRedisClient.call).toHaveBeenCalledWith('WAITAOF', '1', '0', '1000');
    });

    it('should fail closed when WAITAOF returns [0, 0] (insufficient local AOF fsync acknowledgement)', async () => {
      mockRedisClient.call.mockResolvedValue([0, 0]);
      await expect(service.revokeUser('user-1', 1000)).rejects.toThrow(
        /insufficient local AOF fsync acknowledgement \(received 0, required >= 1\)/,
      );
    });

    it('should fail closed when WAITAOF returns malformed response (not an array or empty)', async () => {
      mockRedisClient.call.mockResolvedValue(null);
      await expect(service.revokeUserVersion('user-1', 2)).rejects.toThrow(
        /invalid WAITAOF response format/,
      );

      mockRedisClient.call.mockResolvedValue([]);
      await expect(service.revokeSession('session-1')).rejects.toThrow(
        /invalid WAITAOF response format/,
      );
    });

    it('should fail closed when WAITAOF throws timeout error or command error', async () => {
      mockRedisClient.call.mockRejectedValue(new Error('Command timed out after 1000ms'));
      await expect(service.revokeSession('session-1')).rejects.toThrow(
        /Revocation durability failure: WAITAOF command rejected \(Command timed out after 1000ms\)/,
      );
    });

    it('should fail closed when Redis throws OOM error during write', async () => {
      mockRedisClient.set.mockRejectedValue(new Error('OOM command not allowed when used memory > maxmemory'));
      await expect(service.revokeUser('user-1', 1000)).rejects.toThrow(
        /Revocation store write error for user user-1: OOM command not allowed/,
      );
      expect(mockRedisClient.call).not.toHaveBeenCalled();
    });

    it('should fail closed if connection disconnects between write and WAITAOF', async () => {
      // Simulate connection close after SET
      mockRedisClient.set.mockImplementation(async () => {
        // Advance connection epoch as would happen on reconnect
        (service as any).connectionEpoch = 2;
        return 'OK';
      });

      await expect(service.revokeUser('user-1', 1000)).rejects.toThrow(
        /Redis connection lost or reconnected between revocation write and WAITAOF/,
      );
    });

    it('should fail closed if Redis is not connected prior to revocation call', async () => {
      (service as any).isConnected = false;
      await expect(service.revokeUser('user-1', 1000)).rejects.toThrow(
        /Revocation store unavailable: cannot write revocation for user user-1/,
      );
    });
  });
});
