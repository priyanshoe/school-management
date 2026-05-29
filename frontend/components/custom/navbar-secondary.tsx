import { ArrowDownWideNarrow, Plus, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { role } from "@/database/data";
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

export default function NavbarSecondary(prop: { head: String }) {
  return (
    <div
      id="Navbar-secondary"
      className="flex items-center justify-between flex-wrap gap-2 bg-white"
    >
      <header>
        <h1 className="text-xl font-bold">All {prop.head}</h1>
      </header>

      <div
        id="form-container"
        className="flex items-center justify-center gap-2"
      >
        <Input type="name" placeholder="search" />
        <div id="button-container" className="flex justify-between gap-3">
          <div className="bg-yellow-400 rounded-full flex items-center justify-center p-2">
            <ArrowDownWideNarrow size={15} />
          </div>
          {role === "admin" && (
            <div className="bg-yellow-400 rounded-full flex items-center justify-center p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Plus size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-25 rounded-sm overflow-hidden mt-3 mr-6  z-99"
                >
                  <DropdownMenuLabel className="font-semibold text-center bg-yellow-500">
                    Create
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

                  <DropdownMenuSeparator />

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

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div className="bg-yellow-400 rounded-full flex items-center justify-center p-2">
            <SlidersHorizontal size={15} />
          </div>
        </div>
      </div>
    </div>
  );
}
