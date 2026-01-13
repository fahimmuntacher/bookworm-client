"use client";

import React from "react";
import DashboardLayout from "../Layouts/DashBoardLayout";
import { motion } from "framer-motion";
import { FaBook, FaUsers, FaStar, FaYoutube } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Example Data
const stats = [
  { title: "Total Books", value: 120, icon: FaBook, color: "bg-blue-500" },
  { title: "Total Users", value: 56, icon: FaUsers, color: "bg-green-500" },
  { title: "Pending Reviews", value: 8, icon: FaStar, color: "bg-yellow-500" },
  { title: "Tutorials", value: 24, icon: FaYoutube, color: "bg-purple-500" },
];

const monthlyTrends = [
  { month: "Jan", books: 12, users: 5 },
  { month: "Feb", books: 18, users: 8 },
  { month: "Mar", books: 10, users: 6 },
  { month: "Apr", books: 20, users: 10 },
  { month: "May", books: 15, users: 7 },
  { month: "Jun", books: 25, users: 12 },
  { month: "Jul", books: 22, users: 9 },
];

const AdminOverviewPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-slate-900"
        >
          Admin Overview 👋
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-slate-200"
            >
              <div
                className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Monthly Trends Graph */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Monthly Activity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="books"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Books Added"
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                strokeWidth={3}
                name="New Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pending Reviews Table */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Pending Reviews</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200 rounded-lg">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left">Book</th>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Rating</th>
                  <th className="px-4 py-2 text-left">Comment</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { book: "Atomic Habits", user: "John Doe", rating: 5, comment: "Great read!" },
                  { book: "Deep Work", user: "Jane Smith", rating: 4, comment: "Very insightful" },
                ].map((review, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-2">{review.book}</td>
                    <td className="px-4 py-2">{review.user}</td>
                    <td className="px-4 py-2">{review.rating}</td>
                    <td className="px-4 py-2">{review.comment}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button className="text-green-600 hover:underline">Approve</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminOverviewPage;
