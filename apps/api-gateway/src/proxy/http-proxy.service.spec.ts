import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadGatewayException } from '@nestjs/common';
import { CivicLogger } from '@civic-pulse/nest-common';
import { HttpProxyService } from './http-proxy.service';

describe('HttpProxyService Unit Tests', () => {
  let proxyService: HttpProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpProxyService,
        CivicLogger,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'GATEWAY_TIMEOUT_MS') return 2000;
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    proxyService = module.get<HttpProxyService>(HttpProxyService);
  });

  it('should reject with BadGatewayException when upstream target is completely unreachable', async () => {
    await expect(
      proxyService.forward({
        targetServiceUrl: 'http://127.0.0.1:49999', // Non-existent port
        path: '/api/v1/auth/test',
        method: 'GET',
        headers: {
          'x-internal-spoofed': 'malicious-data',
          'x-user-role': 'admin',
          'user-agent': 'TestAgent',
        },
        correlationId: 'test-trace-id-123',
      }),
    ).rejects.toThrow(BadGatewayException);
  });
});
