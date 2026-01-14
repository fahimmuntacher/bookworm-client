"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import api from "@/lib/axios";
import { desc } from "framer-motion/client";

interface AddBookModalProps {
  onClose: () => void;
}

export default function AddBookModal({ onClose }: AddBookModalProps) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    totalPages: 0,
    genres: [] as string[],
    description : "",
    coverFile: null as File | null,
  });
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await api.get("/api/v1/genres");
      return res.data;
    },
  });

  const genres = genresData?.data || [];

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!form.coverFile) throw new Error("Please select an image file");

      // Validate file type
      if (!form.coverFile.type.startsWith("image/")) {
        throw new Error("File must be an image (jpg, png, gif, etc.)");
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (form.coverFile.size > maxSize) {
        throw new Error("Image size must be less than 5MB");
      }

      setUploading(true);

      // 1️⃣ Upload to Cloudinary via your API route
      const formData = new FormData();
      formData.append("image", form.coverFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        let errorData;
        try {
          errorData = await uploadRes.json();
        } catch {
          errorData = { error: `Server error (${uploadRes.status})` };
        }
        throw new Error(errorData.error || "Failed to upload image");
      }

      const uploadData = await uploadRes.json();
      const coverImageUrl = uploadData.url;
      if (!coverImageUrl) throw new Error("No URL returned from upload");

      // 2️⃣ Send book data to your backend
      const res = await api.post("/api/v1/books", {
        title: form.title,
        author: form.author,
        totalPages: form.totalPages,
        genres: form.genres,
        description: form.description,
        coverImage: coverImageUrl,
      });

      console.log(res);
      setUploading(false);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      Swal.fire("Created!", "Book added successfully", "success");
      onClose();
    },
    onError: (error: any) => {
      setUploading(false);
      Swal.fire("Error", error.message || "Failed to create book", "error");
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-bold">Add New Book</h3>

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
          className="w-full border px-3 py-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, coverFile: e.target.files?.[0] || null })
          }
          className="w-full border px-3 py-2 rounded"
        />

        <select
          multiple
          value={form.genres}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(
              (option) => option.value
            );
            setForm({ ...form, genres: selected });
          }}
          className="w-full border px-3 py-2 rounded h-32"
        >
          {genres.map((genre: any) => (
            <option key={genre._id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => createMutation.mutate()}
            disabled={uploading}
            className={`px-4 py-2 bg-primary-600 text-white rounded ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
