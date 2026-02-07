import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  colorClass?: string;
  message?: string;
  submessage?: string;
}

const LoadingSpinner = ({ 
  colorClass = 'primary',
  message = 'Retrieving your topic...',
  submessage = 'Preparing a detailed explanation for you'
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 animate-fade-in">
      <div className="relative mb-6">
        {/* Outer static ring */}
        <div className="h-14 w-14 rounded-full border-4 border-muted sm:h-16 sm:w-16" />
        
        {/* Spinning arc */}
        <div 
          className={cn(
            "absolute inset-0 h-14 w-14 rounded-full border-4 border-transparent animate-spin-slow sm:h-16 sm:w-16"
          )} 
          style={{ borderTopColor: `hsl(var(--${colorClass}))` }}
        />
        
        {/* Inner pulsing dot */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
        >
          <div 
            className={cn(
              "h-3 w-3 rounded-full animate-pulse-soft",
              `bg-${colorClass}`
            )}
            style={{ backgroundColor: `hsl(var(--${colorClass}))` }}
          />
        </div>
      </div>
      
      <p className="text-base font-medium text-foreground sm:text-lg animate-pulse-soft">
        {message}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {submessage}
      </p>
    </div>
  );
};

export default LoadingSpinner;
