import { useCallback } from 'react';
import { useAuth } from '../auth/AuthContext';
import { apiFetch } from './client';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
}

export function useApi() {
  const { auth } = useAuth();

  return useCallback(
    <T,>(path: string, options: RequestOptions = {}) => apiFetch<T>(path, { ...options, token: auth?.token }),
    [auth],
  );
}
