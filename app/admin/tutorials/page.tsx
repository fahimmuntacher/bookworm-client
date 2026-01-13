"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import DashboardLayout from "@/app/Layouts/DashBoardLayout";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import Loading from "../skeleton";
import { useSession } from "@/lib/auth-client";

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
  // Add/Edit tutorial
  // ------------------------
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!form.title || !form.youtubeLink)
        throw new Error("Title and YouTube link required");
      if (editTutorial) {
        return api.put(`/api/v1/tutorials/${editTutorial._id}`, form);
      }
      return api.post("/api/v1/tutorials", form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorials"] });
      Swal.fire(
        "Success!",
        `Tutorial ${editTutorial ? "updated" : "added"} successfully`,
        "success"
      );
      setModalOpen(false);
      setEditTutorial(null);
      setForm({ title: "", description: "", youtubeLink: "" });
    },
    onError: (err: any) =>
      Swal.fire("Error", err.message || "Failed to save tutorial", "error"),
  });

  // ------------------------
  // Delete tutorial
  // ------------------------
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/api/admin/tutorials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tutorials"] });
      Swal.fire("Deleted!", "Tutorial deleted successfully", "success");
    },
    onError: (err: any) =>
      Swal.fire("Error", err.message || "Failed to delete tutorial", "error"),
  });

  // ------------------------
  // Admin check
  // ------------------------
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
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Tutorials</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 flex items-center gap-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            <FaPlus /> Add Tutorial
          </button>
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
                <th className="px-4 py-3 text-right">Actions</th>
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
                    <td className="px-4 py-3 text-right flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditTutorial(tut);
                          setForm({
                            title: tut.title,
                            description: tut.description || "",
                            youtubeLink: tut.youtubeLink,
                          });
                          setModalOpen(true);
                        }}
                        className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(tut._id)}
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

        {/* Modal */}
        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 bg-opacity-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                {editTutorial ? "Edit Tutorial" : "Add Tutorial"}
              </h3>
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full mb-3 px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="YouTube Link"
                value={form.youtubeLink}
                onChange={(e) =>
                  setForm({ ...form, youtubeLink: e.target.value })
                }
                className="w-full mb-3 px-3 py-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full mb-3 px-3 py-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setEditTutorial(null);
                    setForm({ title: "", description: "", youtubeLink: "" });
                  }}
                  className="px-3 py-1 rounded border"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveMutation.mutate()}
                  className="px-3 py-1 rounded bg-primary-600 text-white hover:bg-primary-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
