"use client";

import DashboardLayout from "@/app/Layouts/DashBoardLayout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import Image from "next/image";
import clsx from "clsx";
import React from "react";
import Link from "next/link";
import LibrarySkeleton from "./LibrarySkeleton";

const tabs = [
  { key: "want", label: "📌 Want to Read" },
  { key: "reading", label: "📖 Currently Reading" },
  { key: "read", label: "✅ Read" },
];

export default function MyLibraryPage() {
  const [active, setActive] = React.useState("want");

  const { data, isLoading } = useQuery({
    queryKey: ["my-library"],
    queryFn: async () => (await api.get("/api/v1/library")).data.data,
  });

//   if (isLoading) return <LibrarySkeleton />;

  const books = data?.[active] || [];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">📚 My Library</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium",
              active === t.key
                ? "bg-primary-600 text-white"
                : "bg-slate-100 text-slate-600"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Books */}
      {isLoading ? <LibrarySkeleton /> : null}
      {books.length === 0 && (
        <p className="text-slate-500">No books here yet.</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((item: any) => (
          <div
            key={item.libraryId}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Cover */}
            <Image
              src={item.book.coverImage || "/placeholder.jpg"}
              alt={item.book.title}
              width={300}
              height={420}
              className="h-56 w-full object-cover"
            />

            {/* Content */}
            <Link href={`/browse-books/${item.book._id}`}>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold line-clamp-1">
                  {item.book.title}
                </h3>
                <p className="text-sm text-slate-500">{item.book.author}</p>

                {/* Progress */}
                {item.status === "reading" && (
                  <div>
                    <div className="text-xs text-slate-500 mb-1">
                      Progress {item.progress || 0}%
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded">
                      <div
                        className="h-2 bg-primary-600 rounded"
                        style={{ width: `${item.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
