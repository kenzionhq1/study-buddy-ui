import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  colorClass?: string;
}

const LoadingSpinner = ({ colorClass = 'primary' }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        {/* Outer ring */}
        <div className={cn(
          "h-16 w-16 rounded-full border-4 border-muted",
        )} />
        {/* Spinning arc */}
        <div className={cn(
          "absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent animate-spin-slow",
          `border-t-${colorClass}`
        )} 
        style={{ borderTopColor: `hsl(var(--${colorClass}))` }}
        />
      </div>
      <p className="mt-6 text-lg font-medium text-foreground animate-pulse-soft">
        Finding your topic...
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Preparing a detailed explanation for you
      </p>
    </div>
  );
};

export default LoadingSpinner;
