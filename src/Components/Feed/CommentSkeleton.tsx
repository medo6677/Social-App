interface CommentSkeletonProps {
  count?: number;
}

function SingleCommentSkeleton() {
  return (
    <div className="flex items-start gap-2.5 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 ring-1 ring-slate-100" />

      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <div className="bg-slate-50 rounded-2xl p-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex flex-col gap-1.5">
              <div className="h-2.5 w-24 bg-slate-200 rounded-md" />
              <div className="h-2 w-14 bg-slate-100 rounded-md" />
            </div>
            <div className="w-5 h-5 rounded-md bg-slate-100" />
          </div>

          <div className="space-y-1.5 mt-1">
            <div className="h-2.5 w-full bg-slate-200 rounded-md" />
            <div className="h-2.5 w-4/5 bg-slate-200 rounded-md" />
            <div className="h-2.5 w-3/5 bg-slate-100 rounded-md" />
          </div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="h-2 w-8 bg-slate-100 rounded-md" />
          <div className="h-2 w-1 bg-slate-100 rounded-full" />
          <div className="h-2 w-6 bg-slate-100 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function CommentSkeleton({ count = 3 }: CommentSkeletonProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <SingleCommentSkeleton key={index} />
      ))}
    </div>
  );
}
