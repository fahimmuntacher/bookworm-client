"use client";

import { useState } from "react";
import DashboardLayout from "@/app/Layouts/DashBoardLayout";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import Image from "next/image";
import Loading from "./skeleton";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";

interface Book {
  _id: string;
  title: string;
  author: string;
  totalPages: number;
  coverImage: string;
  createdAt: string;
}

/* ===================== Edit Modal ===================== */
function EditBookModal({
  book,
  onClose,
  isAdmin,
}: {
  book: Book;
  onClose: () => void;
  isAdmin: boolean;
}) {
  const [form, setForm] = useState(book);
  const queryClient = useQueryClient();

  // Always call hooks first
  const updateMutation = useMutation({
    mutationFn: () =>
      api.put(`/api/v1/books/${book._id}`, {
        title: form.title,
        author: form.author,
        totalPages: form.totalPages,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      Swal.fire("Updated!", "Book updated successfully", "success");
      onClose();
    },
    onError: (error: any) => {
      console.log(error.message);
      if (error?.response?.status === 403) {
        Swal.fire("Forbidden", "Admin permission required", "error");
      } else {
        Swal.fire("Error", "Failed to update book", "error");
      }
    },
  });

  // Conditional logic AFTER hooks
  if (!isAdmin) {
    Swal.fire("Forbidden", "Only admin can edit books", "error");
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-bold">Edit Book</h3>

        <input
          className="w-full border px-3 py-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
        />

        <input
          className="w-full border px-3 py-2 rounded"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
        />
    
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={form.totalPages}
          onChange={(e) =>
            setForm({ ...form, totalPages: Number(e.target.value) })
          }
          placeholder="Total Pages"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => updateMutation.mutate()}
            className="px-4 py-2 bg-primary-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================== Main Page ===================== */
export default function AdminBooksPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;
  const [editBook, setEditBook] = useState<Book | null>(null);

  /* ---------- Fetch Books ---------- */
  const { data, isLoading } = useQuery({
    queryKey: ["books", search, page],
    queryFn: async () => {
      const res = await api.get("/api/v1/books", {
        params: { search, page, limit },
      });
      return res.data.data;
    },
    keepPreviousData: true,
  });

  const books: Book[] = data?.books || [];
  const total: number = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  /* ---------- Delete Book ---------- */
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/books/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      Swal.fire("Deleted!", "Book has been deleted", "success");
    },
    onError: (error: any) => {
      if (error?.response?.status === 403) {
        Swal.fire("Forbidden", "Admin permission required", "error");
      } else {
        Swal.fire("Error", "Failed to delete book", "error");
      }
    },
  });

  const handleDelete = (id: string) => {
    if (!isAdmin) {
      Swal.fire("Unauthorized", "Only admin can delete books", "error");
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
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Manage Books</h2>

          {isAdmin && (
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg">
              <FaPlus /> Add Book
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
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
                <th className="px-4 py-3 text-left">Cover</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Pages</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <Loading />
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500">
                    No books found
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <motion.tr
                    key={book._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-4 py-3">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        width={40}
                        height={56}
                        className="w-10 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{book.title}</td>
                    <td className="px-4 py-3">{book.author}</td>
                    <td className="px-4 py-3">{book.totalPages}</td>
                    <td className="px-4 py-3">
                      {new Date(book.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {isAdmin && (
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setEditBook(book)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
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

      {editBook && isAdmin && (
        <EditBookModal
          book={editBook}
          isAdmin={isAdmin}
          onClose={() => setEditBook(null)}
        />
      )}
    </DashboardLayout>
  );
}
