import { ArrowLeft, Sun, Moon, Library, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const homePath = isAuthenticated ? '/app' : '/landing';

  const handleLogout = () => {
    navigate('/landing', { replace: true });
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {!isLanding && (
            <button
              onClick={() => navigate(-1)}
              className="mr-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:mr-2"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <Link to={homePath} className="flex min-w-0 items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3">
            <img
              src="/logo.png"
              alt="Study Assistant"
              className="h-9 w-auto rounded-lg object-contain sm:h-10"
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-base font-bold leading-tight text-foreground sm:text-lg">
                Study Assistant
              </span>
              <span className="hidden text-[11px] text-muted-foreground sm:inline">
                Learn smarter, not harder
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-1.5 sm:gap-2">
          {isAuthenticated && (
            <>
              <Link
                to="/app"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
              >
                Home
              </Link>

              <Link
                to="/app/library"
                className="hidden h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
                aria-label="My Library"
              >
                <Library className="h-5 w-5" />
                <span className="hidden sm:inline">Library</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
