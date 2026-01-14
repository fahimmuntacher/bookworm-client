"use client";

import React from "react";

export default function LibrarySkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow overflow-hidden animate-pulse"
        >
          <div className="h-56 w-full bg-slate-200" /> {/* image skeleton */}
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-slate-200 rounded" /> {/* title */}
            <div className="h-3 w-1/2 bg-slate-200 rounded" /> {/* author */}
            <div className="h-2 w-full bg-slate-200 rounded mt-2" /> {/* progress bar */}
          </div>
        </div>
      ))}
    </div>
  );
}
