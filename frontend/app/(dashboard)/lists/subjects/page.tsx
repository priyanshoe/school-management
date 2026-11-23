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
import { DeleteSubject, UpdateSubject } from "./form-subject";
import { useAuth } from "@/lib/auth-context";

export default function SubjectsList() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");

  type Subject = {
    subject_id: number;
    name: string;
    teachers: string[];
  };

  const [subjectsData, setSubjectsData] = useState<Subject[] | null>(null);
  const { role } = useAuth();
  const isAdmin = (role || "").toLowerCase() === "admin";

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/subject`, { withCredentials: true })
      .then((res) => {
        const raw = Array.isArray(res.data) ? res.data : res.data.data || [];
        const data = raw.map((item: any) => ({
          ...item,
          teachers:
            typeof item.teachers === "string"
              ? item.teachers.split(",")
              : Array.isArray(item.teachers)
              ? item.teachers
              : [],
        }));
        setSubjectsData(data);
      })
      .catch((err) => {
        console.error("Failed to load subjects:", err);
        setSubjectsData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!subjectsData) return [];
    if (!searchQuery) return subjectsData;
    const q = searchQuery.toLowerCase();
    return subjectsData.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.teachers?.some((t) => t.toLowerCase().includes(q))
    );
  }, [subjectsData, searchQuery]);

  if (!subjectsData) {
    return (
      <div className="h-screen w-full text-lg capitalize text-slate-800 flex items-center justify-center">
        Loading subjects list...
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <NavbarSecondary head={"Subjects"} onSearch={setSearchQuery} />
        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Subject ID</TableHead>
                <TableHead className="text-gray-800 font-semibold">Subject Name</TableHead>
                <TableHead className="text-gray-800 font-semibold min-w-40">Assigned Teachers</TableHead>
                {isAdmin && (
                  <TableHead className="text-gray-800 font-semibold text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                    No subjects found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.subject_id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell className="text-left font-medium text-sm text-slate-500 py-3">
                      {item.subject_id}
                    </TableCell>
                    <TableCell className="text-left font-bold text-sm text-indigo-700">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-left text-xs font-medium text-slate-600">
                      {item.teachers.join(", ") || "None"}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <div className="rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 transition-colors cursor-pointer">
                            <UpdateSubject data={item} />
                          </div>
                          <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                            <DeleteSubject data={item} />
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
