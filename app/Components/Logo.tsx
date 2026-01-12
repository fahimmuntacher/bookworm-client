"use client";

import { FaBook } from "react-icons/fa";
import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <motion.div
      className="flex items-center gap-2 font-bold text-xl cursor-pointer select-none"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Book Icon */}
      <FaBook
        size={size}
        className="text-blue-800 transition-colors duration-300 hover:text-blue-600"
      />

      {/* Gradient Text */}
      <span className="bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text">
        BookWorm
      </span>
    </motion.div>
  );
}
