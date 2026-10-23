import { Sparkles } from 'lucide-react';

interface PageLoadingProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function PageLoading({
  message = 'Loading...',
  fullScreen = true,
  className = '',
}: PageLoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        flex flex-col items-center justify-center p-6 select-none
        ${fullScreen
          ? 'fixed inset-0 z-50 min-h-screen w-screen bg-slate-50/90 backdrop-blur-md'
          : 'w-full min-h-[50vh] bg-transparent'
        }
        ${className}
      `}
    >
      <div className="absolute w-72 h-72 rounded-full bg-linear-to-tr from-indigo-500/15 via-purple-500/10 to-pink-500/15 blur-3xl pointer-events-none animate-pulse" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/20 blur-lg animate-ping opacity-75" />

          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-linear-to-br from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/25 border border-white/20">
            <Sparkles className="w-8 h-8 sm:w-9 sm:h-9 text-white animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            SocialSphere
          </h1>

          <div className="flex items-center gap-2">
            <span className="flex gap-1.5 items-center">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-500 tracking-wide">
              {message}
            </span>
          </div>
        </div>

        <div className="w-48 sm:w-56 h-1 bg-slate-200/80 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full w-2/5 animate-[shimmer_1.4s_infinite_ease-in-out]" />
        </div>
      </div>
    </div>
  );
}
