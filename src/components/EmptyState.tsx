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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className={cn(
          "mb-6 flex h-20 w-20 items-center justify-center rounded-2xl",
          `bg-${colorClass}`
        )}>
          <Search className={cn("h-10 w-10", `text-${colorClass}`)} />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          Look up a topic
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
        Try looking up a different topic or check your spelling.
      </p>
      
      {/* Related Topics Section */}
      {relatedTopics.length > 0 && (
        <div className="mt-8 w-full max-w-md animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className={cn("h-4 w-4", `text-${colorClass}`)} />
            <p className="text-sm font-medium text-muted-foreground">
              Did you mean?
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {relatedTopics.map((topic) => (
              <button
                key={topic.title}
                onClick={() => onTopicClick?.(topic.title)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-md",
                  `border-${colorClass} bg-${colorClass}/10 text-foreground`,
                  `hover:bg-${colorClass}/20`
                )}
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
      
      {relatedTopics.length === 0 && (
        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            💡 Try looking up: <span className="font-medium">Photosynthesis</span>, <span className="font-medium">Quadratic Equations</span>, or <span className="font-medium">Atomic Structure</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
