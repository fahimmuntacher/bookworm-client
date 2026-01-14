"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use, useState } from "react";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Logo from "./Logo";
import { useSession } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { data: session } = useSession();
  console.log(session);
  const user = session?.user;
  console.log(user);
  // Links
  const guestLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Books", href: "/browse" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const userLinks = [
    { name: "Home", href: "/" },
    { name: "My Library", href: "/dashboard/library" },
    { name: "Browse Books", href: "/browse-books" },
    { name: "Tutorials", href: "/dashboard/tutorials" },
  ];

  const adminLinks = [
    { name: "Admin Dashboard", href: "/admin" },
    { name: "Manage Books", href: "/admin/books" },
    { name: "Manage Users", href: "/admin/users" },
    { name: "Moderate Reviews", href: "/admin/reviews" },
    { name: "Manage Tutorials", href: "/admin/tutorials" },
  ];

  const navLinks = user
    ? (user as any)?.role === "admin"
      ? adminLinks
      : userLinks
    : guestLinks;

  const handleSignOut = () => {
    router.push("/auth/login");
  };

  return (
    <header className="w-full bg-white border-b border-primary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-primary-700 border-b-2 border-primary-600 pb-0.5"
                    : "text-slate-700 hover:text-primary-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth / User Avatar */}
            {!user ? (
              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/auth/login")}
                  className="btn-outline"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth/registration")}
                  className="btn-primary"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-10 h-10 rounded-full border-2 border-primary-600 overflow-hidden flex items-center justify-center hover:border-primary-700 transition-colors"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <FaUserCircle className="text-primary-600 w-8 h-8" />
                  )}
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-primary-200 rounded-lg shadow-lg overflow-hidden z-50 animate-slideDown">
                    <Link
                      href={
                        (user as any)?.role === "admin"
                          ? "/admin"
                          : "/dashboard"
                      }
                      className="block px-4 py-3 text-slate-700 hover:bg-primary-50 transition-colors font-medium border-b border-primary-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {(user as any)?.role !== "admin" && (
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-3 text-slate-700 hover:bg-primary-50 transition-colors font-medium border-b border-primary-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-accent-600 hover:bg-accent-50 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 hover:text-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-primary-100 animate-slideDown">
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium px-3 py-2 rounded-lg transition-all ${
                  pathname === link.href
                    ? "bg-primary-100 text-primary-700"
                    : "text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="w-full text-left btn-outline mt-2"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth/registration")}
                  className="w-full btn-primary mt-2"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <Link
                  href={
                    (user as any)?.role === "admin" ? "/admin" : "/dashboard"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all"
                >
                  Dashboard
                </Link>
                {(user as any)?.role !== "admin" && (
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all"
                  >
                    Profile
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left btn-danger mt-2"
                >
                  Sign Out
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
