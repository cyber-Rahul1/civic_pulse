import * as crypto from 'crypto';

/**
 * Generates an RSA 2048-bit key pair in PEM format for RS256 JWT signing and verification.
 */
export function generateRsaKeyPair(): { privateKey: string; publicKey: string } {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
}

/**
 * Hashes a plaintext password using crypto.scrypt with a random 16-byte salt.
 * Produces format: salt:hash
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * Verifies a password against a stored salt:hash string.
 * Uses timingSafeEqual to protect against timing attacks.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;
  const [salt, key] = parts;
  if (!salt || !key) return false;

  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      const keyBuffer = Buffer.from(key, 'hex');
      const match = crypto.timingSafeEqual(derivedKey, keyBuffer);
      resolve(match);
    });
  });
}

/**
 * Computes a SHA-256 hash of a string (used for opaque refresh token storage).
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generates a cryptographically secure random opaque token (32 bytes / 64 hex characters).
 */
export function generateOpaqueToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
