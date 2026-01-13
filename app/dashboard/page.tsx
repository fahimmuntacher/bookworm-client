"use client";

import React from "react";
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
  Legend,
} from "recharts";

const DashboardPage = () => {
  // Example Data
  const stats = [
    { title: "Books Read", value: 12, icon: FaBook, color: "bg-blue-500" },
    { title: "Avg Rating", value: 4.7, icon: FaStar, color: "bg-yellow-500" },
    { title: "Hours Spent", value: 36, icon: FaClock, color: "bg-green-500" },
    {
      title: "Friends Reading",
      value: 8,
      icon: FaUserFriends,
      color: "bg-purple-500",
    },
  ];

  const readingTrends = [
    { day: "Mon", books: 1 },
    { day: "Tue", books: 2 },
    { day: "Wed", books: 3 },
    { day: "Thu", books: 2 },
    { day: "Fri", books: 4 },
    { day: "Sat", books: 5 },
    { day: "Sun", books: 2 },
  ];

  const recentBooks = [
    { title: "Deep Work", author: "Cal Newport", progress: 70 },
    { title: "Atomic Habits", author: "James Clear", progress: 40 },
    { title: "The Alchemist", author: "Paulo Coelho", progress: 100 },
  ];

  const topGenres = [
    { genre: "Self-help", count: 5 },
    { genre: "Fiction", count: 4 },
    { genre: "Science", count: 3 },
    { genre: "Philosophy", count: 2 },
  ];

  const friendsActivity = [
    { name: "Alice", book: "The Alchemist", progress: 100 },
    { name: "Bob", book: "Deep Work", progress: 50 },
    { name: "Charlie", book: "Atomic Habits", progress: 70 },
  ];

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
          Welcome back, Reader 👋
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
                <p className="text-lg font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reading Trends Graph */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Reading Trends
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={readingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
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

        {/* Recently Read Books */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Recently Read
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentBooks.map((book, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-4 rounded-xl shadow-md border border-slate-200"
              >
                <h3 className="text-md font-semibold text-slate-900">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-500 mb-2">{book.author}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {book.progress}% completed
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Genres */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Your Top Genres
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topGenres}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="genre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Friends Reading Activity */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Friends are Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {friendsActivity.map((friend, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-4 rounded-xl shadow-md border border-slate-200"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {friend.name}
                </p>
                <p className="text-xs text-slate-500 mb-2">
                  Reading: {friend.book}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${friend.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {friend.progress}% completed
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
