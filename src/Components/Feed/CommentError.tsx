import { MessageCircleX, RefreshCw } from 'lucide-react';

interface CommentErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function CommentError({
  message = "Couldn't load comments",
  onRetry,
}: CommentErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 px-4 rounded-2xl bg-rose-50/60 border border-rose-100">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-100">
        <MessageCircleX className="text-rose-500" size={20} />
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-slate-800">{message}</p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-rose-600 bg-white border border-rose-200 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-colors cursor-pointer shadow-xs"
        >
          <RefreshCw size={13} />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
