"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import DashboardLayout from "@/app/Layouts/DashBoardLayout";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import Loading from "../skeleton";

interface Genre {
  _id: string;
  name: string;
  createdAt: string;
}

interface SessionUser {
  role: string;
}

interface Session {
  user: SessionUser;
}

/* ===================== Add/Edit Modal ===================== */
function GenreModal({
  genre,
  onClose,
  isAdmin,
}: {
  genre?: Genre;
  onClose: () => void;
  isAdmin: boolean;
}) {
  const [name, setName] = useState(genre?.name || "");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!name.trim()) throw new Error("Genre name is required");

      if (genre) {
        // Edit
        const res = await api.put(`/api/v1/genres/${genre._id}`, { name });
        return res.data;
      } else {
        // Add
        const res = await api.post("/api/v1/genres", { name });
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      Swal.fire(
        genre ? "Updated!" : "Created!",
        `Genre ${genre ? "updated" : "added"} successfully`,
        "success"
      );
      onClose();
    },
    onError: (error: any) => {
      Swal.fire("Error", error.message || "Something went wrong", "error");
    },
  });

  if (!isAdmin) {
    Swal.fire("Forbidden", "Only admins can perform this action", "error");
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-bold">
          {genre ? "Edit Genre" : "Add Genre"}
        </h3>
        <input
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Genre Name"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => mutation.mutate()}
            className="px-4 py-2 bg-primary-600 text-white rounded"
          >
            {genre ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================== Main Page ===================== */
export default function AdminGenresPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession() as { data: Session | null };
  const isAdmin = session?.user?.role === "admin";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [showModal, setShowModal] = useState(false);

  /* ---------- Fetch Genres ---------- */
  const { data, isLoading } = useQuery({
    queryKey: ["genres", search, page],
    queryFn: async () => {
      const res = await api.get("/api/v1/genres", {
        params: { search, page, limit },
      });

      //   console.log(res);
      return res.data;
    },
  });

  const genres: Genre[] = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  /* ---------- Delete Genre ---------- */
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/v1/genres/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      Swal.fire("Deleted!", "Genre deleted successfully", "success");
    },
    onError: (error: any) => {
      Swal.fire("Error", error.message || "Failed to delete genre", "error");
    },
  });

  const handleDelete = (id: string) => {
    if (!isAdmin) {
      Swal.fire("Unauthorized", "Only admin can delete genres", "error");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Manage Genres</h2>

          {isAdmin && (
            <button
              onClick={() => {
                setSelectedGenre(null);
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg"
            >
              <FaPlus /> Add Genre
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search genres..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Created</th>
                {isAdmin && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-6">
                    <Loading />
                  </td>
                </tr>
              ) : genres.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-slate-500">
                    No genres found
                  </td>
                </tr>
              ) : (
                genres.map((genre) => (
                  <motion.tr
                    key={genre._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium">{genre.name}</td>
                    <td className="px-4 py-3">
                      {new Date(genre.createdAt).toLocaleDateString()}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setSelectedGenre(genre);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(genre._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    )}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <GenreModal
          genre={selectedGenre || undefined}
          isAdmin={isAdmin}
          onClose={() => setShowModal(false)}
        />
      )}
    </DashboardLayout>
  );
}
