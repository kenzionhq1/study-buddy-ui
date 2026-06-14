import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Sparkles, LogOut, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type NavItem = {
  label: string;
  to: string;
  icon: JSX.Element;
  action?: 'logout';
};

const authedItems: NavItem[] = [
  { label: 'Home', to: '/app', icon: <Home className="h-5 w-5" /> },
  { label: 'Library', to: '/app/library', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'Generate', to: '/app', icon: <Sparkles className="h-5 w-5" /> },
  { label: 'Logout', to: '/landing', action: 'logout', icon: <LogOut className="h-5 w-5" /> },
];

const guestItems: NavItem[] = [
  { label: 'Home', to: '/landing', icon: <Home className="h-5 w-5" /> },
  { label: 'Login', to: '/login', icon: <LogIn className="h-5 w-5" /> },
  { label: 'Sign up', to: '/register', icon: <UserPlus className="h-5 w-5" /> },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const items = isAuthenticated ? authedItems : guestItems;

  const handleItem = (item: NavItem) => {
    if (item.action === 'logout') {
      navigate('/landing', { replace: true });
      logout();
      setOpen(false);
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-5 right-4 z-40 sm:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition hover:scale-105"
          aria-label="Open navigation"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <button
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            aria-label="Close navigation overlay"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-card shadow-xl shadow-black/20 ring-1 ring-border animate-slide-up">
            <div className="flex items-center justify-between px-5 pb-2 pt-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Menu</p>
                <p className="text-xs text-muted-foreground">Quick navigation</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-muted"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-2 px-4 pb-5">
              {items.map((item) => {
                const active =
                  location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => handleItem(item)}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-border bg-muted/60 text-foreground hover:border-primary/30'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
