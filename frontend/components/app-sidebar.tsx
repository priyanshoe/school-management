
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
  MessageSquareQuote,
  Megaphone,
  Settings,
  CircleUserRound,
  LogOut,
} from "lucide-react"
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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { role } from "@/database/data"

const items = [
  {
    title: "Home",
    url: "/admin",
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
    visible: ["admin"],
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
    title: "Exam",
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
    title: "Result",
    url: "/lists/results",
    icon: ChartCandlestick,
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Attendance",
    url: "/",
    icon: CalendarCheck,
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Event",
    url: "/lists/events",
    icon: CalendarClock,
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Messages",
    url: "/",
    icon: MessageSquareQuote,
    visible: ["admin", "teacher", "student", "parent"],
  },
  {
    title: "Announcements",
    url: "/lists/announcements",
    icon: Megaphone,
    visible: ["admin", "teacher", "student", "parent"],
  },
]

const items2 = [
  {
    title: "Profile",
    url: "/",
    icon: CircleUserRound,
  },
  {
    title: "Settings",
    url: "/",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
]


export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">

      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="/">
              < CircleUserRound />
              <span>Logo</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                items.map((item) => (
                  item.visible.includes(role) &&
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}