import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Library, Sparkles, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';

type AppShellProps = {
  children: ReactNode;
};

const baseNav = [
  { label: 'Home', to: '/app', icon: <Home className="h-4 w-4" /> },
  { label: 'Library', to: '/app/library', icon: <Library className="h-4 w-4" /> },
  { label: 'Generate', to: '/app', icon: <Sparkles className="h-4 w-4" /> },
];

const AppShell = ({ children }: AppShellProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const adminEmails = useMemo(
    () =>
      ((import.meta.env.VITE_ADMIN_EMAILS as string | undefined)?.split(',') || [])
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean),
    []
  );
  const allowlist = adminEmails.length > 0 ? adminEmails : ['kehindevictor070@gmail.com'];
  const isAdmin = allowlist.includes((user?.email || '').toLowerCase());
  const navItems = isAdmin ? [...baseNav, { label: 'Admin', to: '/app/admin', icon: <Shield className="h-4 w-4" /> }] : baseNav;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = () => {
    navigate('/landing', { replace: true });
    logout();
  };

  const isActive = (to: string) =>
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card shadow-lg transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 lg:hidden">
          <span className="text-sm font-semibold text-foreground">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3 px-5 py-4">
          <img src="/logo.png" alt="Study Assistant" className="h-9 w-auto rounded-lg" />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">Study Assistant</p>
            <p className="text-xs text-muted-foreground">Learn smarter</p>
          </div>
        </div>

        <nav className="mt-2 flex flex-col gap-1 px-3 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                isActive(item.to)
                  ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="mt-2 inline-flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </aside>

      {open && (
        <button
          className="fixed inset-0 z-30 bg-black/35 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted lg:hidden"
                aria-label={open ? 'Close navigation' : 'Open navigation'}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <span className="text-base font-semibold text-foreground lg:hidden">Study Assistant</span>
            </div>
            <div className="hidden lg:block w-full">
              <Header />
            </div>
          </div>
        </header>

        <main className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default AppShell;
