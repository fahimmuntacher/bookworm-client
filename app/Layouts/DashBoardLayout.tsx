"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaBook,
  FaYoutube,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../Components/Logo";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Library } from "lucide-react";
import api from "@/lib/axios";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false); // default collapsed on mobile
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = async () => {
    try {
      await api.post("/api/auth/sign-out");
      router.replace("/auth/login"); // prevent back navigation
    } catch (error) {
      console.error("Sign out failed", error);
      router.replace("/auth/login"); // fallback
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !user) router.replace("/auth/login");
  }, [user, isPending, router]);

  // ROLE GUARD
  useEffect(() => {
    if (isPending || !user) return;

    const role = (user as any).role;

    // Admin trying to access user dashboard
    if (pathname.startsWith("/dashboard") && role !== "user") {
      router.replace("/admin");
    }

    // User trying to access admin dashboard
    if (pathname.startsWith("/admin") && role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, isPending, pathname, router]);

  if (isPending || !user) return null;

  const navItems =
    (user as any)?.role === "admin"
      ? [
          { name: "Overview", icon: FaTachometerAlt, href: "/admin" },
          { name: "Books", icon: FaBook, href: "/admin/books" },
          { name: "Genres", icon: Library, href: "/admin/genres" },
          { name: "Users", icon: FaUsers, href: "/admin/users" },
          { name: "Reviews", icon: FaStar, href: "/admin/reviews" },
          { name: "Tutorials", icon: FaYoutube, href: "/admin/tutorials" },
          { name: "Profile", icon: FaUserCircle, href: "/profile" },
        ]
      : [
          { name: "Dashboard", icon: FaTachometerAlt, href: "/dashboard" },
          { name: "My Library", icon: FaBook, href: "/dashboard/library" },
          { name: "Tutorials", icon: FaYoutube, href: "/dashboard/tutorials" },
          { name: "Profile", icon: FaUserCircle, href: "/profile" },
        ];

  const isActive = (href: string) => {
    if (pathname === href) return true;

    const matchingNav = navItems
      .filter(
        (item) => pathname === item.href || pathname.startsWith(item.href + "/")
      )
      .sort((a, b) => b.href.length - a.href.length); // longest href first

    return matchingNav[0]?.href === href;
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || isDesktop) && (
          <motion.aside
            initial={{ x: isDesktop ? 0 : -280 }}
            animate={{ x: 0 }}
            exit={{ x: isDesktop ? 0 : -280 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className={cn(
              "fixed md:relative z-50 w-64 bg-white border-r border-primary-200 flex flex-col shadow-lg h-full",
              !isDesktop && "top-0 left-0"
            )}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-primary-200">
              <Link href="/" className="flex items-center gap-2">
                <Logo />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-primary-600 text-white shadow-md hover:bg-primary-700"
                      : "text-slate-700 hover:bg-primary-50 hover:text-primary-600"
                  )}
                  onClick={() => !isDesktop && setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Card */}
            <div className="px-4 py-4 border-t border-primary-200">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors">
                <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-accent-600 hover:text-accent-700 hover:scale-110 transition-all"
                  title="Sign out"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {!isDesktop && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-primary-200 flex items-center justify-between px-4 md:px-6 shadow-sm">
          <div className="flex items-center gap-4">
            {!isDesktop && (
              <button
                className="text-slate-700 hover:text-primary-600 transition-colors"
                onClick={() => setSidebarOpen((prev) => !prev)}
                title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {sidebarOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            )}
            <h1 className="text-lg font-semibold text-slate-900">
              {(user as any)?.role === "admin"
                ? "Admin Dashboard"
                : "Dashboard"}
            </h1>
          </div>

          <span className="text-sm text-slate-600">
            {user.name || user.email?.split("@")[0]}
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-10">{children}</main>
      </div>
    </div>
  );
}
