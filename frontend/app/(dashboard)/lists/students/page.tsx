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
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { DeleteStudent, UpdateStudent } from "./form-student";
import axios from "axios";
import { useAuth } from "@/lib/auth-context";

export default function StudentsList() {
  type Student = {
    student_id: number;
    name: string;
    email: string;
    photo?: string;
    class?: string;
    grade?: string;
    subjects: string[];
    phone?: string;
    address?: string;
  };

  const [studentsData, setStudentsData] = useState<Student[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { role } = useAuth();
  const currentRole = (role || "").toLowerCase();
  const isAdmin = currentRole === "admin";
  const router = useRouter();

  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/student`, { withCredentials: true })
      .then((res) => {
        const raw = Array.isArray(res.data) ? res.data : res.data.data || [];
        const data = raw.map((item: any) => ({
          ...item,
          subjects:
            typeof item.subjects === "string"
              ? item.subjects.split(",")
              : Array.isArray(item.subjects)
              ? item.subjects
              : [],
        }));
        setStudentsData(data);
      })
      .catch((err) => {
        console.error("Failed to load students:", err);
        setStudentsData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!studentsData) return [];
    if (!searchQuery) return studentsData;
    const q = searchQuery.toLowerCase();
    return studentsData.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.class?.toLowerCase().includes(q)
    );
  }, [studentsData, searchQuery]);

  if (!studentsData) {
    return (
      <div className="h-screen w-full text-lg capitalize text-slate-800 flex items-center justify-center">
        Loading students list...
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <NavbarSecondary head={"Students"} onSearch={setSearchQuery} />
        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Student ID</TableHead>
                <TableHead className="text-gray-800 font-semibold">Class</TableHead>
                <TableHead className="text-gray-800 font-semibold hidden sm:table-cell">Email</TableHead>
                {["admin", "teacher"].includes(currentRole) && (
                  <TableHead className="text-gray-800 font-semibold hidden sm:table-cell">Phone</TableHead>
                )}
                {isAdmin && (
                  <>
                    <TableHead className="text-gray-800 font-semibold hidden lg:table-cell">Address</TableHead>
                    <TableHead className="text-gray-800 font-semibold text-right">Actions</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.student_id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell
                      className="text-left flex gap-3 items-center justify-start cursor-pointer py-2"
                      onClick={() => router.push(`/lists/students/${item.student_id}`)}
                    >
                      <div className="rounded-full overflow-hidden h-9 w-9 hidden sm:block border border-slate-200 shrink-0">
                        <img
                          src={item.photo || "https://github.com/evilrabbit.png"}
                          onError={(e) => {
                            e.currentTarget.src = "https://github.com/evilrabbit.png";
                          }}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div id="name">
                        <h1 className="text-sm font-semibold text-slate-800">{item.name}</h1>
                        <h3 className="text-xs text-gray-500">{item.class || "General"}</h3>
                      </div>
                    </TableCell>
                    <TableCell className="text-left text-sm font-medium text-slate-600">
                      {item.student_id}
                    </TableCell>
                    <TableCell className="text-left text-xs font-semibold text-indigo-600">
                      {item.class || "-"}
                    </TableCell>
                    <TableCell className="text-left text-xs text-slate-600 hidden sm:table-cell">
                      {item.email}
                    </TableCell>
                    {["admin", "teacher"].includes(currentRole) && (
                      <TableCell className="text-left text-xs text-slate-600 hidden sm:table-cell">
                        {item.phone || "-"}
                      </TableCell>
                    )}
                    {isAdmin && (
                      <>
                        <TableCell className="text-left text-xs text-slate-600 hidden lg:table-cell">
                          {item.address || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center gap-2">
                            <div className="rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 transition-colors cursor-pointer">
                              <UpdateStudent data={item} />
                            </div>
                            <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                              <DeleteStudent data={item} />
                            </div>
                          </div>
                        </TableCell>
                      </>
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
