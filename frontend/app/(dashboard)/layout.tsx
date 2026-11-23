"use client";

import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/custom/navbar";
import { useAuth } from "@/lib/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/");
      return;
    }

    const currentRole = (role || user.role || "").toLowerCase();

    // Role-based route protection
    if (pathname === "/admin" && currentRole !== "admin") {
      router.push(`/${currentRole}`);
    } else if (pathname === "/teacher" && currentRole !== "teacher" && currentRole !== "admin") {
      router.push(`/${currentRole}`);
    } else if (pathname === "/student" && currentRole !== "student" && currentRole !== "admin" && currentRole !== "teacher") {
      router.push(`/${currentRole}`);
    } else if (pathname === "/parent" && currentRole !== "parent" && currentRole !== "admin") {
      router.push(`/${currentRole}`);
    } else if (
      (pathname.startsWith("/lists/teachers") ||
       pathname.startsWith("/lists/students") ||
       pathname.startsWith("/lists/parents") ||
       pathname.startsWith("/lists/classes") ||
       pathname.startsWith("/lists/subjects") ||
       pathname.startsWith("/lists/lessons")) &&
      !["admin", "teacher"].includes(currentRole)
    ) {
      router.push(`/${currentRole}`);
    }
  }, [user, role, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400 mb-4"></div>
        <p className="text-lg font-medium">Verifying authorization...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-full w-full min-h-screen bg-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 w-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
