"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { role, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/");
    } else {
      const target = (role || user.role || "admin").toLowerCase();
      router.push(`/${target}`);
    }
  }, [role, user, loading, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-slate-500">
      Redirecting to your dashboard...
    </div>
  );
}
