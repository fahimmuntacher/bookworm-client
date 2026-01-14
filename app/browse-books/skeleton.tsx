"use client";

export default function BrowseBooksSkeleton() {
  return (
    <div className="space-y-6 px-4 md:px-8 py-6 animate-pulse">
      {/* Page Title */}
      <div className="h-10 w-56 bg-slate-200 rounded-lg" />

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Input */}
        <div className="h-11 w-full md:w-1/3 bg-slate-200 rounded-xl" />

        {/* Genre Pills */}
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-slate-200 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="h-56 w-full bg-slate-200" />

            {/* Content */}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="h-5 w-3/4 bg-slate-200 rounded" />
              <div className="h-4 w-1/2 bg-slate-200 rounded" />
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="mt-auto h-4 w-24 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
