interface PostSkeletonProps {
  count?: number;
}

export function SinglePostSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 shadow-xs animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200" />
          <div className="space-y-2">
            <div className="h-3.5 w-28 bg-slate-200 rounded-md" />
            <div className="h-2.5 w-16 bg-slate-100 rounded-md" />
          </div>
        </div>
        <div className="w-6 h-6 rounded-lg bg-slate-100" />
      </div>

      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-200 rounded-md" />
        <div className="h-3 w-4/5 bg-slate-200 rounded-md" />
        <div className="h-3 w-2/3 bg-slate-100 rounded-md" />
      </div>

      <div className="w-full h-56 rounded-xl bg-slate-100 border border-slate-100/60" />

      <div className="flex items-center justify-between px-1 pt-1">
        <div className="h-2.5 w-14 bg-slate-100 rounded-md" />
        <div className="flex gap-3">
          <div className="h-2.5 w-16 bg-slate-100 rounded-md" />
          <div className="h-2.5 w-12 bg-slate-100 rounded-md" />
        </div>
      </div>

      <div className="flex items-center justify-between border-y border-slate-100 py-2.5 gap-2">
        <div className="h-8 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-8 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-8 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-8 flex-1 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}

export default function PostSkeleton({ count = 3 }: PostSkeletonProps) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <SinglePostSkeleton key={index} />
      ))}
    </div>
  );
}
