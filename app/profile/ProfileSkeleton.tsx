export default function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      {/* Header */}
      <div className="h-7 w-40 bg-slate-200 rounded" />

      {/* Card */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="w-30 h-30 bg-slate-200 rounded-full" />

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="h-3 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-48 bg-slate-300 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="h-4 w-64 bg-slate-300 rounded" />
          </div>

          <div className="flex gap-6">
            <div className="space-y-2">
              <div className="h-3 w-12 bg-slate-200 rounded" />
              <div className="h-4 w-24 bg-slate-300 rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-3 w-14 bg-slate-200 rounded" />
              <div className="h-4 w-28 bg-slate-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
