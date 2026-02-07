import { Link } from 'react-router-dom';
import { 
  Leaf, 
  FlaskConical, 
  Calculator, 
  Atom, 
  BookOpen, 
  Pi,
  type LucideIcon 
} from 'lucide-react';
import { Subject } from '@/data/subjects';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  FlaskConical,
  Calculator,
  Atom,
  BookOpen,
  Pi,
};

interface SubjectCardProps {
  subject: Subject;
  index: number;
}

const SubjectCard = ({ subject, index }: SubjectCardProps) => {
  const Icon = iconMap[subject.icon] || BookOpen;

  return (
    <Link
      to={`/subject/${subject.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border-2 p-3.5 transition-all duration-200 sm:rounded-2xl sm:p-5 lg:p-6",
        "bg-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5",
        `border-${subject.colorClass} hover:border-${subject.colorClass}`,
        "animate-slide-up opacity-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        `stagger-${index + 1} focus-visible:ring-${subject.colorClass}`
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Background decoration */}
      <div 
        className={cn(
          "absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-15 transition-transform duration-200 group-hover:scale-105 sm:-right-6 sm:-top-6 sm:h-24 sm:w-24 lg:-right-8 lg:-top-8 lg:h-28 lg:w-28",
          `bg-${subject.colorClass}`
        )} 
      />
      
      {/* Icon */}
      <div 
        className={cn(
          "mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 sm:mb-3 sm:h-12 sm:w-12 sm:rounded-xl lg:h-14 lg:w-14",
          `bg-${subject.colorClass}`
        )}
      >
        <Icon className={cn("h-4.5 w-4.5 sm:h-6 sm:w-6 lg:h-7 lg:w-7", `text-${subject.colorClass}`)} />
      </div>

      {/* Content */}
      <h3 className="mb-0.5 text-sm font-bold text-foreground sm:mb-1 sm:text-lg lg:text-xl">
        {subject.name}
      </h3>
      <p className="mb-2.5 hidden text-sm leading-relaxed text-muted-foreground sm:mb-3 sm:line-clamp-2 sm:block lg:mb-4">
        {subject.description}
      </p>

      {/* Topics preview */}
      <div className="mt-auto flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2">
        {subject.topics.slice(0, 2).map((topic) => (
          <span
            key={topic}
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-0.5 sm:text-xs",
              `bg-${subject.colorClass} text-${subject.colorClass}`
            )}
          >
            {topic}
          </span>
        ))}
        <span className="hidden lg:inline-flex">
          {subject.topics.slice(2, 3).map((topic) => (
            <span
              key={topic}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                `bg-${subject.colorClass} text-${subject.colorClass}`
              )}
            >
              {topic}
            </span>
          ))}
        </span>
        {subject.topics.length > 2 && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground lg:hidden">
            +{subject.topics.length - 2}
          </span>
        )}
        {subject.topics.length > 3 && (
          <span className="hidden rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground lg:inline-flex">
            +{subject.topics.length - 3} more
          </span>
        )}
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-secondary opacity-0 transition-all duration-200 group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:h-8 sm:w-8 lg:bottom-5 lg:right-5 lg:h-9 lg:w-9">
        <svg
          className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5", `text-${subject.colorClass}`)}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </Link>
  );
};

export default SubjectCard;
