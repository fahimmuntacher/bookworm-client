"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import DashboardLayout from "@/app/Layouts/DashBoardLayout";
import { FaEdit, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Loading from "../skeleton";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  image?: string; // Add optional image
}

interface SessionUser {
  role: string;
}

interface Session {
  user: SessionUser;
}

/* ===================== Role Modal ===================== */
function RoleModal({
  user,
  onClose,
  isAdmin,
}: {
  user: User;
  onClose: () => void;
  isAdmin: boolean;
}) {
  const [role, setRole] = useState<User["role"]>(user.role);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isAdmin) throw new Error("Only admins can change roles");
      const res = await api.put(`/api/v1/users/${user._id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire("Updated!", "User role updated successfully", "success");
      onClose();
    },
    onError: (error: any) => {
      Swal.fire("Error", error.message || "Failed to update role", "error");
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
        <h3 className="text-lg font-bold">Change Role</h3>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as User["role"])}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => mutation.mutate()}
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
export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession() as { data: Session | null };
  const isAdmin = session?.user?.role === "admin";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  /* ---------- Fetch Users ---------- */
  const { data, isLoading } = useQuery({
    queryKey: ["users", search, page],
    queryFn: async () => {
      const res = await api.get("/api/v1/users", {
        params: { search, page, limit },
      });
      return res.data;
    },
  });

  const users: User[] = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Manage Users</h2>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by email..."
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
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Created</th>
                {isAdmin && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center">
                    <Loading></Loading>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t hover:bg-slate-50"
                  >
                    {/* User with Image */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      <Image
                        src={user.image || "/default-avatar.png"}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span className="font-medium">{user.name}</span>
                    </td>

                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {isAdmin && (
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
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

      {/* Role Modal */}
      {showModal && selectedUser && (
        <RoleModal
          user={selectedUser}
          isAdmin={isAdmin}
          onClose={() => setShowModal(false)}
        />
      )}
    </DashboardLayout>
  );
}
