
export default function UserProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-16 animate-pulse">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="h-48 sm:h-64 w-full bg-slate-200" />

        <div className="px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-4 ring-white bg-slate-300 shadow-xl" />

            <div className="flex items-center gap-2.5 sm:mb-2">
              <div className="h-10 w-28 rounded-xl bg-slate-200" />
              <div className="h-10 w-28 rounded-xl bg-slate-200" />
              <div className="h-10 w-10 rounded-xl bg-slate-200" />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="h-7 w-48 rounded-lg bg-slate-200" />
            <div className="h-4 w-32 rounded-lg bg-slate-200" />
            <div className="h-4 w-full max-w-md rounded-lg bg-slate-200 mt-1" />
            <div className="h-4 w-3/4 max-w-sm rounded-lg bg-slate-200" />
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 border-t border-slate-100">
            <div className="h-4 w-24 rounded-lg bg-slate-200" />
            <div className="h-4 w-28 rounded-lg bg-slate-200" />
            <div className="h-4 w-36 rounded-lg bg-slate-200" />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-100 max-w-md">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="h-6 w-12 rounded-lg bg-slate-200" />
                <div className="h-3 w-16 rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-xs flex items-center gap-2">
        <div className="h-9 w-24 rounded-xl bg-slate-200" />
        <div className="h-9 w-24 rounded-xl bg-slate-200" />
      </div>

      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-4 w-32 rounded-lg bg-slate-200" />
              <div className="h-3 w-20 rounded-lg bg-slate-200" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full rounded-lg bg-slate-200" />
            <div className="h-4 w-5/6 rounded-lg bg-slate-200" />
            <div className="h-4 w-3/4 rounded-lg bg-slate-200" />
          </div>
          {i === 1 && (
            <div className="h-48 w-full rounded-xl bg-slate-200" />
          )}
          <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
            <div className="h-4 w-10 rounded-lg bg-slate-200" />
            <div className="h-4 w-10 rounded-lg bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
