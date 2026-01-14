"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import Image from "next/image";
import { PublicLayouts } from "@/app/Layouts/PublicLayouts";
import { useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "@/lib/auth-client";

export default function BookDetailsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const user = session?.user;
//   console.log(user);
//   console.log(user?.id);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"want" | "reading" | "read">("want");
  const [progress, setProgress] = useState(0);

  /* ------------------ Book ------------------ */
  const { data: book, isLoading: bookLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => (await api.get(`/api/v1/books/${id}`)).data.data,
    enabled: !!id,
  });

//   console.log(book);
  /* ------------------ Reviews ------------------ */
  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () =>
      (await api.get("/api/v1/reviews", { params: { bookId: id } })).data.data,
    enabled: !!id,
  });

  /* ------------------ Library Status ------------------ */
  const { data: library } = useQuery({
    queryKey: ["library-status", id],
    queryFn: async () =>
      (await api.get("/api/v1/library")).data.data.find(
        (b: any) => b.bookId === id
      ),
  });

  /* ------------------ Add Review ------------------ */
  const addReviewMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Login required");

      return api.post("/api/v1/reviews", {
        bookId: id,
        userId: user?.id,
        userName: user?.name, 
        bookName: book.title,
        rating,
        comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      setComment("");
      Swal.fire("Success", "Review submitted for approval", "success");
    },
    onError: (err: any) =>
      Swal.fire(
        "Error",
        err.response?.data?.error || err.message || "Login required",
        "error"
      ),
  });

  /* ------------------ Library Mutation ------------------ */
  const libraryMutation = useMutation({
    mutationFn: async () =>
      api.post("/api/v1/library", {
        bookId: id,
        status,
        progress: status === "reading" ? progress : undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-status", id] });
      Swal.fire("Saved", "Library updated", "success");
    },
  });

  if (bookLoading) {
    return <div className="py-20 text-center text-gray-500">Loading...</div>;
  }

  if (!book) {
    return (
      <div className="py-20 text-center text-gray-500">Book not found</div>
    );
  }

  return (
    <PublicLayouts>
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-12">
        {/* Book Image */}
        <Image
          src={book.coverImage || "/placeholder.jpg"}
          alt={book.title}
          width={420}
          height={550}
          className="rounded-3xl shadow-md object-cover"
        />

        {/* Book Info */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-gray-600">by {book.author}</p>

          <div className="flex flex-wrap gap-2">
            {book.genres?.map((g: string) => (
              <span
                key={g}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {g}
              </span>
            ))}
          </div>

          <p className="text-gray-700">{book.description}</p>

          <p className="font-semibold text-yellow-500">
            ⭐  ({reviews?.length || 0}{" "}
            reviews)
          </p>

          {/* Library Actions */}
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
            <h3 className="font-semibold text-lg">📚 My Library</h3>

            {library ? (
              <div className="text-green-600 font-semibold">
                ✅ {library.status}
                {library.status === "reading" && ` (${library.progress}%)`}
              </div>
            ) : (
              <>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full border border-gray-200 rounded px-3 py-2"
                >
                  <option value="want">Want to Read</option>
                  <option value="reading">Currently Reading</option>
                  <option value="read">Read</option>
                </select>

                {status === "reading" && (
                  <input
                    type="number"
                    placeholder="Progress %"
                    min={0}
                    max={100}
                    className="w-full border border-gray-200 rounded px-3 py-2"
                    onChange={(e) => setProgress(+e.target.value)}
                  />
                )}

                <button
                  onClick={() => libraryMutation.mutate()}
                  className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition"
                >
                  Save to Library
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto px-4 pb-20 space-y-6">
        <h2 className="text-2xl font-bold">Reviews</h2>

        {/* Add Review */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
          <select
            value={rating}
            onChange={(e) => setRating(+e.target.value)}
            className="border border-gray-200 rounded px-3 py-2"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border border-gray-200 rounded p-2"
          />

          <button
            onClick={() => addReviewMutation.mutate()}
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
          >
            Submit Review
          </button>
        </div>

        {/* Review List */}
        {reviews?.length === 0 && (
          <p className="text-gray-500">No reviews yet</p>
        )}

        {reviews?.map((r: any) => (
          <div
            key={r._id}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <strong>{r.userName}</strong>
              <span className="text-yellow-500 font-semibold">
                {r.rating} ⭐
              </span>
            </div>
            <p className="mt-2 text-gray-700">{r.comment}</p>
          </div>
        ))}
      </div>
    </PublicLayouts>
  );
}
