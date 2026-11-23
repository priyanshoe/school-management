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
import { DeleteAssignment, UpdateAssignment } from "./form-assignment";
import { useAuth } from "@/lib/auth-context";

export default function AssignmentsList() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");

  type Assignment = {
    assignment_id: number;
    subject: string;
    class_name: string;
    dueDate: string;
    teacher: string;
    teacher_email?: string;
  };

  const [assignmentData, setAssignmentData] = useState<Assignment[] | null>(null);
  const { role } = useAuth();
  const currentRole = (role || "").toLowerCase();
  const canManage = ["admin", "teacher"].includes(currentRole);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/assignment`, { withCredentials: true })
      .then((res) => {
        const raw = Array.isArray(res.data) ? res.data : res.data.data || [];
        setAssignmentData(raw);
      })
      .catch((err) => {
        console.error("Failed to load assignments:", err);
        setAssignmentData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!assignmentData) return [];
    if (!searchQuery) return assignmentData;
    const q = searchQuery.toLowerCase();
    return assignmentData.filter(
      (a) =>
        a.subject?.toLowerCase().includes(q) ||
        a.class_name?.toLowerCase().includes(q) ||
        a.teacher?.toLowerCase().includes(q)
    );
  }, [assignmentData, searchQuery]);

  if (!assignmentData) {
    return (
      <div className="h-screen w-full text-lg capitalize text-slate-800 flex items-center justify-center">
        Loading assignments list...
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <NavbarSecondary head={"Assignments"} onSearch={setSearchQuery} />
        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Subject Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Class</TableHead>
                <TableHead className="text-gray-800 font-semibold">Due Date</TableHead>
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
                    No assignments found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.assignment_id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell className="text-left font-bold text-sm text-indigo-700 py-3">
                      {item.subject}
                    </TableCell>
                    <TableCell className="text-left text-xs font-semibold text-slate-700">
                      {item.class_name}
                    </TableCell>
                    <TableCell className="text-left text-xs font-medium text-slate-600">
                      {item.dueDate ? String(item.dueDate).split("T")[0] : "-"}
                    </TableCell>
                    <TableCell className="text-left text-xs text-slate-600 hidden sm:table-cell">
                      {item.teacher}
                    </TableCell>
                    {canManage && (
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <div className="rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 transition-colors cursor-pointer">
                            <UpdateAssignment data={item} />
                          </div>
                          <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                            <DeleteAssignment data={item} />
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
