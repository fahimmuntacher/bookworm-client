"use client";

import React from "react";
import DashboardLayout from "../Layouts/DashBoardLayout";
import { motion } from "framer-motion";
import {
  FaBook,
  FaUsers,
  FaStar,
  FaYoutube,
  FaCheck,
  FaTrash,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import Swal from "sweetalert2";
const AdminOverviewPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => (await api.get("/api/v1/admin/dashboard")).data,
  });

  const queryClient = useQueryClient();
  // ---------- Approve review ----------
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.put(`/api/v1/reviews/${id}/approve`);
    },
    onSuccess: (_, reviewId) => {
      queryClient.setQueryData(["admin-dashboard"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          stats: {
            ...oldData.stats,
            pendingReviews: oldData.stats.pendingReviews - 1,
          },
          pendingReviews: oldData.pendingReviews.filter(
            (review: any) => review._id !== reviewId
          ),
        };
      });

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
    onSuccess: (_, reviewId) => {
      queryClient.setQueryData(["admin-dashboard"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          stats: {
            ...oldData.stats,
            pendingReviews: oldData.stats.pendingReviews - 1,
          },
          pendingReviews: oldData.pendingReviews.filter(
            (review: any) => review._id !== reviewId
          ),
        };
      });

      Swal.fire("Deleted!", "Review deleted successfully", "success");
    },
    onError: (error: any) => {
      Swal.fire("Error", error.message || "Failed to delete review", "error");
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <p className="text-center py-10 text-slate-500">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  const { stats, monthlyTrends, pendingReviews } = data;

  const statCards = [
    {
      title: "Total Books",
      value: stats.totalBooks,
      icon: FaBook,
      color: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "bg-green-500",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: FaStar,
      color: "bg-yellow-500",
    },
    {
      title: "Tutorials",
      value: stats.totalTutorials,
      icon: FaYoutube,
      color: "bg-purple-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-slate-900"
        >
          Admin Overview 👋
        </motion.h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm border border-slate-200"
            >
              <div
                className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">
            Monthly Activity
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="books"
                stroke="#3b82f6"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">
            Pending Reviews
          </h2>

          {pendingReviews.length === 0 ? (
            <p className="text-slate-500">No pending reviews 🎉</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 text-sm">
                    <th className="px-4 py-3 text-left">Book</th>
                    <th className="px-4 py-3 text-left">User</th>
                    <th className="px-4 py-3 text-center w-24">Rating</th>
                    <th className="px-4 py-3 text-left w-[40%]">Comment</th>
                    <th className="px-4 py-3 text-center w-40">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingReviews.map((review: any) => (
                    <tr
                      key={review._id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {review.bookTitle}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {review.userName}
                      </td>
                      <td className="px-4 py-3 text-center">
                        ⭐ {review.rating}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <p className="line-clamp-2">{review.comment}</p>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminOverviewPage;
