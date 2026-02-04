import { Search, BookX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type: 'initial' | 'no-results';
  query?: string;
  colorClass?: string;
}

const EmptyState = ({ type, query, colorClass = 'primary' }: EmptyStateProps) => {
  if (type === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className={cn(
          "mb-6 flex h-20 w-20 items-center justify-center rounded-2xl",
          `bg-${colorClass}`
        )}>
          <Search className={cn("h-10 w-10", `text-${colorClass}`)} />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          Search for a topic
        </h3>
        <p className="max-w-sm text-muted-foreground">
          Enter a topic name above to get a detailed explanation with examples and exam tips.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
        <BookX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">
        Topic not found
      </h3>
      <p className="max-w-sm text-muted-foreground">
        We couldn't find any results for "<span className="font-medium text-foreground">{query}</span>". 
        Try searching for a different topic or check your spelling.
      </p>
      <div className="mt-6">
        <p className="text-sm text-muted-foreground">
          💡 Try searching for: <span className="font-medium">Photosynthesis</span>, <span className="font-medium">Quadratic Equations</span>, or <span className="font-medium">Atomic Structure</span>
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
