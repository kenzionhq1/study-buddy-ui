import { ArrowLeft, Sun, Moon, Library, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHomePage && (
            <button
              onClick={() => navigate(-1)}
              className="mr-2 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img
              src="/logo.png"
              alt="Study Assistant"
              className="h-30 w-20 rounded-lg object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-foreground">
                Study Assistant
              </span>
              <span className="text-xs text-muted-foreground">
                Learn smarter, not harder
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          {isAuthenticated && (
            <>
              <Link
                to="/"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
              >
                Home
              </Link>

              <Link
                to="/library"
                className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
