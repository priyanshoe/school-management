"use client";

import { InputWithButton } from "../app-input";
import { SidebarTrigger } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { user, role } = useAuth();
  const userName = user?.name || "User";
  const userRole = (role || user?.role || "Member").toUpperCase();
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "EM";

  return (
    <div className="w-full h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4">
      <div className="flex gap-4 items-center">
        <SidebarTrigger />
        <InputWithButton />
      </div>

      <div className="flex gap-3 items-center">
        <div className="hidden md:flex flex-col text-right">
          <h1 className="text-sm font-semibold text-slate-800 leading-tight">{userName}</h1>
          <h3 className="text-[11px] font-bold text-indigo-600 tracking-wider">{userRole}</h3>
        </div>
        <div>
          <Avatar className="w-9 h-9 border border-indigo-200">
            <AvatarImage src={user?.photo || "https://github.com/shadcn.png"} alt={userName} />
            <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
