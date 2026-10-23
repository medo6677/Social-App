
export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs">
        <div className="h-48 sm:h-64 bg-slate-200" />

        <div className="px-4 sm:px-8 pb-8">
          <div className="flex justify-between items-end -mt-16 sm:-mt-20 mb-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-slate-200 ring-4 ring-white" />
            <div className="h-10 w-28 bg-slate-200 rounded-xl" />
          </div>

          <div className="h-6 w-44 bg-slate-200 rounded-md mb-2" />
          <div className="h-4 w-28 bg-slate-200 rounded-md mb-4" />

          <div className="h-4 w-full max-w-md bg-slate-200 rounded-md mb-2" />
          <div className="h-4 w-3/4 max-w-sm bg-slate-200 rounded-md mb-6" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-slate-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-slate-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>

      <div className="h-12 bg-white rounded-2xl border border-slate-100" />

      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-48 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
    </div>
  );
}
