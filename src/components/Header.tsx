import { GraduationCap, ArrowLeft, Sun, Moon, Bookmark, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useState, useEffect } from 'react';
import { getAIMode, setAIMode } from '@/services/aiService';
import Logo from '@/logo.png';
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();

  const [deepMode, setDeepModeState] = useState(false);

  useEffect(() => {
    setDeepModeState(getAIMode());
  }, []);

  const toggleDeepMode = () => {
    const newValue = !deepMode;
    setAIMode(newValue);
    setDeepModeState(newValue);
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
            <img src={Logo} alt="Study Buddy" className="h-30 w-20 rounded-lg object-contain" />
            <img src="/logo.png" alt="Study Buddy" className="h-30 w-20 rounded-lg object-contain" />

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

    {/* Deep Mode Toggle */}
<button
  onClick={toggleDeepMode}
  className="relative hidden sm:flex items-center"
>
  <div
    className={`relative flex h-8 w-24 items-center rounded-full px-1 transition-all duration-300
      ${deepMode ? "bg-primary/90 shadow-md shadow-primary/30" : "bg-muted"}
    `}
  >
    {/* Sliding Circle */}
    <div
      className={`absolute top-1 h-6 w-6 rounded-full bg-background shadow transition-all duration-300 z-0
        ${deepMode ? "translate-x-16" : "translate-x-0"}
      `}
    />

    {/* Text Layer */}
    <div className="relative z-10 flex w-full justify-between px-2 text-[10px] font-semibold">
      <span
        className={`transition-opacity duration-200 ${
          deepMode ? "opacity-40" : "opacity-100"
        }`}
      >
        Std
      </span>

      <span
        className={`flex items-center gap-1 transition-opacity duration-200 ${
          deepMode ? "opacity-100" : "opacity-40"
        }`}
      >
        Deep
        <Sparkles
          className={`h-3 w-3 transition-all duration-500 ${
            deepMode ? "animate-pulse scale-110" : ""
          }`}
        />
      </span>
    </div>
  </div>
</button>



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
