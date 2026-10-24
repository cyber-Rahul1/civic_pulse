import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { generateRsaKeyPair, CivicLogger } from '@civic-pulse/nest-common';
import { UserRole, JwtTokenPayload } from '@civic-pulse/contracts';

@Injectable()
export class TokenService implements OnModuleInit {
  private privateKeyPem!: string;
  private publicKeyPem!: string;
  private readonly issuer: string;
  private readonly audience: string;
  private readonly accessExpirationSeconds: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: CivicLogger,
  ) {
    this.logger.setContext('Identity:TokenService');
    this.issuer = this.configService.get<string>('JWT_ISSUER') || 'civic-pulse:identity';
    this.audience = this.configService.get<string>('JWT_AUDIENCE') || 'civic-pulse:api';
    this.accessExpirationSeconds = Number(
      this.configService.get<number>('JWT_ACCESS_EXPIRATION_SECONDS') || 900,
    );
  }

  onModuleInit() {
    const configuredPrivate = this.configService.get<string>('JWT_PRIVATE_KEY_PEM');
    const configuredPublic = this.configService.get<string>('JWT_PUBLIC_KEY_PEM');

    if (configuredPrivate && configuredPublic) {
      this.privateKeyPem = configuredPrivate.replace(/\\n/g, '\n');
      this.publicKeyPem = configuredPublic.replace(/\\n/g, '\n');
      this.logger.log('Loaded configured RSA key pair for RS256 signing.');
    } else {
      if (process.env.NODE_ENV === 'production') {
        throw new Error(
          'FATAL: JWT_PRIVATE_KEY_PEM and JWT_PUBLIC_KEY_PEM must be set in production!',
        );
      }
      this.logger.warn(
        'No RSA key pair configured in environment. Generating dynamic dev RSA key pair...',
      );
      const generated = generateRsaKeyPair();
      this.privateKeyPem = generated.privateKey;
      this.publicKeyPem = generated.publicKey;
      this.logger.log('Dynamic development RSA key pair generated.');
    }
  }

  getPublicKey(): string {
    return this.publicKeyPem;
  }

  createAccessToken(user: { id: string; email: string; role: UserRole }, sessionId: string): string {
    const payload: Omit<JwtTokenPayload, 'iat' | 'exp'> = {
      sub: user.id,
      email: user.email,
      role: user.role,
      sessionId,
      iss: this.issuer,
      aud: this.audience,
    };

    return jwt.sign(payload, this.privateKeyPem, {
      algorithm: 'RS256',
      keyid: 'civic-identity-key-1',
      expiresIn: this.accessExpirationSeconds,
    });
  }

  verifyAccessToken(token: string): JwtTokenPayload {
    return jwt.verify(token, this.publicKeyPem, {
      algorithms: ['RS256'],
      issuer: this.issuer,
      audience: this.audience,
    }) as JwtTokenPayload;
  }
}
