import { Loader2 } from 'lucide-react';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 'w-5 h-5', text: 'text-xs' },
  md: { icon: 'w-8 h-8', text: 'text-sm' },
  lg: { icon: 'w-12 h-12', text: 'text-base' },
  xl: { icon: 'w-16 h-16', text: 'text-lg' },
};

export default function Loading({
  size = 'md',
  text,
  fullScreen = false,
  className = '',
}: LoadingProps) {
  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 p-6 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute rounded-full bg-blue-500/20 blur-md animate-pulse ${currentSize.icon}`}
        />
        <Loader2
          className={`animate-spin text-blue-600 ${currentSize.icon}`}
          strokeWidth={2.5}
        />
      </div>

      {text && (
        <p className={`font-medium text-slate-500 tracking-wide animate-pulse ${currentSize.text}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xs">
        {content}
      </div>
    );
  }

  return <div className="flex w-full items-center justify-center py-8">{content}</div>;
}
