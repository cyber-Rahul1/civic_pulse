import { ApiClient } from '../api/api-client';
import { secureStorage } from '../storage/secure-storage';
import { UserRole, AccountStatus, EvidenceType } from '@civic-pulse/contracts';

describe('ApiClient & Session Lifecycle Unit Tests', () => {
  let client: ApiClient;
  const originalFetch = global.fetch;

  beforeEach(() => {
    secureStorage.clearMemory();
    client = new ApiClient('http://127.0.0.1:3000');
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('1. should store encrypted tokens securely upon successful login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          user: {
            id: 'user-test-123',
            email: 'resident@example.com',
            displayName: 'Citizen Jane',
            role: UserRole.RESIDENT,
            status: AccountStatus.ACTIVE,
            emailVerified: true,
            createdAt: new Date().toISOString(),
          },
          tokens: {
            accessToken: 'sample_jwt_access_token',
            refreshToken: 'sample_refresh_token_123',
            tokenType: 'Bearer',
            expiresInSeconds: 900,
          },
        }),
    } as any);

    const loginRes = await client.login({
      email: 'resident@example.com',
      password: 'password123',
    });

    expect(loginRes.user.id).toBe('user-test-123');
    expect(await secureStorage.getItemAsync('civic_access_token')).toBe('sample_jwt_access_token');
    expect(await secureStorage.getItemAsync('civic_refresh_token')).toBe('sample_refresh_token_123');
  });

  it('2. should attach Bearer token and correlation id to authenticated requests', async () => {
    await secureStorage.setItemAsync('civic_access_token', 'stored_access_token');

    let capturedHeaders: any = {};
    global.fetch = jest.fn().mockImplementation((_url, opts) => {
      capturedHeaders = opts.headers;
      return Promise.resolve({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ id: 'user-test-123' }),
      });
    });

    await client.getMe();

    expect(capturedHeaders['Authorization']).toBe('Bearer stored_access_token');
    expect(capturedHeaders['x-correlation-id']).toBeDefined();
    expect(capturedHeaders['x-correlation-id']).toContain('mob_');
  });

  it('3. should automatically rotate expired access tokens via refresh token and retry', async () => {
    await secureStorage.setItemAsync('civic_access_token', 'expired_token');
    await secureStorage.setItemAsync('civic_refresh_token', 'valid_refresh_token');

    let callCount = 0;
    global.fetch = jest.fn().mockImplementation((url: string) => {
      callCount++;
      if (url.includes('auth/me') && callCount === 1) {
        // First attempt fails with 401
        return Promise.resolve({
          ok: false,
          status: 401,
          text: async () => JSON.stringify({ message: 'Unauthorized' }),
        });
      }
      if (url.includes('auth/refresh')) {
        // Refresh succeeds
        return Promise.resolve({
          ok: true,
          status: 200,
          text: async () =>
            JSON.stringify({
              user: { id: 'user-test-123', role: UserRole.RESIDENT },
              tokens: {
                accessToken: 'fresh_rotated_access_token',
                refreshToken: 'fresh_rotated_refresh_token',
                tokenType: 'Bearer',
                expiresInSeconds: 900,
              },
            }),
        });
      }
      if (url.includes('auth/me') && callCount === 3) {
        // Retried call with fresh token succeeds
        return Promise.resolve({
          ok: true,
          status: 200,
          text: async () => JSON.stringify({ id: 'user-test-123', email: 'citizen@civicpulse.org' }),
        });
      }
      return Promise.reject(new Error('Unexpected fetch call'));
    });

    const res = await client.getMe();
    expect(res.id).toBe('user-test-123');
    expect(await secureStorage.getItemAsync('civic_access_token')).toBe('fresh_rotated_access_token');
  });

  it('4. should clear session and wipe tokens cleanly upon logout', async () => {
    await secureStorage.setItemAsync('civic_access_token', 'token_to_clear');
    await secureStorage.setItemAsync('civic_refresh_token', 'refresh_to_clear');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ message: 'Session revoked' }),
    } as any);

    await client.logout();

    expect(await secureStorage.getItemAsync('civic_access_token')).toBeNull();
    expect(await secureStorage.getItemAsync('civic_refresh_token')).toBeNull();
  });

  it('5. should fetch public representative directory and summary', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({
          items: [
            {
              id: 'rep-1',
              publicName: 'M. Sribharat',
              officeType: 'MP',
              officialDesignation: 'Member of Parliament',
              jurisdictionName: 'Visakhapatnam',
            },
          ],
          meta: { page: 1, limit: 15, totalItems: 1, totalPages: 1 },
        }),
    } as any);

    const listRes = await client.listRepresentatives({ officeType: 'MP' as any });
    expect(listRes.items.length).toBe(1);
    expect(listRes.items[0]?.publicName).toBe('M. Sribharat');
  });

  it('6. should submit resolution evidence and retrieve report evidence', async () => {
    await secureStorage.setItemAsync('civic_access_token', 'sample_auth_token');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      text: async () =>
        JSON.stringify({
          id: 'ev-123',
          reportId: 'rep-999',
          evidenceType: EvidenceType.AFTER,
          verificationStatus: 'PENDING',
          media: {
            mediaId: 'm-1',
            publicId: 'pub-1',
            url: 'https://res.cloudinary.com/after.jpg',
            secureUrl: 'https://res.cloudinary.com/after.jpg',
            format: 'jpg',
            resourceType: 'image',
            bytes: 12345,
            uploadedByUserId: 'user-test-123',
            createdAt: new Date().toISOString(),
          },
        }),
    } as any);

    const ev = await client.submitResolutionEvidence('rep-999', {
      evidenceType: EvidenceType.AFTER,
      media: {
        mediaId: 'm-1',
        publicId: 'pub-1',
        url: 'https://res.cloudinary.com/after.jpg',
        secureUrl: 'https://res.cloudinary.com/after.jpg',
        format: 'jpg',
        resourceType: 'image',
        bytes: 12345,
      },
      description: 'Pothole asphalt repaved and cured',
    });

    expect(ev.id).toBe('ev-123');
    expect(ev.evidenceType).toBe(EvidenceType.AFTER);
  });
});

