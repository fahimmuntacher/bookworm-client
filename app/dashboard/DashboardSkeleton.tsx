export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Title */}
      <div className="h-7 w-52 bg-slate-200 rounded-lg" />

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-200" />
            <div className="h-5 w-16 bg-slate-300 rounded" />
            <div className="h-3 w-24 bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      {/* Line chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="h-4 w-36 bg-slate-200 rounded mb-6" />
        <div className="h-[220px] bg-slate-100 rounded-xl" />
      </div>

      {/* Recent books */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3"
          >
            <div className="h-4 w-40 bg-slate-300 rounded" />
            <div className="h-3 w-28 bg-slate-200 rounded" />
            <div className="h-2 w-full bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="h-4 w-32 bg-slate-200 rounded mb-6" />
        <div className="h-[220px] bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}
