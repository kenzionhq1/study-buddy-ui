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
        "group relative flex flex-col overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300",
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
          "absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 transition-transform duration-300 group-hover:scale-110",
          `bg-${subject.colorClass}`
        )} 
      />
      
      {/* Icon */}
      <div 
        className={cn(
          "mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          `bg-${subject.colorClass}`
        )}
      >
        <Icon className={cn("h-7 w-7", `text-${subject.colorClass}`)} />
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-bold text-foreground">
        {subject.name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {subject.description}
      </p>

      {/* Topics preview */}
      <div className="mt-auto flex flex-wrap gap-2">
        {subject.topics.slice(0, 3).map((topic) => (
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
        {subject.topics.length > 3 && (
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            +{subject.topics.length - 3} more
          </span>
        )}
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-secondary opacity-0 transition-all duration-300 group-hover:opacity-100">
        <svg
          className={cn("h-5 w-5", `text-${subject.colorClass}`)}
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
