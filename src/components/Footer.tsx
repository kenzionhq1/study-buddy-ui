import { Heart, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type QuickLink = {
  label: string;
  to: string;
  action?: 'logout';
};

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const currentYear = new Date().getFullYear();

  const quickLinks: QuickLink[] = isAuthenticated
    ? [
        { label: 'Home', to: '/app' },
        { label: 'Library', to: '/app/library' },
        { label: 'Generate', to: '/app' },
        { label: 'Logout', to: '/landing', action: 'logout' },
      ]
    : [
        { label: 'Home', to: '/landing' },
        { label: 'Login', to: '/login' },
        { label: 'Sign up', to: '/register' },
      ];

  return (
    <footer className="border-t border-border bg-card/60 pt-10 pb-6 text-sm">
      <div className="container px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Study Assistant" className="h-10 w-auto rounded-lg" />
              <div>
                <p className="text-base font-semibold text-foreground">Study Assistant</p>
                <p className="text-xs text-muted-foreground">Learn smarter, not harder.</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              AI-crafted notes, examples, and practice questions built for focused, exam-ready study sessions.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick links</h4>
            <div className="mt-3 space-y-2">
              {quickLinks.map((item) => (
                item.action === 'logout' ? (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => {
                      // Navigate first to ensure we leave protected routes before auth state flips
                      navigate('/landing', { replace: true });
                      logout();
                    }}
                    className="group flex items-center gap-1 text-foreground/80 transition hover:text-primary"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="group flex items-center gap-1 text-foreground/80 transition hover:text-primary"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                )
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Features</h4>
            <div className="mt-3 space-y-2">
              {['Structured notes', 'Practice questions', 'Exam tips', 'Read aloud'].map((label) => (
                <span key={label} className="block text-foreground/80">{label}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Legal</h4>
            <div className="mt-3 space-y-2">
              {[
                { label: 'Privacy', to: '/legal/privacy' },
                { label: 'Terms', to: '/legal/terms' },
                { label: 'Cookies', to: '/legal/cookies' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group flex items-center gap-1 text-foreground/80 transition hover:text-primary"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-english" /> for students everywhere
          </div>
          <p>© {currentYear} Study Assistant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
