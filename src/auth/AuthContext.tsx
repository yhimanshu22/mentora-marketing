import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { apiFetch } from '../lib/api';
import {
  AUTH_STORAGE_KEY,
  AUTH_TOKEN_KEY,
  type AuthUser,
  type Entitlements,
} from './types';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  entitlements: Entitlements | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogleCredential: (credential: string) => Promise<void>;
  signOut: () => void;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

function readStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [token, setToken] = useState<string | null>(() => readStoredToken());
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null);
  const [isLoading, setIsLoading] = useState(() =>
    typeof window !== 'undefined' ? Boolean(readStoredToken()) : false,
  );

  const persistSession = useCallback((nextToken: string, nextUser: AuthUser, nextEntitlements: Entitlements) => {
    setToken(nextToken);
    setUser(nextUser);
    setEntitlements(nextEntitlements);
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    setEntitlements(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const refreshSession = useCallback(async () => {
    const storedToken = readStoredToken();
    if (!storedToken) {
      clearSession();
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiFetch<{
        user: AuthUser;
        entitlements: Entitlements;
      }>('/api/auth/me', { token: storedToken });
      persistSession(storedToken, data.user, data.entitlements);
    } catch {
      clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [clearSession, persistSession]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const signInWithGoogleCredential = useCallback(
    async (credential: string) => {
      const data = await apiFetch<{
        token: string;
        user: AuthUser;
        entitlements: Entitlements;
      }>('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
      });
      persistSession(data.token, data.user, data.entitlements);
    },
    [persistSession],
  );

  const signOut = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      entitlements,
      isAuthenticated: Boolean(user && token),
      isLoading,
      signInWithGoogleCredential,
      signOut,
      refreshSession,
    }),
    [user, token, entitlements, isLoading, signInWithGoogleCredential, signOut, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
