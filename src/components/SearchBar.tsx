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
  placeholder = "Search a topic (e.g. Photosynthesis)",
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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
          {isLoading ? (
            <Loader2 className={cn("h-5 w-5 animate-spin", `text-${colorClass}`)} />
          ) : (
            <Search className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className={cn(
            "w-full rounded-2xl border-2 bg-card py-4 pl-14 pr-32 text-base text-foreground shadow-card transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:shadow-card-hover",
            `border-border focus:border-${colorClass} focus:ring-2 ring-${colorClass}`,
            "disabled:cursor-not-allowed disabled:opacity-60"
          )}
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={cn(
            "absolute inset-y-2 right-2 flex items-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all duration-200",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="truncate max-w-[100px]">Searching "{query}"...</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
