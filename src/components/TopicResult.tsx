import { 
  BookOpen, 
  FileText, 
  CheckCircle2,
  Lightbulb, 
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Globe
} from 'lucide-react';
import { TopicContent } from '@/data/subjects';
import { useBookmarks } from '@/hooks/useBookmarks';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TopicResultProps {
  topic: TopicContent;
  colorClass?: string;
}

const TopicResult = ({ topic, colorClass = 'primary' }: TopicResultProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(topic.title);

  return (
    <div className="animate-fade-in">
      {/* Main AI Panel Container */}
      <div className={cn(
        "relative overflow-hidden rounded-3xl border bg-card shadow-xl",
        "ring-1 ring-black/5 dark:ring-white/5"
      )}>
        {/* Subtle gradient overlay at top */}
        <div className={cn(
          "absolute inset-x-0 top-0 h-32 opacity-50",
          `bg-gradient-to-b from-${colorClass}/20 to-transparent`
        )} />

        <ScrollArea className="relative max-h-[80vh]">
          <div className="p-6 sm:p-8 lg:p-10">
            
            {/* Panel Header */}
            <header className="mb-8 space-y-4">
              {/* Subject Badge & AI Label */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                    `bg-${colorClass}/20 text-${colorClass} border-${colorClass}/30`
                  )}
                >
                  {topic.subject}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI-powered explanation</span>
                </div>
              </div>

              {/* Topic Title */}
              <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                {topic.title}
              </h1>

              {/* Actions Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleBookmark(topic)}
                  className={cn(
                    "gap-2 rounded-full transition-all",
                    bookmarked && "bg-primary text-primary-foreground"
                  )}
                >
                  {bookmarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" />
                      <span>Save for later</span>
                    </>
                  )}
                </Button>
              </div>
            </header>

            {/* Content Sections */}
            <div className="space-y-8">
              
              {/* 📘 Definition Section */}
              <section className="group">
                <div className="mb-3 flex items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                    `bg-${colorClass}/10 group-hover:bg-${colorClass}/20`
                  )}>
                    <BookOpen className={cn("h-5 w-5", `text-${colorClass}`)} />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Definition</h2>
                </div>
                <div className={cn(
                  "rounded-2xl border border-border/50 bg-muted/30 p-5",
                  "transition-colors hover:bg-muted/50"
                )}>
                  <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                    {topic.definition}
                  </p>
                </div>
              </section>

              {/* 🧠 Explanation Section */}
              <section className="group">
                <div className="mb-3 flex items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                    `bg-${colorClass}/10 group-hover:bg-${colorClass}/20`
                  )}>
                    <FileText className={cn("h-5 w-5", `text-${colorClass}`)} />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Detailed Explanation</h2>
                </div>
                <div className="space-y-4 pl-12">
                  {topic.explanation.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-base leading-relaxed text-foreground/80">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* ✅ Key Points Section */}
              <section className="group">
                <div className="mb-3 flex items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                    `bg-${colorClass}/10 group-hover:bg-${colorClass}/20`
                  )}>
                    <CheckCircle2 className={cn("h-5 w-5", `text-${colorClass}`)} />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Key Points</h2>
                </div>
                <ul className="space-y-3 pl-12">
                  {topic.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className={cn(
                        "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full",
                        `bg-${colorClass}`
                      )} />
                      <span className="text-base text-foreground/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 🌍 Real-World Example Section */}
              <section className="group">
                <div className="mb-3 flex items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                    `bg-${colorClass}/10 group-hover:bg-${colorClass}/20`
                  )}>
                    <Globe className={cn("h-5 w-5", `text-${colorClass}`)} />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{topic.example.title}</h2>
                </div>
                <div className={cn(
                  "rounded-2xl border-2 p-5",
                  `border-${colorClass}/30 bg-${colorClass}/5`
                )}>
                  <div className="space-y-2">
                    {topic.example.content.split('\n').map((line, index) => (
                      <p key={index} className="text-base leading-relaxed text-foreground/90">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </section>

              {/* 🎯 Exam Tips Section */}
              <section className="group">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">WAEC/NECO Exam Tips</h2>
                </div>
                <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
                  <ul className="space-y-4">
                    {topic.examTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <span className="pt-0.5 text-base text-foreground/90">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

            </div>

            {/* Footer */}
            <footer className="mt-10 border-t border-border/50 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Tip: Save this topic to review later before exams</span>
                </div>
                {bookmarked && (
                  <span className="flex items-center gap-1.5 text-primary">
                    <BookmarkCheck className="h-4 w-4" />
                    Saved for revision
                  </span>
                )}
              </div>
            </footer>

          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TopicResult;
