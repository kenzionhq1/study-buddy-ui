import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'cookie-consent';

type Consent = 'accepted' | 'rejected';

const CookieBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (!stored) {
      setOpen(true);
    }
  }, []);

  const handleChoice = (choice: Consent) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur shadow-lg">
      <div className="container flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-foreground">Cookies & preferences</p>
          <p className="text-muted-foreground">
            We use cookies to keep you signed in and improve your study experience. You can accept or reject non-essential cookies at any time.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-lg px-4" onClick={() => handleChoice('rejected')}>
            Reject
          </Button>
          <Button className="rounded-lg px-4" onClick={() => handleChoice('accepted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
