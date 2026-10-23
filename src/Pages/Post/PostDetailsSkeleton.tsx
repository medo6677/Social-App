
export default function PostDetailsSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-16 animate-pulse">
      <div className="bg-white/80 border border-slate-200/80 rounded-2xl px-4 sm:px-6 py-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-200" />
          <div className="h-5 w-24 rounded-lg bg-slate-200" />
          <div className="h-4 w-28 rounded-md bg-slate-100 hidden sm:block" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 rounded-xl bg-slate-100" />
          <div className="w-8 h-8 rounded-xl bg-slate-100" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col divide-y divide-slate-100">
        <div className="p-6 sm:p-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-36 rounded-md bg-slate-200" />
              <div className="h-3 w-48 rounded-md bg-slate-100" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-20 rounded-full bg-slate-200" />
            <div className="w-8 h-8 rounded-xl bg-slate-100" />
          </div>
        </div>

        <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">
          <div className="space-y-2.5">
            <div className="h-4 w-full rounded-md bg-slate-200" />
            <div className="h-4 w-11/12 rounded-md bg-slate-200" />
            <div className="h-4 w-4/5 rounded-md bg-slate-100" />
          </div>

          <div className="flex gap-2 pt-1">
            <div className="h-6 w-24 rounded-lg bg-slate-100" />
            <div className="h-6 w-20 rounded-lg bg-slate-100" />
            <div className="h-6 w-28 rounded-lg bg-slate-100" />
          </div>

          <div className="w-full h-72 sm:h-96 rounded-2xl sm:rounded-3xl bg-slate-200" />
        </div>

        <div className="px-6 sm:px-8 py-4 flex flex-col gap-4 bg-slate-50/40">
          <div className="flex items-center justify-between">
            <div className="h-3 w-44 rounded-md bg-slate-200" />
            <div className="h-3 w-16 rounded-md bg-slate-100" />
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
            <div className="h-10 flex-1 rounded-xl bg-slate-100" />
            <div className="h-10 flex-1 rounded-xl bg-slate-100" />
            <div className="h-10 flex-1 rounded-xl bg-slate-100" />
            <div className="h-10 flex-1 rounded-xl bg-slate-100" />
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 rounded-md bg-slate-200" />
            <div className="h-7 w-24 rounded-xl bg-slate-100" />
          </div>

          <div className="flex gap-3 sm:gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 mt-1" />
            <div className="flex-1 h-24 rounded-2xl bg-slate-100" />
          </div>

          <div className="flex flex-col gap-5 pt-2">
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 mt-1" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-20 rounded-2xl bg-slate-100 w-full" />
                <div className="h-3 w-28 rounded-md bg-slate-100 ml-2" />
              </div>
            </div>

            <div className="ml-8 sm:ml-12 pl-4 border-l-2 border-slate-200 flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-slate-200 shrink-0 mt-1" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-16 rounded-2xl bg-slate-100 w-full" />
                <div className="h-3 w-24 rounded-md bg-slate-100 ml-2" />
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 mt-1" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-20 rounded-2xl bg-slate-100 w-full" />
                <div className="h-3 w-28 rounded-md bg-slate-100 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
