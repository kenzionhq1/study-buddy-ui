import { API_BASE_URL, getToken, clearToken } from '@/services/api';

const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim() ||
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
  API_BASE_URL;

export type AdminStats = {
  totalUsers: number;
  topicsGenerated: number;
  activeToday: number;
  signupsThisWeek: number;
  totalTokensUsed?: number;
};

export type AdminUser = {
  id: string;
  name?: string;
  email: string;
  createdAt?: string;
  topicsCount?: number;
  tokensUsed?: number;
};

export type AdminAnalyticsPoint = {
  _id: string;
  count?: number;
  tokens?: number;
};

export type AdminAnalytics = {
  usersByDay: AdminAnalyticsPoint[];
  topicsByDay: AdminAnalyticsPoint[];
  tokensByDay: AdminAnalyticsPoint[];
};

const mockStats: AdminStats = {
  totalUsers: 0,
  topicsGenerated: 0,
  activeToday: 0,
  signupsThisWeek: 0,
};

async function adminFetch<T>(path: string): Promise<T> {
  const token = getToken();
  if (!token) {
    throw { code: 401, message: 'Unauthorized' };
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    clearToken();
    window.location.href = '/login';
    throw { code: 401, message: 'Unauthorized' };
  }
  if (res.status === 403) {
    throw { code: 403, message: 'Access denied' };
  }
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const data = await res.json();
      msg = data?.message || msg;
    } catch {
      /* ignore non-json error bodies */
    }
    throw { code: res.status, message: msg };
  }

  return res.json() as Promise<T>;
}

export async function fetchAdminStats(): Promise<AdminStats> {
  try {
    return await adminFetch<AdminStats>('/admin/stats');
  } catch (error: any) {
    if (error?.code === 404) return mockStats;
    throw error;
  }
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  try {
    return await adminFetch<AdminUser[]>('/admin/users');
  } catch (error: any) {
    if (error?.code === 404) return [];
    throw error;
  }
}

export async function fetchAdminAnalytics(params: { range?: 'day' | 'week' | 'month' | 'year'; from?: string; to?: string } = {}): Promise<AdminAnalytics> {
  const search = new URLSearchParams();
  if (params.range) search.set('range', params.range);
  if (params.from) search.set('from', params.from);
  if (params.to) search.set('to', params.to);

  const query = search.toString();
  return adminFetch<AdminAnalytics>(`/admin/analytics${query ? `?${query}` : ''}`);
}
