"use client";

import React, { useState, useEffect } from "react";
import { PublicLayouts } from "../Layouts/PublicLayouts";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import Loading from "../admin/skeleton";
import Image from "next/image";
import BrowseBooksSkeleton from "./skeleton";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  genres: string[];
  averageRating: number;
  totalReviews: number;
  coverImage?: string;
}

export default function BrowseBooksPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  interface Genre {
    _id: string;
    name: string;
  }

  const [genres, setGenres] = useState<Genre[]>([]);
  const limit = 12;

  // Fetch genres dynamically from API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await api.get("/api/v1/genres");
        setGenres(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch books with filters
  const { data, isLoading } = useQuery({
    queryKey: ["books", page, search, selectedGenres],
    queryFn: async () => {
      const res = await api.get("/api/v1/books", {
        params: {
          page,
          limit,
          search,
          genres: selectedGenres.join(","),
        },
      });
      console.log(res);
      return res.data;
    },
  });

  const books: Book[] = Array.isArray(data?.data?.books) ? data.data.books : [];
  const totalPages = Math.ceil((data?.data?.total || 0) / limit);

  return (
    <PublicLayouts>
      <div className="space-y-6 px-4 md:px-8 py-6">
        <h1 className="text-4xl font-bold text-slate-900">Browse Books</h1>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
          />

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre._id}
                onClick={() =>
                  setSelectedGenres((prev) =>
                    prev.includes(genre.name)
                      ? prev.filter((g) => g !== genre.name)
                      : [...prev, genre.name]
                  )
                }
                className={`px-4 py-1 rounded-full border transition-all duration-200 ${
                  selectedGenres.includes(genre.name)
                    ? "bg-primary-600 text-white border-primary-600"
                    : "hover:bg-slate-100 border-slate-300"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="py-20 text-center">
            <BrowseBooksSkeleton />
          </div>
        ) : books.length === 0 ? (
          <div className="py-20 text-center text-slate-500">No books found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link
                href={`/browse-books/${book._id}`}
                key={book._id}
                className="block"
              >
                <div
                  key={book._id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
                >
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={200}
                      height={224}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-slate-200 flex items-center justify-center text-slate-500">
                      No Cover
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="font-bold text-lg text-slate-900 mb-1">
                      {book.title}
                    </h2>
                    <p className="text-sm text-slate-500 mb-2">
                      by {book.author}
                    </p>
                    <p className="text-xs text-slate-600 mb-3">{book.genres}</p>

                    {/* Rating */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                        <span>⭐ {book.averageRating?.toFixed(1) || 0}</span>
                        <span className="text-slate-400 text-xs">
                          ({book.totalReviews || 0})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-slate-100"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  page === i + 1
                    ? "bg-primary-600 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-slate-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </PublicLayouts>
  );
}
