// ============================================
// API Service — Change BASE_URL to your backend
// ============================================

export const API_BASE_URL = 'http://localhost:3001/api';

/* ---- Token helpers ---- */

export const getToken = (): string | null =>
  localStorage.getItem('auth_token');

export const setToken = (token: string): void =>
  localStorage.setItem('auth_token', token);

export const clearToken = (): void =>
  localStorage.removeItem('auth_token');

/* ---- Generic fetch wrapper ---- */

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipAuth = false, headers: extraHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(extraHeaders as Record<string, string>),
  };

  if (!skipAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...rest,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${res.status})`);
  }

  return res.json();
}
