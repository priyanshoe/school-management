
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

const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Teachers",
    url: "/teacher",
    icon: GraduationCap ,
  },
  {
    title: "Students",
    url: "/student",
    icon: Users ,
  },
  {
    title: "Parents",
    url: "/parents",
    icon: UsersRound ,
  },
  {
    title: "Subjects",
    url: "/",
    icon: NotebookPen,
  },
  {
    title: "Classes",
    url: "/",
    icon: BookMarked,
  },
  {
    title: "Lessons",
    url: "/",
    icon: NotepadText,
  },
  {
    title: "Exam",
    url: "/",
    icon: BookOpenCheck,
  },
  {
    title: "Assignments",
    url: "/",
    icon: Notebook,
  },
  {
    title: "Result",
    url: "/",
    icon: ChartCandlestick,
  },
  {
    title: "Attendance",
    url: "/",
    icon: CalendarCheck,
  },
  {
    title: "Event",
    url: "/",
    icon: CalendarClock,
  },
  {
    title: "Messages",
    url: "/",
    icon: MessageSquareQuote,
  },
  {
    title: "Announcements",
    url: "/",
    icon: Megaphone,
  },
]

const items2 =[
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
                      < CircleUserRound/>
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
              {items.map((item) => (
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