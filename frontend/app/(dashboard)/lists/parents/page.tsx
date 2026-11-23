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
import { useEffect, useState, useMemo } from "react";
import { DeleteParent, UpdateParent } from "./form-parent";
import axios from "axios";
import { useAuth } from "@/lib/auth-context";

export default function ParentsList() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");

  type Parent = {
    parent_id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    student_names?: string;
  };

  const [parentsData, setParentsData] = useState<Parent[] | null>(null);
  const { role } = useAuth();
  const isAdmin = (role || "").toLowerCase() === "admin";

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/parent`, { withCredentials: true })
      .then((res) => {
        const raw = Array.isArray(res.data) ? res.data : res.data.data || [];
        setParentsData(raw);
      })
      .catch((err) => {
        console.error("Failed to load parents:", err);
        setParentsData([]);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!parentsData) return [];
    if (!searchQuery) return parentsData;
    const q = searchQuery.toLowerCase();
    return parentsData.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.student_names?.toLowerCase().includes(q)
    );
  }, [parentsData, searchQuery]);

  if (!parentsData) {
    return (
      <div className="h-screen w-full text-lg capitalize text-slate-800 flex items-center justify-center">
        Loading parents list...
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <NavbarSecondary head={"Parents"} onSearch={setSearchQuery} />
        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Parents Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Students Name</TableHead>
                <TableHead className="text-gray-800 font-semibold">Email</TableHead>
                <TableHead className="text-gray-800 font-semibold hidden sm:table-cell">Phone</TableHead>
                {isAdmin && (
                  <>
                    <TableHead className="text-gray-800 font-semibold hidden sm:table-cell">Address</TableHead>
                    <TableHead className="text-gray-800 font-semibold text-right">Actions</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No parents found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.parent_id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell className="text-left font-medium text-sm text-slate-800 py-3">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-left text-xs font-semibold text-indigo-600">
                      {item.student_names || "None linked"}
                    </TableCell>
                    <TableCell className="text-left text-xs text-slate-600">{item.email}</TableCell>
                    <TableCell className="text-left text-xs text-slate-600 hidden sm:table-cell">
                      {item.phone || "-"}
                    </TableCell>
                    {isAdmin && (
                      <>
                        <TableCell className="text-left text-xs text-slate-600 hidden sm:table-cell">
                          {item.address || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center gap-2">
                            <div className="rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 transition-colors cursor-pointer">
                              <UpdateParent data={item} />
                            </div>
                            <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                              <DeleteParent data={item} />
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
