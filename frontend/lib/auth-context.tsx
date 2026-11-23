"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export type UserRole = "admin" | "teacher" | "student" | "parent";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
  phone?: string;
  address?: string;
  bio?: string;
  blood_group?: string;
  dob?: string;
  class_name?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  login: () => {},
  logout: async () => {},
  checkSession: async () => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkSession = async (): Promise<User | null> => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
      const res = await axios.get(`${apiUrl}/auth/session`, { withCredentials: true });
      if (res.data && res.data.data) {
        const u = res.data.data as User;
        setUser(u);
        try {
          localStorage.setItem("user_session", JSON.stringify(u));
        } catch {}
        return u;
      }
    } catch {
      // Check cached session
      try {
        const cached = localStorage.getItem("user_session");
        if (cached) {
          const parsed = JSON.parse(cached);
          setUser(parsed);
          return parsed;
        }
      } catch {}
      setUser(null);
    } finally {
      setLoading(false);
    }
    return null;
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem("user_session", JSON.stringify(userData));
    } catch {}
  };

  const logout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
      await axios.post(`${apiUrl}/auth/signOut`, {}, { withCredentials: true });
    } catch (err) {
      console.error("SignOut error:", err);
    } finally {
      setUser(null);
      try {
        localStorage.removeItem("user_session");
      } catch {}
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: (user?.role?.toLowerCase() as UserRole) || null,
        loading,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
