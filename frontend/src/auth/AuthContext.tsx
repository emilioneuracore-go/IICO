import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: string[];
}

interface AuthState {
  token: string;
  user: AuthenticatedUser;
}

interface AuthContextValue {
  auth: AuthState | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasAnyRole: (...roles: string[]) => boolean;
}

const STORAGE_KEY = 'iico.auth';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthState) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (auth) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage puede no estar disponible (ej. modo privado); la sesión
      // sigue funcionando en memoria durante la vida de la pestaña.
    }
  }, [auth]);

  const login = async (email: string, password: string) => {
    const response = await apiFetch<{ accessToken: string; user: AuthenticatedUser }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    setAuth({ token: response.accessToken, user: response.user });
  };

  const logout = () => setAuth(null);

  const hasAnyRole = (...roles: string[]) => {
    if (roles.length === 0) {
      return true;
    }
    return roles.some((role) => auth?.user.roles.includes(role));
  };

  return <AuthContext.Provider value={{ auth, login, logout, hasAnyRole }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
