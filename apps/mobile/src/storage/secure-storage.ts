/**
 * Secure Storage Abstraction for Mobile
 * 
 * Supports encrypted token storage using Expo SecureStore where available,
 * with fallbacks for memory-safe storage in mock/headless testing environments.
 * Prevents plain logging or unencrypted disk persistence of tokens.
 */

const MEMORY_STORAGE: Record<string, string> = {};

export interface ISecureStorage {
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
  isSecureAvailable(): Promise<boolean>;
}

class SecureStorageService implements ISecureStorage {
  private secureStoreModule: any = null;
  private isInitialized = false;

  private async getModule() {
    if (this.isInitialized) return this.secureStoreModule;
    try {
      // Dynamic import to support environment where native module is present
      this.secureStoreModule = await import('expo-secure-store');
    } catch {
      this.secureStoreModule = null;
    }
    this.isInitialized = true;
    return this.secureStoreModule;
  }

  async isSecureAvailable(): Promise<boolean> {
    const mod = await this.getModule();
    if (mod && typeof mod.isAvailableAsync === 'function') {
      try {
        return await mod.isAvailableAsync();
      } catch {
        return false;
      }
    }
    return false;
  }

  async getItemAsync(key: string): Promise<string | null> {
    const mod = await this.getModule();
    if (mod && typeof mod.getItemAsync === 'function') {
      return await mod.getItemAsync(key);
    }
    return MEMORY_STORAGE[key] ?? null;
  }

  async setItemAsync(key: string, value: string): Promise<void> {
    const mod = await this.getModule();
    if (mod && typeof mod.setItemAsync === 'function') {
      await mod.setItemAsync(key, value);
      return;
    }
    MEMORY_STORAGE[key] = value;
  }

  async deleteItemAsync(key: string): Promise<void> {
    const mod = await this.getModule();
    if (mod && typeof mod.deleteItemAsync === 'function') {
      await mod.deleteItemAsync(key);
      return;
    }
    delete MEMORY_STORAGE[key];
  }

  // Testing helper to reset in-memory store
  clearMemory(): void {
    for (const key of Object.keys(MEMORY_STORAGE)) {
      delete MEMORY_STORAGE[key];
    }
  }
}

export const secureStorage = new SecureStorageService();
