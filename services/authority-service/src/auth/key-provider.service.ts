import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import http from 'http';
import { CivicLogger } from '@civic-pulse/nest-common';

@Injectable()
export class KeyProviderService implements OnModuleInit {
  private publicKeyPem: string = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Authority:KeyProviderService');
  }

  async onModuleInit() {
    const configuredKey = this.configService.get<string>('JWT_PUBLIC_KEY_PEM');
    if (configuredKey && !configuredKey.includes('placeholder')) {
      this.publicKeyPem = configuredKey.replace(/\\n/g, '\n');
      process.env.JWT_PUBLIC_KEY_PEM = this.publicKeyPem;
      process.env.JWT_PUBLIC_KEY = this.publicKeyPem;
      this.logger.log('Loaded JWT public key from environment.');
      return;
    }

    const identityUrl =
      this.configService.get<string>('IDENTITY_SERVICE_URL') ||
      'http://127.0.0.1:3001';

    await this.fetchKeyFromIdentity(identityUrl);
  }

  getPublicKey(): string {
    return this.publicKeyPem;
  }

  private async fetchKeyFromIdentity(identityUrl: string): Promise<void> {
    const target = new URL('/api/v1/auth/public-key', identityUrl);
    this.logger.log(`Fetching public verification key from ${target.href}...`);

    return new Promise((resolve) => {
      const req = http.get(target.href, { timeout: 4000 }, (res) => {
        let b = '';
        res.on('data', (c) => (b += c));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(b);
            const key = parsed?.data?.publicKey || parsed?.publicKey;
            if (key) {
              this.publicKeyPem = key;
              process.env.JWT_PUBLIC_KEY_PEM = key;
              process.env.JWT_PUBLIC_KEY = key;
              this.logger.log('Successfully retrieved public RSA key from Identity Service.');
            } else {
              this.logger.warn('Identity Service did not return a public key payload.');
            }
          } catch (e: any) {
            this.logger.error(`Failed to parse public key response: ${e?.message}`);
          }
          resolve();
        });
      });

      req.on('error', (err) => {
        this.logger.warn(
          `Unable to fetch public key from Identity Service (${err.message}). Will retry on demand.`,
        );
        resolve();
      });

      req.on('timeout', () => {
        req.destroy();
        this.logger.warn('Key fetch request timed out.');
        resolve();
      });
    });
  }
}
