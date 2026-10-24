import 'reflect-metadata';
import { IdentityEnvConfig } from './identity.env';
import { validateEnvironment } from '@civic-pulse/nest-common';

describe('IdentityEnvConfig', () => {
  it('should validate default environment variables', () => {
    const raw = {
      IDENTITY_DB_URI: 'mongodb://localhost:27018/civic_identity',
      IDENTITY_SERVICE_PORT: '3001',
    };

    const config = validateEnvironment(raw, IdentityEnvConfig);
    expect((config as IdentityEnvConfig).IDENTITY_SERVICE_PORT).toBe(3001);
    expect((config as IdentityEnvConfig).IDENTITY_DB_URI).toContain('civic_identity');
  });
});
