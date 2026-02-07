import { cn } from '@/lib/utils';

interface SuggestedTopicsProps {
  topics: string[];
  onTopicClick: (topic: string) => void;
  colorClass?: string;
}

const SuggestedTopics = ({ topics, onTopicClick, colorClass = 'primary' }: SuggestedTopicsProps) => {
  return (
    <div className="mt-6 sm:mt-8 animate-fade-in">
      <p className="mb-3 text-center text-sm font-medium text-muted-foreground sm:mb-4">
        Popular topics to explore:
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {topics.map((topic, index) => (
          <button
            key={topic}
            onClick={() => onTopicClick(topic)}
            className={cn(
              "rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-sm",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "sm:px-4 sm:py-2",
              `border-${colorClass} bg-${colorClass} text-${colorClass}`,
              `hover:bg-${colorClass} focus-visible:ring-${colorClass}`
            )}
            style={{ animationDelay: `${index * 0.03}s` }}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTopics;
