"use client";

import React, { ReactNode } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

interface PublicLayoutsProps {
  children: ReactNode;
}

export const PublicLayouts: React.FC<PublicLayoutsProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-text-primary relative overflow-hidden">
      {/* Decorative circles for cozy library vibe */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto sm:px-4 lg:px-0 py-22 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
