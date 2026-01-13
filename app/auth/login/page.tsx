"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayouts from "@/app/Layouts/AuthLayouts";
import Link from "next/link";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setLoginError(null);
      setSuccessMessage(null);
      setLoading(true);

      const authRes = await api.post("/api/auth/sign-in/email", {
        email: data.email,
        password: data.password,
      });

      console.log("user data after sign in:", authRes);
      
      // Show success message
      setSuccessMessage("Login successful! Redirecting...");
      
      // Reset form
      reset();
      
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed. Please try again.";
      
      // Handle network errors
      if (error.code === "ERR_NETWORK" || 
          error.message?.includes("Network Error") || 
          (!error.response && error.message?.includes("fetch"))) {
        errorMessage = "Unable to connect to the server. Please check your internet connection and ensure the API server is running. If this persists, contact support.";
      }
      // Handle 500 errors
      else if (error.response?.status === 500) {
        errorMessage = error.response?.data?.message || 
                      error.response?.data?.error ||
                      error.message ||
                      "Server error occurred. Please try again later or contact support.";
      }
      // Handle API response errors
      else if (error.response) {
        errorMessage = error.response?.data?.message ||
                      error.response?.data?.error ||
                      error.message ||
                      "Invalid email or password";
      }
      // Handle other errors
      else if (error.message) {
        errorMessage = error.message;
      }
      
      setLoginError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayouts>
      <div className="flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Sign In</h1>
          <p className="text-slate-600 text-base mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-300 text-green-700 rounded-lg px-4 py-3 mb-6 text-sm font-medium animate-slideDown">
            {successMessage}
          </div>
        )}

        {loginError && (
          <div className="bg-accent-50 border border-accent-300 text-accent-700 rounded-lg px-4 py-3 mb-6 text-sm font-medium animate-slideDown">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    message: "Password must be at least 6 characters"
                  }
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
            <div className="mt-3 text-right">
              <Link
                href="/forgot-password"
                className="text-primary-600 text-sm font-medium hover:text-primary-700 hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-8 py-3 text-base"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-slate-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/registration"
            className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </AuthLayouts>
  );
};

export default Login;
