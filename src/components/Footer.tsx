import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-4 sm:py-6">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            Made with <Heart className="h-4 w-4 text-english" /> for SS1–SS3 students
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            © 2024 Student Study Assistant
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
