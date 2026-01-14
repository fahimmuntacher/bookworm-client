"use client";

import React from "react";
import DashboardLayout from "../Layouts/DashBoardLayout";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaUser,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-semibold text-slate-900">
            Contact Support
          </h1>
          <p className="text-slate-500">
            Have a question or feedback? We’d love to hear from you.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border shadow-sm p-6 space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Get in Touch
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                If you face any issues, have feature requests, or want to share
                feedback, our support team is here to help.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-slate-700">
                <FaEnvelope className="text-blue-500" />
                <span>support@yourplatform.com</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <FaCommentDots className="text-green-500" />
                <span>Response within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border shadow-sm p-6 space-y-5"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              Send a Message
            </h2>

            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm text-slate-600">Your Name</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <FaUser className="text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm text-slate-600">Email Address</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <FaEnvelope className="text-slate-400" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-sm text-slate-600">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-medium transition"
            >
              <FaPaperPlane className="text-xs" />
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactPage;
