import { GraduationCap, ArrowLeft, Sun, Moon, Bookmark } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useBookmarks } from '@/hooks/useBookmarks';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
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
          <Link
            to="/"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
          >
            Subjects
          </Link>
          <Link
            to="/bookmarks"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Saved topics"
          >
            <Bookmark className="h-5 w-5" />
            {bookmarks.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {bookmarks.length > 9 ? '9+' : bookmarks.length}
              </span>
            )}
          </Link>
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
