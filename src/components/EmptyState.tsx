import { Search, BookX, Sparkles } from 'lucide-react';
import { TopicContent } from '@/data/subjects';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type: 'initial' | 'no-results';
  query?: string;
  colorClass?: string;
  relatedTopics?: TopicContent[];
  onTopicClick?: (topic: string) => void;
}

const EmptyState = ({ 
  type, 
  query, 
  colorClass = 'primary',
  relatedTopics = [],
  onTopicClick
}: EmptyStateProps) => {
  if (type === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center sm:py-16 animate-fade-in">
        <div className={cn(
          "mb-5 flex h-16 w-16 items-center justify-center rounded-2xl sm:mb-6 sm:h-20 sm:w-20",
          `bg-${colorClass}`
        )}>
          <Search className={cn("h-8 w-8 sm:h-10 sm:w-10", `text-${colorClass}`)} />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
          Look up a topic
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground sm:text-base">
          Enter a topic name above to get a detailed explanation with examples and exam tips.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in sm:py-16">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted sm:mb-6 sm:h-20 sm:w-20">
        <BookX className="h-8 w-8 text-muted-foreground sm:h-10 sm:w-10" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
        Topic not found
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground sm:text-base">
        We couldn't find an exact match for "<span className="font-medium text-foreground">{query}</span>".
      </p>
      
      {/* Related Topics Section - Always show suggestions */}
      {relatedTopics.length > 0 && (
        <div className="mt-8 w-full max-w-md animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className={cn("h-4 w-4", `text-${colorClass}`)} />
            <p className="text-sm font-medium text-muted-foreground">
              Did you mean?
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {relatedTopics.slice(0, 5).map((topic, index) => (
              <button
                key={topic.title}
                onClick={() => onTopicClick?.(topic.title)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  `border-${colorClass} bg-${colorClass}/10 text-foreground`,
                  `hover:bg-${colorClass}/20 focus-visible:ring-${colorClass}`,
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {topic.title}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Click a suggestion to view the topic
          </p>
        </div>
      )}
      
      {/* Fallback suggestions when no related topics found */}
      {relatedTopics.length === 0 && (
        <div className="mt-6 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            💡 Try searching for: <span className="font-medium">Photosynthesis</span>, <span className="font-medium">Quadratic Equations</span>, or <span className="font-medium">Atomic Structure</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
