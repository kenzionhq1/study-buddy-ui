const AUTH_TOKEN_KEY = 'auth_token';
const LEGACY_TOKEN_KEY = 'token';

const envBaseUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
const fallbackBase = 'https://study-ai-backend-5dte.onrender.com/api';
export const API_BASE_URL = (envBaseUrl || fallbackBase).replace(/\/+$/, '');

/* ---- Token helpers ---- */

export const getToken = (): string | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) return token;

  // Migrate old key if present.
  const legacyToken = localStorage.getItem(LEGACY_TOKEN_KEY);
  if (legacyToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, legacyToken);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    return legacyToken;
  }

  return null;
};

export const setToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
};

export const clearToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
};

/* ---- Generic fetch wrapper ---- */

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

function resolvePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

async function readErrorMessage(res: Response): Promise<string> {
  const body = await res.json().catch(() => null);

  // Common express-validator shape: { errors: [{ msg: "..." }] }
  if (Array.isArray(body?.errors) && body.errors.length > 0) {
    const first = body.errors[0];
    if (typeof first === 'string') return first;
    if (first?.msg && typeof first.msg === 'string') return first.msg;
  }

  if (body?.message && typeof body.message === 'string') return body.message;
  if (body?.error && typeof body.error === 'string') return body.error;
  if (res.statusText) return `${res.status} ${res.statusText}`;
  return `Request failed (${res.status})`;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipAuth = false, headers: extraHeaders, ...rest } = options;

  const headers = new Headers(extraHeaders ?? {});
  if (!headers.has('Content-Type') && !(rest.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (!skipAuth) {
    const token = getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE_URL}${resolvePath(path)}`, {
    ...rest,
    headers,
  });

  // Do not force-redirect for public auth calls.
  if (res.status === 401 && !skipAuth) {
    clearToken();
    // Send users to the public landing page instead of forcing login,
    // so manual logouts don't bounce back to /login.
    window.location.href = '/landing';
    throw new Error('Session expired');
  }

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}
