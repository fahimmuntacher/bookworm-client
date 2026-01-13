"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import DashboardLayout from "@/app/Layouts/DashBoardLayout";
import { FaCheck, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import Loading from "../skeleton";

interface Review {
  _id: string;
  bookId: string;
  userId: string;
  userName: string;
  bookName: string;
  rating: number;
  comment: string;
  status: "pending" | "approved";
  createdAt: string;
}

interface SessionUser {
  role: string;
}

interface Session {
  user: SessionUser;
}

export default function AdminReviewsPage() {
  const { data: session } = useSession() as { data: Session | null };
  const isAdmin = session?.user?.role === "admin";

  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  // ---------- Fetch pending reviews ----------
  const { data, isLoading } = useQuery({
    queryKey: ["reviews", page],
    queryFn: async () => {
      if (!isAdmin) return { data: [], total: 0 };
      const res = await api.get("/api/v1/reviews/pending", {
        params: { status: "pending", page, limit },
      });
      console.log(res);
      return res.data;
    },
    enabled: isAdmin,
  });

  const reviews: Review[] = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  // ---------- Approve review ----------
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.put(`/api/v1/reviews/${id}/approve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      Swal.fire("Approved!", "Review approved successfully", "success");
    },
    onError: (error: any) => {
      Swal.fire("Error", error.message || "Failed to approve review", "error");
    },
  });

  // ---------- Delete review ----------
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/api/v1/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      Swal.fire("Deleted!", "Review deleted successfully", "success");
    },
    onError: (error: any) => {
      Swal.fire("Error", error.message || "Failed to delete review", "error");
    },
  });

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-red-600 font-bold">
          Access Denied. Only admins can view this page.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Pending Reviews</h2>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Book ID</th>
                <th className="px-4 py-3 text-left">Book Name</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">Comment</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center">
                   <Loading></Loading>
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">
                    No pending reviews
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <motion.tr
                    key={review._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium">{review.userName}</td>
                    <td className="px-4 py-3">{review.bookId}</td>
                    <td className="px-4 py-3">{review.bookName}</td>
                    <td className="px-4 py-3">{review.rating}</td>
                    <td className="px-4 py-3">{review.comment}</td>
                    <td className="px-4 py-3">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right flex justify-end gap-2">
                      <button
                        onClick={() => approveMutation.mutate(review._id)}
                        className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(review._id)}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded border disabled:opacity-40"
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
              className="px-3 py-1 rounded border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
