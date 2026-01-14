"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-sm border p-8 text-center space-y-6"
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex justify-center"
        >
          <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <FaExclamationTriangle className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            The page you are looking for doesn’t exist or may have been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100 transition text-sm"
          >
            <FaArrowLeft className="text-xs" />
            Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
          >
            Go to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
