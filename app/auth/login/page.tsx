"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import AuthLayouts from "@/app/Layouts/AuthLayouts";
import Link from "next/link";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login Data:", data);
    // Call your API here
  };

  return (
    <AuthLayouts>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-800">Sign In</h1>
        <p className="text-blue-600 text-sm mt-1">
          Welcome back! Please login to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {/* Password */}
        <div className="flex flex-col relative">
          <label htmlFor="password" className="text-blue-700 text-sm mb-1">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
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

          {/* Forgot Password Link */}
          <div className="mt-2 text-right text-blue-600 text-sm">
            <Link
              href="/forgot-password"
              className="hover:text-blue-900 transition-colors hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-600 text-white transition-all"
        >
          Sign In
        </Button>
      </form>

      {/* Sign Up Reference */}
      <div className="mt-4 text-center text-blue-600 text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/registration"
          className="hover:text-blue-800 hover:underline font-medium transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </AuthLayouts>
  );
};

export default Login;
