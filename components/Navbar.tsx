"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUser, FiHome, FiHeart, FiGrid, FiLogOut, FiPlay } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

const navigationCategories = [
  { name: "Home", icon: FiHome, path: "/" },
  { name: "Reels", icon: FiPlay, path: "/reels" },
  { name: "Categories", icon: FiGrid, path: "/categories" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    const confirm = window.confirm("are you sure you want to logout ?");
    if (!confirm) return;
    logout();
  };

  const getActiveCategory = () => {
    const currentCategory = navigationCategories.find((cat) => {
      if (cat.path === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(cat.path);
    });
    return currentCategory ? currentCategory.name : null;
  };

  const activeCategory = getActiveCategory();

  return (
    <nav className="top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
     
            <p className="hidden sm:block text-primary font-bold text-lg md:text-xl group-hover:scale-105 transition-transform duration-300 tracking-tight">MonoFeed</p>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navigationCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;
              return (
                <Link
                  key={category.name}
                  href={category.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-semibold ${
                    isActive 
                      ? "bg-white/10 text-white border border-white/20" 
                      : "text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-2 text-foreground hover:text-white/80 transition-all duration-300 text-sm font-semibold hover:scale-105"
                >
                  <FiUser className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-foreground hover:text-white/60 transition-all duration-300 text-sm font-medium hover:scale-105"
                >
                  <FiLogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-foreground hover:text-white/80 transition-all duration-300 text-sm font-medium hover:scale-105">
                  Log in
                </Link>
                <Link href="/signup" className="text-foreground hover:text-white/80 transition-all duration-300 text-sm font-medium hover:scale-105">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-hide">
          {navigationCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;
            return (
              <Link
                key={category.name}
                href={category.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 font-semibold ${
                  isActive 
                    ? "bg-white/10 text-white border border-white/20" 
                    : "text-muted hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
