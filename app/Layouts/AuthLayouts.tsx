"use client";

import React, { ReactNode } from "react";
import Logo from "../Components/Logo";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayouts: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary-50 to-secondary-100 px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary-300 rounded-full blur-3xl opacity-30 -z-10"></div>

      {/* Logo */}
      <div className="mb-10 animate-slideDown">
        <Link href={"/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={48} />
          
        </Link>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slideUp">
        {children}
      </div>

      {/* Footer */}
      <div className="mt-8 text-slate-600 text-sm text-center">
        &copy; {new Date().getFullYear()} BookWorm. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayouts;
