import { cn } from '@/lib/utils';

interface SuggestedTopicsProps {
  topics: string[];
  onTopicClick: (topic: string) => void;
  colorClass?: string;
}

const SuggestedTopics = ({ topics, onTopicClick, colorClass = 'primary' }: SuggestedTopicsProps) => {
  return (
    <div className="mt-8">
      <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
        Popular topics to explore:
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicClick(topic)}
            className={cn(
              "rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200",
              "hover:-translate-y-0.5",
              `border-${colorClass} bg-${colorClass} text-${colorClass}`,
              `hover:bg-${colorClass}`
            )}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTopics;
