import { useState, FormEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  colorClass?: string;
}

const SearchBar = ({ 
  onSearch, 
  isLoading = false, 
  placeholder = "Look up a topic (e.g. Photosynthesis)",
  colorClass = "primary"
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        {/* Search icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-5">
          {isLoading ? (
            <Loader2 className={cn("h-5 w-5 animate-spin", `text-${colorClass}`)} />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        
        {/* Input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className={cn(
            "w-full rounded-xl border-2 bg-card py-3.5 pl-12 pr-28 text-base text-foreground shadow-card transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:shadow-card-hover",
            "sm:rounded-2xl sm:py-4 sm:pl-14 sm:pr-32",
            `border-border focus:border-${colorClass} focus:ring-2`,
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
          style={{
            '--tw-ring-color': `hsl(var(--${colorClass}) / 0.3)`
          } as React.CSSProperties}
        />
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={cn(
            "absolute inset-y-1.5 right-1.5 flex items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all duration-200",
            "sm:inset-y-2 sm:right-2 sm:rounded-xl sm:px-6",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline truncate max-w-[80px]">Searching...</span>
            </>
          ) : (
            <span>Look Up</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
