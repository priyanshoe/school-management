"use client";

import { PaginationList } from "@/components/app-pagination";
import NavbarSecondary from "@/components/custom/navbar-secondary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { DeleteLesson, UpdateLesson } from "./form-lesson";
import { useAuth } from "@/lib/auth-context";

export default function LessonsList() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");

  type Lesson = {
    lessons_id: number;
    subject: string;
    class: string;
    teacher: string;
    teacher_email?: string;
  };

  const [lessonsData, setLessonsData] = useState<Lesson[] | null>(null);
  const { role } = useAuth();
  const currentRole = (role || "").toLowerCase();
  const canManage = ["admin", "teacher"].includes(currentRole);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/lesson`, { withCredentials: true })
      .then((res) => {
        const raw = Array.isArray(res.data) ? res.data : res.data.data || [];
        setLessonsData(raw);
      })
      .catch((err) => {
        console.error("Failed to load lessons:", err);
        setLessonsData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!lessonsData) return [];
    if (!searchQuery) return lessonsData;
    const q = searchQuery.toLowerCase();
    return lessonsData.filter(
      (l) =>
        l.subject?.toLowerCase().includes(q) ||
        l.class?.toLowerCase().includes(q) ||
        l.teacher?.toLowerCase().includes(q)
    );
  }, [lessonsData, searchQuery]);

  if (!lessonsData) {
    return (
      <div className="h-screen w-full text-lg capitalize text-slate-800 flex items-center justify-center">
        Loading lessons list...
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <NavbarSecondary head={"Lessons"} onSearch={setSearchQuery} />
        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Subject Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Class Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Teacher Name</TableHead>
                {canManage && (
                  <TableHead className="text-gray-800 font-semibold text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                    No lessons found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.lessons_id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell className="text-left font-bold text-sm text-indigo-700 py-3">
                      {item.subject}
                    </TableCell>
                    <TableCell className="text-left text-sm font-semibold text-slate-700">
                      {item.class}
                    </TableCell>
                    <TableCell className="text-left text-xs font-medium text-slate-600">
                      {item.teacher}
                    </TableCell>
                    {canManage && (
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <div className="rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 transition-colors cursor-pointer">
                            <UpdateLesson data={item} />
                          </div>
                          <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                            <DeleteLesson data={item} />
                          </div>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="mt-4">
            <PaginationList
              data={filteredData}
              start={startIndex}
              setStart={setStartIndex}
              end={endIndex}
              setEnd={setEndIndex}
              rows={rowsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
