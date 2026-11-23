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
import { DeleteExam, UpdateExam } from "./form-exam";
import { useAuth } from "@/lib/auth-context";

export default function ExamsList() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");

  type Exam = {
    exam_id: number;
    subject: string;
    class: string;
    teacher: string;
    date: string;
  };

  const [examData, setExamData] = useState<Exam[] | null>(null);
  const { role } = useAuth();
  const currentRole = (role || "").toLowerCase();
  const canManage = ["admin", "teacher"].includes(currentRole);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/exam`, { withCredentials: true })
      .then((res) => {
        const raw = Array.isArray(res.data) ? res.data : res.data.data || [];
        setExamData(raw);
      })
      .catch((err) => {
        console.error("Failed to load exams:", err);
        setExamData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!examData) return [];
    if (!searchQuery) return examData;
    const q = searchQuery.toLowerCase();
    return examData.filter(
      (e) =>
        e.subject?.toLowerCase().includes(q) ||
        e.class?.toLowerCase().includes(q) ||
        e.teacher?.toLowerCase().includes(q)
    );
  }, [examData, searchQuery]);

  if (!examData) {
    return (
      <div className="h-screen w-full text-lg capitalize text-slate-800 flex items-center justify-center">
        Loading exams list...
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <NavbarSecondary head={"Exams"} onSearch={setSearchQuery} />
        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Subject Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Exam Date</TableHead>
                <TableHead className="text-gray-800 font-semibold">Class</TableHead>
                <TableHead className="text-gray-800 font-semibold hidden sm:table-cell">Teacher</TableHead>
                {canManage && (
                  <TableHead className="text-gray-800 font-semibold text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                    No exams found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.exam_id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell className="text-left font-bold text-sm text-indigo-700 py-3">
                      {item.subject}
                    </TableCell>
                    <TableCell className="text-left text-xs font-medium text-slate-600">
                      {item.date ? String(item.date).split("T")[0] : "-"}
                    </TableCell>
                    <TableCell className="text-left text-xs font-semibold text-slate-700">
                      {item.class}
                    </TableCell>
                    <TableCell className="text-left text-xs text-slate-600 hidden sm:table-cell">
                      {item.teacher}
                    </TableCell>
                    {canManage && (
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <div className="rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 transition-colors cursor-pointer">
                            <UpdateExam data={item} />
                          </div>
                          <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                            <DeleteExam data={item} />
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
