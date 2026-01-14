"use client";

import DashboardLayout from "../Layouts/DashBoardLayout";

import { motion } from "framer-motion";
import { FaBook, FaStar, FaClock, FaUserFriends } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import DashboardSkeleton from "./DashboardSkeleton";

const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-dashboard"],
    queryFn: async () => (await api.get("/api/v1/dashboard")).data.data,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  const { stats, readingTrends, recentBooks, topGenres } = data;

  const cards = [
    {
      title: "Books Read",
      value: stats.booksRead,
      icon: FaBook,
      color: "bg-blue-500",
    },
    {
      title: "Avg Rating",
      value: stats.avgRating,
      icon: FaStar,
      color: "bg-yellow-500",
    },
    {
      title: "Hours Spent",
      value: stats.hoursSpent,
      icon: FaClock,
      color: "bg-green-500",
    },
    {
      title: "Friends Reading",
      value: stats.friendsReading,
      icon: FaUserFriends,
      color: "bg-purple-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-slate-900"
        >
          Welcome back 👋
        </motion.h1>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition"
            >
              <div
                className={`${c.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}
              >
                <c.icon />
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-900">
                  {c.value}
                </p>
                <p className="text-sm text-slate-500">{c.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reading Trends */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="font-medium text-slate-800 mb-4">Reading Trends</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={readingTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="books"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recently Reading */}
        <div>
          <h2 className="font-medium text-slate-800 mb-4">Recently Reading</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentBooks.map((b: any, i: number) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-2"
              >
                <h3 className="font-medium text-slate-900">{b.title}</h3>
                <p className="text-sm text-slate-500">{b.author}</p>

                {b.status === "reading" && (
                  <>
                    <div className="mt-3 h-2 bg-slate-200 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${b.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {b.progress}% completed
                    </p>
                  </>
                )}

                {b.status === "read" && (
                  <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    ✔ Completed
                  </span>
                )}

                {b.status === "want" && (
                  <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    📘 Want to read
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Genres */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="font-medium text-slate-800 mb-4">Top Genres</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topGenres}>
              <XAxis dataKey="genre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
