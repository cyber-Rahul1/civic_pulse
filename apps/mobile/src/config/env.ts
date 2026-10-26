/**
 * Mobile Environment & Gateway URL Configuration
 * 
 * Supports:
 * - Android Emulator (10.0.2.2)
 * - iOS Simulator / Localhost (127.0.0.1)
 * - Physical devices (Custom IP via environment variable)
 */

export interface MobileConfig {
  apiGatewayUrl: string;
  timeoutMs: number;
  environment: 'development' | 'production' | 'test';
}

export function resolveApiGatewayUrl(): string {
  // 1. Process environment override
  if (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_GATEWAY_URL) {
    return process.env.EXPO_PUBLIC_API_GATEWAY_URL;
  }
  if (typeof process !== 'undefined' && process.env?.API_GATEWAY_URL) {
    return process.env.API_GATEWAY_URL;
  }

  // 2. Platform-aware default for Android Emulators vs Localhost
  try {
    const { Platform } = require('react-native');
    if (Platform && Platform.OS === 'android') {
      return 'http://10.0.2.2:3000';
    }
  } catch {
    // Non-React Native environment (Node test runner)
  }

  return 'http://127.0.0.1:3000';
}

export const mobileConfig: MobileConfig = {
  apiGatewayUrl: resolveApiGatewayUrl(),
  timeoutMs: 15000,
  environment: (typeof process !== 'undefined' && (process.env?.NODE_ENV as any)) || 'development',
};
