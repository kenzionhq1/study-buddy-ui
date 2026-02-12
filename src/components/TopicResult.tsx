import { 
  BookOpen, 
  FileText, 
  List, 
  Lightbulb, 
  GraduationCap,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
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

  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const pages = [
    {
      id: "definition",
      title: "Definition",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      content: (
        <p className="text-base leading-relaxed sm:text-lg">
          {topic.definition}
        </p>
      ),
    },
    {
      id: "explanation",
      title: "Detailed Explanation",
      icon: <FileText className="h-5 w-5 text-primary" />,
      content: topic.explanation.split('\n\n').map((p, i) => (
        <p key={i} className="mb-4 last:mb-0 leading-relaxed">
          {p}
        </p>
      )),
    },
    {
      id: "keypoints",
      title: "Key Points",
      icon: <List className="h-5 w-5 text-primary" />,
      content: (
        <ul className="space-y-3">
          {topic.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary shrink-0" />
              <span className="text-sm sm:text-base">{point}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "example",
      title: topic.example.title,
      icon: <Lightbulb className="h-5 w-5 text-primary" />,
      content: topic.example.content.split('\n').map((line, i) => (
        <p key={i} className="mb-2 last:mb-0 leading-relaxed">
          {line}
        </p>
      )),
    },
    {
      id: "tips",
      title: "WAEC/NECO Exam Tips",
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      content: (
        <ul className="space-y-3">
          {topic.examTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm sm:text-base">{tip}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  const changePage = (direction: 'next' | 'prev') => {
    if (
      (direction === 'next' && currentPage >= pages.length - 1) ||
      (direction === 'prev' && currentPage <= 0)
    ) return;

    setIsFlipping(true);

    setTimeout(() => {
      setCurrentPage(prev =>
        direction === 'next' ? prev + 1 : prev - 1
      );
      setIsFlipping(false);
    }, 250);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Topic Header */}
      <header className="relative rounded-2xl border p-6 sm:p-8 bg-card">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-primary">
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
                <Sparkles className="h-3 w-3 animate-spin" />
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
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            )}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
          {topic.title}
        </h1>

        {bookmarked && (
          <p className="mt-2 text-sm text-muted-foreground">
            ✓ Saved for revision
          </p>
        )}
      </header>

      {/* Flip Book Section */}
      <div className="relative perspective-1000">
        <div
          className={cn(
            "rounded-2xl border border-border bg-card p-6 shadow-xl transition-transform duration-300 sm:p-8",
            isFlipping && "rotate-y-180"
          )}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              {pages[currentPage].icon}
            </div>
            <h2 className="text-lg font-bold sm:text-xl">
              {pages[currentPage].title}
            </h2>
          </div>

          <div className="prose prose-sm sm:prose-base max-w-none">
            {pages[currentPage].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => changePage('prev')}
            disabled={currentPage === 0}
            className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm transition hover:bg-muted/70 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="text-sm text-muted-foreground">
            {currentPage + 1} / {pages.length}
          </span>

          <button
            onClick={() => changePage('next')}
            disabled={currentPage === pages.length - 1}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicResult;
