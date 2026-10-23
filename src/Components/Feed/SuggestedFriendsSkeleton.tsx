
export default function SuggestedFriendsSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 flex flex-col gap-4 shadow-xs animate-pulse">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-xl bg-slate-100" />
          <div className="h-4 w-32 bg-slate-200 rounded-md" />
        </div>
        <div className="size-6 rounded-lg bg-slate-100" />
      </div>

      <div className="flex flex-col divide-y divide-slate-100/80">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 first:pt-1 last:pb-0 gap-3"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="size-10 rounded-full bg-slate-200 shrink-0 ring-2 ring-slate-100" />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-3.5 w-24 bg-slate-200 rounded-md" />
                <div className="h-2.5 w-16 bg-slate-100 rounded-md" />
              </div>
            </div>

            <div className="h-7 w-20 rounded-full bg-slate-200 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
