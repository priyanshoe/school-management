"use client";

import axios from "axios";
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
import { DeleteTeacher, UpdateTeacher } from "./form-teacher";
import { useAuth } from "@/lib/auth-context";

export default function TeachersList() {
  type Teacher = {
    teacher_id: number;
    name: string;
    email: string;
    photo?: string;
    subjects: string[];
    classes: string[];
    phone?: string;
    address?: string;
  };

  const [teachersData, setTeachersData] = useState<Teacher[] | null>(null);
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
      .get(`${apiUrl}/teacher`, { withCredentials: true })
      .then((res) => {
        const rawData = Array.isArray(res.data) ? res.data : res.data.data || [];
        const data = rawData.map((item: any) => ({
          ...item,
          subjects:
            typeof item.subjects === "string"
              ? item.subjects.split(",")
              : Array.isArray(item.subjects)
              ? item.subjects
              : [],
          classes:
            typeof item.classes === "string"
              ? item.classes.split(",")
              : Array.isArray(item.classes)
              ? item.classes
              : [],
        }));
        setTeachersData(data);
      })
      .catch((err) => {
        console.error("Failed to load teachers:", err);
        setTeachersData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!teachersData) return [];
    if (!searchQuery) return teachersData;
    const q = searchQuery.toLowerCase();
    return teachersData.filter(
      (t) =>
        t.name?.toLowerCase().includes(q) ||
        t.email?.toLowerCase().includes(q) ||
        t.subjects?.some((s) => s.toLowerCase().includes(q)) ||
        t.classes?.some((c) => c.toLowerCase().includes(q))
    );
  }, [teachersData, searchQuery]);

  if (!teachersData) {
    return (
      <div className="h-screen w-full text-lg capitalize text-slate-800 flex items-center justify-center">
        Loading teachers list...
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <NavbarSecondary head={"Teachers"} onSearch={setSearchQuery} />
        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Teacher ID</TableHead>
                <TableHead className="text-gray-800 font-semibold min-w-36">Subjects</TableHead>
                <TableHead className="text-gray-800 font-semibold">Classes</TableHead>
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
                    No teachers found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.teacher_id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell
                      className="text-left flex gap-3 items-center justify-start cursor-pointer py-2"
                      onClick={() => router.push(`/lists/teachers/${item.teacher_id}`)}
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
                        <h3 className="text-xs text-gray-500">{item.email}</h3>
                      </div>
                    </TableCell>
                    <TableCell className="text-left text-sm font-medium text-slate-600">
                      {item.teacher_id}
                    </TableCell>
                    <TableCell className="text-left text-xs font-medium text-slate-700">
                      {item.subjects.join(", ") || "-"}
                    </TableCell>
                    <TableCell className="text-left text-xs font-medium text-slate-700">
                      {item.classes.join(", ") || "-"}
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
                              <UpdateTeacher data={item} />
                            </div>
                            <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                              <DeleteTeacher data={item} />
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
