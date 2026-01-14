"use client";

import React from "react";
import { PublicLayouts } from "../Layouts/PublicLayouts";
import { motion } from "framer-motion";
import { FaBookOpen, FaUsers, FaLightbulb } from "react-icons/fa";

const features = [
  {
    icon: FaBookOpen,
    title: "Read Smarter",
    description:
      "Track your reading, manage your personal library, and discover books that match your interests.",
  },
  {
    icon: FaUsers,
    title: "Community Driven",
    description:
      "See what others are reading, share reviews, and grow together as readers.",
  },
  {
    icon: FaLightbulb,
    title: "Learn & Grow",
    description:
      "Watch curated tutorials and improve your knowledge beyond just reading books.",
  },
];

const AboutPage = () => {
  return (
    <PublicLayouts>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-slate-900">
            About Our Platform
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A modern reading and learning platform designed to help you stay
            consistent, organized, and inspired.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We believe reading and learning should be simple, engaging, and
              measurable. Our mission is to help readers build a habit, track
              progress, and grow intellectually in a structured way.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you’re a casual reader or a lifelong learner, this
              platform adapts to your journey.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <ul className="space-y-4 text-slate-700">
              <li>✔ Personalized reading dashboard</li>
              <li>✔ Book progress & library management</li>
              <li>✔ Tutorials & learning resources</li>
              <li>✔ Admin-curated content quality</li>
            </ul>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-center text-slate-900"
          >
            What Makes Us Different
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-2xl shadow-sm border text-center space-y-4"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-slate-900 text-white rounded-2xl p-10 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-3">
            Built for Readers. Designed for Growth.
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            This platform is crafted with simplicity, focus, and long-term
            learning in mind — helping you become a better reader every day.
          </p>
        </motion.div>
      </div>
    </PublicLayouts>
  );
};

export default AboutPage;
