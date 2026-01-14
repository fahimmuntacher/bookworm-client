"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import DashboardLayout from "@/app/Layouts/DashBoardLayout";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import api from "@/lib/axios";
import Loading from "@/app/admin/skeleton";

interface Tutorial {
  _id: string;
  title: string;
  description?: string;
  youtubeLink: string;
  createdAt: string;
}

interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  role: string;
}

interface Session {
  user: SessionUser;
}

export default function AdminTutorialsPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession() as { data: Session | null };
  const isAdmin = session?.user?.role === "admin";

  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTutorial, setEditTutorial] = useState<Tutorial | null>(null);
  const limit = 10;

  const [form, setForm] = useState({
    title: "",
    description: "",
    youtubeLink: "",
  });

  // ------------------------
  // Fetch tutorials
  // ------------------------
  const { data, isLoading } = useQuery({
    queryKey: ["tutorials", page],
    queryFn: async () => {
      const res = await api.get("/api/v1/tutorials", {
        params: { page, limit },
      });
      return res.data;
    },
  });

  const tutorials: Tutorial[] = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  // ------------------------

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Tutorials</h2>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">YouTube Link</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center">
                    <Loading />
                  </td>
                </tr>
              ) : tutorials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-slate-500">
                    No tutorials found
                  </td>
                </tr>
              ) : (
                tutorials.map((tut) => (
                  <motion.tr
                    key={tut._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium">{tut.title}</td>
                    <td className="px-4 py-3">
                      <a
                        href={tut.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Link
                      </a>
                    </td>
                    <td className="px-4 py-3 font-medium">{tut.description}</td>
                    <td className="px-4 py-3">
                      {new Date(tut.createdAt).toLocaleDateString()}
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
