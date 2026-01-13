"use client";

import React, { ReactNode } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

interface PublicLayoutsProps {
  children: ReactNode;
}

export const PublicLayouts: React.FC<PublicLayoutsProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 relative overflow-hidden bg-white">
      {/* Decorative circles for cozy library vibe */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-300 rounded-full blur-3xl opacity-10 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
