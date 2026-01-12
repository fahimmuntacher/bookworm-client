"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import AuthLayouts from "@/app/Layouts/AuthLayouts";

interface RegistrationFormInputs {
  name: string;
  email: string;
  password: string;
  photo: FileList;
}

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
    console.log("Registration Data:", data);
    // Handle registration API here
  };

  return (
    <AuthLayouts>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-800">Sign Up</h1>
        <p className="text-blue-600 text-sm mt-1">
          Create your account and join BookWorm!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-blue-700 text-sm mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("name", { required: "Name is required" })}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${
              errors.name ? "border-red-500" : "border-blue-200"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-blue-700 text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${
              errors.email ? "border-red-500" : "border-blue-200"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col">
          <label htmlFor="photo" className="text-blue-700 text-sm mb-1">
            Profile Photo
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            {...register("photo", { required: "Profile photo is required" })}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${
              errors.photo ? "border-red-500" : "border-blue-200"
            }`}
          />
          {errors.photo && (
            <span className="text-red-500 text-xs mt-1">
              {errors.photo.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label htmlFor="password" className="text-blue-700 text-sm mb-1">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${
              errors.password ? "border-red-500" : "border-blue-200"
            }`}
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-blue-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-600  text-white transition-all"
        >
          Sign Up
        </Button>
      </form>

      {/* Optional Links */}
      <div className="mt-4 text-center text-blue-600 text-sm">
        Already have an account?{" "}
        <a href="/auth/login" className="hover:text-blue-800 transition-colors hover:underline">
          Sign In
        </a>
      </div>
    </AuthLayouts>
  );
};

export default Registration;
