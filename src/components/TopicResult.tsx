import { 
  BookOpen, 
  FileText, 
  List, 
  Lightbulb, 
  GraduationCap,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Sparkles
} from 'lucide-react';
import { TopicContent } from '@/data/subjects';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TopicResultProps {
  topic: TopicContent;
  colorClass?: string;
  isAiLoading?: boolean;
}

const TopicResult = ({ topic, colorClass = 'primary', isAiLoading = false }: TopicResultProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(topic.title);

  return (
    <div className="animate-fade-in space-y-6">
      {/* Topic Header */}
      <div className={cn(
        "relative rounded-2xl border-2 p-6 sm:p-8",
        `bg-${colorClass} border-${colorClass}`
      )}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-medium", `text-${colorClass}`)}>
              {topic.subject}
            </span>
            {topic.isAiEnhanced && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                <Sparkles className="h-3 w-3" />
                AI-Enhanced
              </Badge>
            )}
            {isAiLoading && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs animate-pulse">
                <Sparkles className="h-3 w-3 animate-spin" />
                Enhancing...
              </Badge>
            )}
          </div>
          <button
            onClick={() => toggleBookmark(topic)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
              bookmarked
                ? "bg-primary text-primary-foreground"
                : "bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
            )}
            aria-label={bookmarked ? "Remove bookmark" : "Save topic"}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
          {topic.title}
        </h1>
        {bookmarked && (
          <p className="mt-2 text-sm text-muted-foreground">
            ✓ Saved for revision
          </p>
        )}
      </div>

      {/* Definition */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Definition</h2>
        </div>
        <p className="text-lg leading-relaxed text-foreground">
          {topic.definition}
        </p>
      </section>

      {/* Detailed Explanation */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Detailed Explanation</h2>
        </div>
        <div className="prose prose-lg max-w-none">
          {topic.explanation.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Key Points */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <List className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Key Points</h2>
        </div>
        <ul className="space-y-3">
          {topic.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className={cn("mt-0.5 h-5 w-5 flex-shrink-0", `text-${colorClass}`)} />
              <span className="text-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Example */}
      <section className={cn(
        "rounded-2xl border-2 p-6 sm:p-8",
        `bg-${colorClass} border-${colorClass}`
      )}>
        <div className="mb-4 flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            `bg-${colorClass}`
          )}>
            <Lightbulb className={cn("h-5 w-5", `text-${colorClass}`)} />
          </div>
          <h2 className="text-xl font-bold text-foreground">{topic.example.title}</h2>
        </div>
        <div className="prose prose-lg max-w-none">
          {topic.example.content.split('\n').map((line, index) => (
            <p key={index} className="mb-2 leading-relaxed text-foreground">
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Exam Tips */}
      <section className="rounded-2xl border-2 border-primary bg-accent p-6 shadow-card sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">WAEC/NECO Exam Tips</h2>
        </div>
        <ul className="space-y-3">
          {topic.examTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
              <span className="text-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TopicResult;
