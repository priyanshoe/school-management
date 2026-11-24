"use client";

import { ArrowDownWideNarrow, Plus, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { useAuth } from "@/lib/auth-context";
import { CreateTeacher } from "@/app/(dashboard)/lists/teachers/form-teacher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CreateStudent } from "@/app/(dashboard)/lists/students/form-student";
import { CreateParent } from "@/app/(dashboard)/lists/parents/form-parent";
import { CreateSubject } from "@/app/(dashboard)/lists/subjects/form-subject";
import { CreateClass } from "@/app/(dashboard)/lists/classes/form-classes";
import { CreateExam } from "@/app/(dashboard)/lists/exams/form-exam";
import { CreateLesson } from "@/app/(dashboard)/lists/lessons/form-lesson";
import { CreateAssignment } from "@/app/(dashboard)/lists/assignments/form-assignment";

export default function NavbarSecondary(prop: { head: string; onSearch?: (q: string) => void }) {
  const { role } = useAuth();
  const isAdmin = (role || "").toLowerCase() === "admin";

  return (
    <div
      id="Navbar-secondary"
      className="flex items-center justify-between flex-wrap gap-2 bg-white pb-3 mb-2 border-b border-slate-100"
    >
      <header>
        <h1 className="text-xl font-bold text-slate-800">All {prop.head}</h1>
      </header>

      <div
        id="form-container"
        className="flex items-center justify-center gap-2"
      >
        <Input
          type="text"
          placeholder="Search..."
          className="h-9 w-48 sm:w-64"
          onChange={(e) => prop.onSearch && prop.onSearch(e.target.value)}
        />
        <div id="button-container" className="flex justify-between gap-2">
          <div className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center p-2 cursor-pointer transition-colors">
            <ArrowDownWideNarrow size={15} />
          </div>

          {isAdmin && (
            <div className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full flex items-center justify-center p-2 cursor-pointer transition-colors shadow-sm">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Plus size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-36 bg-white border border-slate-200 shadow-xl rounded-md overflow-hidden mt-2 z-50 p-1"
                >
                  <DropdownMenuLabel className="font-semibold text-center text-xs py-1.5 bg-yellow-400 rounded-sm mb-1 text-slate-900">
                    Create New
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <CreateTeacher />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <CreateStudent />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <CreateParent />
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 border-t border-slate-200" />

                  <DropdownMenuItem asChild>
                    <CreateSubject />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <CreateClass />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <CreateExam />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <CreateLesson />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <CreateAssignment />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center p-2 cursor-pointer transition-colors">
            <SlidersHorizontal size={15} />
          </div>
        </div>
      </div>
    </div>
  );
}
