import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { UserProfileDto, UserRole, RegisterDto, LoginDto } from '@civic-pulse/contracts';
import { apiClient } from '../api/api-client';
import { secureStorage } from '../storage/secure-storage';

export interface AuthContextValue {
  user: UserProfileDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAuthority: boolean;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore authenticated session on mount
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      console.log('[AuthContext] Starting restoreSession...');
      try {
        const storedProfileStr = await secureStorage.getItemAsync('civic_user_profile');
        if (storedProfileStr) {
          try {
            const parsed = JSON.parse(storedProfileStr);
            if (isMounted) setUser(parsed);
          } catch {
            // Ignore malformed local cache
          }
        }

        // Verify with live backend Identity Service via Gateway
        const token = await secureStorage.getItemAsync('civic_access_token');
        if (token) {
          const liveProfile = await apiClient.getMe();
          if (isMounted) {
            setUser(liveProfile);
            await secureStorage.setItemAsync('civic_user_profile', JSON.stringify(liveProfile));
          }
        } else {
          if (isMounted) setUser(null);
        }
      } catch {
        // Token might be revoked or expired; clear invalid session
        await apiClient.clearSession();
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (dto: LoginDto) => {
    setIsLoading(true);
    try {
      const authRes = await apiClient.login(dto);
      setUser(authRes.user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (dto: RegisterDto) => {
    setIsLoading(true);
    try {
      await apiClient.register(dto);
      // Auto-login after registration
      const authRes = await apiClient.login({
        email: dto.email,
        password: dto.password,
      });
      setUser(authRes.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiClient.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    try {
      const live = await apiClient.getMe();
      setUser(live);
      await secureStorage.setItemAsync('civic_user_profile', JSON.stringify(live));
    } catch {
      // Ignore if offline
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      isAuthority: user?.role === UserRole.AUTHORITY || user?.role === UserRole.ADMIN,
      login,
      register,
      logout,
      refreshProfile,
    }),
    [user, isLoading]
  );

  return React.createElement(AuthContext.Provider, { value }, children);
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
