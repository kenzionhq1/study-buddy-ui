import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-6">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Student Study Assistant. Built for Nigerian students.
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-english" /> for SS1–SS3 students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
