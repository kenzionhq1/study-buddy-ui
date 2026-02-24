import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch, setToken, getToken, clearToken } from '@/services/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

function normalizeUser(raw: any): User | null {
  if (!raw || typeof raw !== 'object') return null;

  const id = raw.id ?? raw._id;
  if (!id || !raw.email) return null;

  return {
    id: String(id),
    name: String(raw.name ?? ''),
    email: String(raw.email),
  };
}

function extractUser(payload: any): User | null {
  return (
    normalizeUser(payload?.user) ||
    normalizeUser(payload?.data?.user) ||
    normalizeUser(payload?.data) ||
    normalizeUser(payload)
  );
}

function extractToken(payload: any): string | null {
  const token =
    payload?.token ??
    payload?.accessToken ??
    payload?.jwt ??
    payload?.data?.token ??
    payload?.data?.accessToken ??
    payload?.data?.jwt;

  return typeof token === 'string' && token.length > 0 ? token : null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await apiFetch<any>('/auth/me');
        const restoredUser = extractUser(data);

        if (!restoredUser) {
          throw new Error('Invalid auth response');
        }

        setUser(restoredUser);
      } catch (error) {
        clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await apiFetch<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        skipAuth: true,
      });

      const token = extractToken(data);
      const nextUser = extractUser(data);

      if (!token || !nextUser) {
        throw new Error('Invalid login response from server');
      }

      setToken(token);
      setUser(nextUser);
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await apiFetch<any>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        skipAuth: true,
      });

      const token = extractToken(data);
      const nextUser = extractUser(data);

      if (!token || !nextUser) {
        throw new Error('Invalid registration response from server');
      }

      setToken(token);
      setUser(nextUser);
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
