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
        "group relative flex flex-col overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 sm:rounded-2xl sm:p-6",
        "bg-card shadow-card hover:shadow-card-hover hover:-translate-y-1",
        `border-${subject.colorClass} hover:border-${subject.colorClass}`,
        "animate-slide-up opacity-0",
        `stagger-${index + 1}`
      )}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Background decoration */}
      <div 
        className={cn(
          "absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20 transition-transform duration-300 group-hover:scale-110 sm:-right-8 sm:-top-8 sm:h-32 sm:w-32",
          `bg-${subject.colorClass}`
        )} 
      />
      
      {/* Icon */}
      <div 
        className={cn(
          "mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:h-14 sm:w-14 sm:rounded-xl",
          `bg-${subject.colorClass}`
        )}
      >
        <Icon className={cn("h-5 w-5 sm:h-7 sm:w-7", `text-${subject.colorClass}`)} />
      </div>

      {/* Content */}
      <h3 className="mb-1 text-base font-bold text-foreground sm:mb-2 sm:text-xl">
        {subject.name}
      </h3>
      <p className="mb-3 hidden text-sm leading-relaxed text-muted-foreground sm:mb-4 sm:block">
        {subject.description}
      </p>

      {/* Topics preview */}
      <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2">
        {subject.topics.slice(0, 2).map((topic) => (
          <span
            key={topic}
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-3 sm:py-1 sm:text-xs",
              `bg-${subject.colorClass} text-${subject.colorClass}`
            )}
          >
            {topic}
          </span>
        ))}
        <span className="hidden sm:inline-flex">
          {subject.topics.slice(2, 3).map((topic) => (
            <span
              key={topic}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                `bg-${subject.colorClass} text-${subject.colorClass}`
              )}
            >
              {topic}
            </span>
          ))}
        </span>
        {subject.topics.length > 2 && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:hidden">
            +{subject.topics.length - 2}
          </span>
        )}
        {subject.topics.length > 3 && (
          <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
            +{subject.topics.length - 3} more
          </span>
        )}
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-secondary opacity-0 transition-all duration-300 group-hover:opacity-100 sm:bottom-6 sm:right-6 sm:h-10 sm:w-10">
        <svg
          className={cn("h-4 w-4 sm:h-5 sm:w-5", `text-${subject.colorClass}`)}
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
