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
import { DeleteClass, UpdateClass } from "./form-classes";
import { useAuth } from "@/lib/auth-context";

export default function ClassesList() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");

  type Class = {
    class_id: number;
    name: string;
    class_teacher?: string;
    class_teacher_id?: number;
  };

  const [classesData, setClassesData] = useState<Class[] | null>(null);
  const { role } = useAuth();
  const isAdmin = (role || "").toLowerCase() === "admin";

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/class`, { withCredentials: true })
      .then((res) => {
        const raw = Array.isArray(res.data) ? res.data : res.data.data || [];
        setClassesData(raw);
      })
      .catch((err) => {
        console.error("Failed to load classes:", err);
        setClassesData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!classesData) return [];
    if (!searchQuery) return classesData;
    const q = searchQuery.toLowerCase();
    return classesData.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.class_teacher?.toLowerCase().includes(q)
    );
  }, [classesData, searchQuery]);

  if (!classesData) {
    return (
      <div className="h-screen w-full text-lg capitalize text-slate-800 flex items-center justify-center">
        Loading classes list...
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <NavbarSecondary head={"Classes"} onSearch={setSearchQuery} />
        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Class Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Class Teacher</TableHead>
                {isAdmin && (
                  <TableHead className="text-gray-800 font-semibold text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                    No classes found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.class_id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell className="text-left font-bold text-sm text-indigo-700 py-3">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-left text-sm text-slate-700">
                      {item.class_teacher || "Unassigned"}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <div className="rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 transition-colors cursor-pointer">
                            <UpdateClass data={item} />
                          </div>
                          <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                            <DeleteClass data={item} />
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
