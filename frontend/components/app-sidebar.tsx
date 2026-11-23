'use client';

import {
  Home,
  GraduationCap,
  Users,
  UsersRound,
  NotebookPen,
  BookMarked,
  NotepadText,
  BookOpenCheck,
  Notebook,
  ChartCandlestick,
  CalendarCheck,
  CalendarClock,
  Megaphone,
  Settings,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const { role, user, logout } = useAuth();
  const pathname = usePathname();
  const currentRole = (role || user?.role || "admin").toLowerCase();

  const homeUrl = `/${currentRole}`;

  const items = [
    {
      title: "Home",
      url: homeUrl,
      icon: Home,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      title: "Teachers",
      url: "/lists/teachers",
      icon: GraduationCap,
      visible: ["admin", "teacher"],
    },
    {
      title: "Students",
      url: "/lists/students",
      icon: Users,
      visible: ["admin", "teacher"],
    },
    {
      title: "Parents",
      url: "/lists/parents",
      icon: UsersRound,
      visible: ["admin", "teacher"],
    },
    {
      title: "Subjects",
      url: "/lists/subjects",
      icon: NotebookPen,
      visible: ["admin", "teacher"],
    },
    {
      title: "Classes",
      url: "/lists/classes",
      icon: BookMarked,
      visible: ["admin", "teacher"],
    },
    {
      title: "Lessons",
      url: "/lists/lessons",
      icon: NotepadText,
      visible: ["admin", "teacher"],
    },
    {
      title: "Exams",
      url: "/lists/exams",
      icon: BookOpenCheck,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      title: "Assignments",
      url: "/lists/assignments",
      icon: Notebook,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      title: "Results",
      url: "/lists/results",
      icon: ChartCandlestick,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      title: "Events",
      url: "/lists/events",
      icon: CalendarClock,
      visible: ["admin", "teacher", "student", "parent"],
    },
    {
      title: "Announcements",
      url: "/lists/announcements",
      icon: Megaphone,
      visible: ["admin", "teacher", "student", "parent"],
    },
  ];

  const items2 = [
    {
      title: "Profile",
      url: user?.id && currentRole === "teacher" 
        ? `/lists/teachers/${user.id}` 
        : user?.id && currentRole === "student"
        ? `/lists/students/${user.id}`
        : homeUrl,
      icon: CircleUserRound,
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={homeUrl} className="flex items-center gap-2 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm">
                🎓
              </div>
              <span className="font-bold tracking-tight">EduManage</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase font-semibold text-slate-400">
            Menu ({currentRole.toUpperCase()})
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (!item.visible.includes(currentRole)) return null;
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase font-semibold text-slate-400">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
