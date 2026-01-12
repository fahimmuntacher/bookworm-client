"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaBookOpen } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Browse Books", href: "/browse" },
    { name: "About", href: "/about" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Contact", href: "/contact" },
  ];

  const hoverColor = "hover:text-blue-600";

  return (
    <header className="w-full px-5 z-50 shadow-md bg-blue-50">
      {/* Top Info Bar */}
      {/* <div className="hidden md:flex justify-between items-center bg-blue-50 text-blue-800 text-sm px-6 py-2 md:px-12">
        <div className="flex gap-6">
          <span>📞 +208-6666-0112</span>
          <span>✉️ info@bookworm.com</span>
          <span>🕒 Mon - Fri: 9 AM - 6 PM</span>
        </div>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="flex items-center gap-1 font-medium hover:underline"
          >
            <FaUser /> Login
          </Link>
        </div>
      </div> */}

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto py-4 md:px-12 lg:px-0 flex justify-between items-center ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-semibold relative transition-all duration-300 ${
                  isActive
                    ? "text-blue-800 after:w-full"
                    : `text-gray-700 ${hoverColor} after:w-0`
                } after:absolute after:-bottom-1 after:left-0 after:h-1 after:bg-blue-800 after:rounded-full after:transition-all`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Search & Library Button */}
          <div className="flex items-center gap-4 ml-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="border border-blue-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
              />
              <FaSearch className="absolute right-3 top-1.5 text-blue-400" />
            </div>
            <Button className="flex items-center gap-1 bg-blue-800 hover:bg-blue-600 text-white transition-all">
              <FaBookOpen /> My Library
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-inner transition-all duration-300">
          <ul className="flex flex-col gap-4 p-6">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`block font-semibold py-2 px-4 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            {/* Mobile Login / Sign Up */}
            <li className="flex flex-col gap-2 mt-4">
              <Button className="border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white w-full transition-all">
                Login
              </Button>
              <Button className="bg-blue-100 hover:bg-blue-200 text-blue-800 w-full transition-all">
                Sign Up
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
