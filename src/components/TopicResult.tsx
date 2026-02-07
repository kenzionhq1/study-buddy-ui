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
    <div className="animate-fade-in space-y-5 sm:space-y-6">
      {/* Topic Header */}
      <header className={cn(
        "relative rounded-2xl border-2 p-5 sm:p-8",
        `bg-${colorClass} border-${colorClass}`
      )}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("text-sm font-semibold", `text-${colorClass}`)}>
              {topic.subject}
            </span>
            {topic.isAiEnhanced && (
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                <Sparkles className="h-3 w-3" />
                AI-Enhanced
              </Badge>
            )}
            {isAiLoading && (
              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                <Sparkles className="h-3 w-3 animate-spin-slow" />
                Enhancing...
              </Badge>
            )}
          </div>
          <button
            onClick={() => toggleBookmark(topic)}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
              bookmarked
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground hover:shadow-sm"
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
        <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
          {topic.title}
        </h1>
        {bookmarked && (
          <p className="mt-2 text-sm text-muted-foreground">
            ✓ Saved for revision
          </p>
        )}
      </header>

      {/* Definition - Section 1 */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">Definition</h2>
        </div>
        <p className="text-base leading-relaxed text-foreground sm:text-lg">
          {topic.definition}
        </p>
      </section>

      {/* Detailed Explanation - Section 2 */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">Detailed Explanation</h2>
        </div>
        <div className="prose prose-sm sm:prose-base max-w-none">
          {topic.explanation.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0 leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Key Points - Section 3 */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <List className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">Key Points</h2>
        </div>
        <ul className="space-y-3">
          {topic.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className={cn("mt-0.5 h-5 w-5 shrink-0", `text-${colorClass}`)} />
              <span className="text-sm text-foreground sm:text-base">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Example - Section 4 */}
      <section className={cn(
        "rounded-2xl border-2 p-5 sm:p-6 lg:p-8",
        `bg-${colorClass} border-${colorClass}`
      )}>
        <div className="mb-4 flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            `bg-${colorClass}`
          )}>
            <Lightbulb className={cn("h-5 w-5", `text-${colorClass}`)} />
          </div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">{topic.example.title}</h2>
        </div>
        <div className="prose prose-sm sm:prose-base max-w-none">
          {topic.example.content.split('\n').map((line, index) => (
            <p key={index} className="mb-2 last:mb-0 leading-relaxed text-foreground">
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Exam Tips - Section 5 */}
      <section className="rounded-2xl border-2 border-primary bg-accent p-5 shadow-card sm:p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">WAEC/NECO Exam Tips</h2>
        </div>
        <ul className="space-y-3">
          {topic.examTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </span>
              <span className="text-sm text-foreground sm:text-base">{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TopicResult;
