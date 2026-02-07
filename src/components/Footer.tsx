import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-card/50 py-4 sm:py-5">
      <div className="container">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            Made with <Heart className="h-3.5 w-3.5 text-english sm:h-4 sm:w-4" /> for SS1–SS3 students
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            © {currentYear} Student Study Assistant
          </p>
        </div>
        <div className="mt-3 border-t border-border pt-3 text-center">
          <p className="text-[11px] text-muted-foreground sm:text-xs">
            Content aligned with WAEC/NECO syllabus • Prototype version
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
