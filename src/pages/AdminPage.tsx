import { useEffect, useMemo, useState } from 'react';
import { Shield, Users, Activity, Clock, AlertCircle, RefreshCw, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  fetchAdminStats,
  fetchAdminUsers,
  fetchAdminAnalytics,
  AdminStats,
  AdminUser,
  AdminAnalytics,
} from '@/services/adminService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const AdminPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [range, setRange] = useState<'day' | 'week' | 'month' | 'year' | 'custom'>('week');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const pageSize = 25;

  const load = async () => {
    try {
      setError(null);
      setForbidden(false);
      setLoading(true);
      const [s, u] = await Promise.all([fetchAdminStats(), fetchAdminUsers()]);
      setStats(s);
      setUsers(u);
    } catch (err: any) {
      if (err?.code === 403) setForbidden(true);
      else setError(err?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const loadAnalytics = async () => {
    try {
      setAnalyticsError(null);
      setAnalyticsLoading(true);
      const params: { range?: 'day' | 'week' | 'month' | 'year'; from?: string; to?: string } = {};
      if (range !== 'custom') {
        params.range = range;
      } else if (from && to) {
        params.from = from;
        params.to = to;
      }
      const data = await fetchAdminAnalytics(params);
      setAnalytics(data);
    } catch (err: any) {
      setAnalyticsError(err?.message || 'Failed to load analytics');
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    if (range === 'custom' && (!from || !to)) return;
    loadAnalytics();
  }, [range, from, to]);

  const filteredUsers = useMemo(() => {
    const f = filter.trim().toLowerCase();
    const list = f
      ? users.filter(
          (u) =>
            (u.name || '').toLowerCase().includes(f) ||
            u.email.toLowerCase().includes(f)
        )
      : users;
    return list.sort(
      (a, b) =>
        new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
    );
  }, [users, filter]);

  const totalPages = filteredUsers.length > 50 ? Math.ceil(filteredUsers.length / pageSize) : 1;
  const pagedUsers =
    totalPages > 1
      ? filteredUsers.slice((page - 1) * pageSize, page * pageSize)
      : filteredUsers;

  const chartData = useMemo(() => {
    const map = new Map<
      string,
      { date: string; users?: number; topics?: number; tokens?: number }
    >();

    const normalizeDate = (value?: string) => (value ? new Date(value).toISOString().slice(0, 10) : '');

    const add = (arr: { _id: string; count?: number; tokens?: number }[], key: 'users' | 'topics' | 'tokens') => {
      arr?.forEach((item) => {
        const dateKey = normalizeDate(item._id);
        if (!dateKey) return;
        const existing = map.get(dateKey) || { date: dateKey };
        if (key === 'tokens') existing.tokens = item.tokens ?? 0;
        else if (key === 'users') existing.users = item.count ?? 0;
        else existing.topics = item.count ?? 0;
        map.set(dateKey, existing);
      });
    };

    if (analytics) {
      add(analytics.usersByDay || [], 'users');
      add(analytics.topicsByDay || [], 'topics');
      add(analytics.tokensByDay || [], 'tokens');
    }

    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [analytics]);

  const formatNumber = (value: number | string | undefined) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(value);
    }
    return value ?? '—';
  };

  return (
    <div className="flex min-h-screen flex-col bg-background page-shell">
      <div className="hidden sm:block">
        <Header />
      </div>
      <main className="flex-1">
        <div className="container max-w-6xl px-4 py-6 sm:py-8 space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Admin</p>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Control Panel</h1>
            </div>
          </div>

        <div className="flex flex-wrap items-center gap-3 scroll-reveal">
          <Button size="sm" variant="outline" onClick={load} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <div className="relative">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              placeholder="Filter name or email"
              className="pl-9"
            />
          </div>
        </div>

        {loading && (
          <div className="grid gap-4 scroll-reveal sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-sm animate-pulse-soft h-24" />
            ))}
            <div className="col-span-full mt-4 rounded-2xl border border-border bg-card p-4 shadow-sm animate-pulse-soft h-64" />
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4" />
            <span>{error}</span>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={load}>Retry</Button>
          </div>
        )}

        {forbidden && !loading && (
          <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm scroll-reveal">
            <Shield className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-3 text-lg font-semibold text-foreground">You are not an admin</h2>
            <p className="mt-1 text-sm text-muted-foreground">This area is restricted. If you think this is a mistake, contact the owner.</p>
            <div className="mt-4">
              <Button onClick={() => (window.location.href = '/app')}>Back to Dashboard</Button>
            </div>
          </div>
        )}

        {!loading && !error && !forbidden && (
          <>
            <section className="grid gap-4 scroll-reveal sm:grid-cols-2 lg:grid-cols-5">
              {[
                { label: 'Total users', value: stats?.totalUsers ?? '—', icon: <Users className="h-5 w-5" /> },
                { label: 'Topics generated', value: stats?.topicsGenerated ?? '—', icon: <Activity className="h-5 w-5" /> },
                { label: 'Active today', value: stats?.activeToday ?? '—', icon: <Clock className="h-5 w-5" /> },
                { label: 'New this week', value: stats?.signupsThisWeek ?? '—', icon: <SparkDot /> },
                { label: 'Total tokens used', value: formatNumber(stats?.totalTokensUsed), icon: <Activity className="h-5 w-5" /> },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{item.label}</span>
                    {item.icon}
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </section>

            <section className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-sm scroll-reveal">
              <div className="flex flex-wrap items-center gap-2 pb-3">
                <h2 className="text-lg font-semibold text-foreground">Analytics</h2>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  {(['day', 'week', 'month', 'year'] as const).map((key) => (
                    <Button
                      key={key}
                      size="sm"
                      variant={range === key ? 'default' : 'outline'}
                      onClick={() => {
                        setRange(key);
                        setFrom('');
                        setTo('');
                      }}
                      aria-label={`Show ${key} range`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Button>
                  ))}
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground" htmlFor="from-date">From</label>
                    <Input
                      id="from-date"
                      type="date"
                      value={from}
                      onChange={(e) => {
                        setRange('custom');
                        setFrom(e.target.value);
                      }}
                      aria-label="Custom from date"
                      className="h-9 w-36"
                    />
                    <label className="text-xs text-muted-foreground" htmlFor="to-date">To</label>
                    <Input
                      id="to-date"
                      type="date"
                      value={to}
                      onChange={(e) => {
                        setRange('custom');
                        setTo(e.target.value);
                      }}
                      aria-label="Custom to date"
                      className="h-9 w-36"
                    />
                  </div>
                  <Button size="sm" variant="outline" onClick={loadAnalytics} className="gap-2" aria-label="Refresh analytics">
                    <RefreshCw className="h-4 w-4" /> Refresh
                  </Button>
                </div>
              </div>

              {analyticsError && (
                <div className="mb-3 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4" />
                  <span>{analyticsError}</span>
                  <Button variant="ghost" size="sm" className="ml-auto" onClick={loadAnalytics}>Retry</Button>
                </div>
              )}

              {analyticsLoading ? (
                <div className="h-64 animate-pulse-soft rounded-xl border border-border bg-muted/40" />
              ) : chartData.length ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickMargin={8} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" name="Users" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="topics" name="Topics" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="tokens" name="Tokens" stroke="hsl(var(--chart-3, 210 100% 50%))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
                  No analytics data available for this range.
                </div>
              )}
            </section>

            <section className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-sm scroll-reveal">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
                <h2 className="text-lg font-semibold text-foreground">Users</h2>
                <p className="text-xs text-muted-foreground">{filteredUsers.length} rows</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2 pr-4 font-medium">Name</th>
                      <th className="py-2 pr-4 font-medium">Email</th>
                      <th className="py-2 pr-4 font-medium">Created</th>
                      <th className="py-2 pr-4 font-medium text-right">Topics</th>
                      <th className="py-2 pr-4 font-medium text-right">Tokens Used</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {pagedUsers.map((u) => (
                      <tr key={u.id} className="text-foreground">
                        <td className="py-2 pr-4">{u.name || '—'}</td>
                        <td className="py-2 pr-4">{u.email}</td>
                        <td className="py-2 pr-4">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                        <td className="py-2 pr-4 text-right">{u.topicsCount ?? 0}</td>
                        <td className="py-2 pr-4 text-right">{u.tokensUsed ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!filteredUsers.length && (
                <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
                  No users found.
                </div>
              )}
              {totalPages > 1 && (
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </Button>
                  <span>Page {page} of {totalPages}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </section>
          </>
        )}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

const SparkDot = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-xs text-primary">+</span>
);

export default AdminPage;
