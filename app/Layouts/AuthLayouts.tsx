"use client";

import React, { ReactNode } from "react";
import Logo from "../Components/Logo";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayouts: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50 px-4">
      {/* Logo */}
      <div className="mb-10">
        <Link href={"/"}>
          <Logo size={48} />
        </Link>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {children}
      </div>

      {/* Footer */}
      <div className="mt-6 text-blue-700 text-sm text-center">
        &copy; {new Date().getFullYear()} BookWorm. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayouts;
