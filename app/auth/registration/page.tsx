"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayouts from "@/app/Layouts/AuthLayouts";
import api from "@/lib/axios";
import Link from "next/link";

interface RegistrationFormInputs {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    try {
      setRegistrationError(null);
      setLoading(true);

      // 1. Upload image to server/cloud
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Image upload failed");
      const uploadData = await uploadRes.json();

      // 2. Send registration data
      const authRes = await api.post("/api/auth/sign-up/email", {
        name: data.name,
        email: data.email,
        password: data.password,
        image: uploadData.url,
      });

      console.log("User registered:", authRes.data);
      reset();
      setPreviewImage(null);
    } catch (error: any) {
      const message = error.message || "Registration failed. Please try again.";
      setRegistrationError(message);
      console.error("Registration error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AuthLayouts>
      <div className="flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Sign Up</h1>
          <p className="text-slate-600 text-base mt-2">
            Create your account and join BookWorm!
          </p>
        </div>

        {registrationError && (
          <div className="bg-accent-50 border border-accent-300 text-accent-700 rounded-lg px-4 py-3 mb-6 text-sm font-medium animate-slideDown">
            {registrationError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-slate-900 text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name", { 
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" }
              })}
              className={`input-base ${
                errors.name ? "border-accent-500 focus:ring-accent-500" : ""
              }`}
            />
            {errors.name && (
              <span className="text-accent-600 text-xs font-medium mt-2">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-slate-900 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={`input-base ${
                errors.email ? "border-accent-500 focus:ring-accent-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-accent-600 text-xs font-medium mt-2">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Profile Photo */}
          <div className="flex flex-col">
            <label htmlFor="photo" className="text-slate-900 text-sm font-semibold mb-2">
              Profile Photo
            </label>
            <div className="flex flex-col gap-3">
              <input
                id="photo"
                type="file"
                accept="image/*"
                {...register("image", { required: "Profile photo is required" })}
                onChange={(e) => {
                  register("image").onChange?.(e);
                  handleImageChange(e);
                }}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm cursor-pointer file:cursor-pointer file:bg-primary-50 file:border-0 file:px-3 file:py-2 file:mr-3 file:rounded file:text-sm file:font-semibold file:text-primary-600 hover:file:bg-primary-100 ${
                  errors.image ? "border-accent-500 focus:ring-accent-500" : "border-primary-200"
                }`}
              />
              {previewImage && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-primary-300">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            {errors.image && (
              <span className="text-accent-600 text-xs font-medium mt-2">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-slate-900 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`input-base pr-10 ${
                  errors.password ? "border-accent-500 focus:ring-accent-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-primary-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-accent-600 text-xs font-medium mt-2">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-8 py-3 text-base"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Already have account */}
        <div className="mt-6 text-center text-slate-600 text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </AuthLayouts>
  );
};

export default Registration;
