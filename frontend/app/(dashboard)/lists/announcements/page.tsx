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
import { announcementsData as fallbackAnnouncements } from "@/database/data";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import axios from "axios";
import { CreateAnnouncement, DeleteAnnouncement, UpdateAnnouncement } from "./form-announcement";

export default function AnnouncementsList() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementsData, setAnnouncementsData] = useState<any[]>(fallbackAnnouncements);

  const { role } = useAuth();
  const currentRole = (role || "").toLowerCase();
  const canManage = ["admin", "teacher"].includes(currentRole);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/announcement`, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setAnnouncementsData(res.data.data);
        }
      })
      .catch((err) => {
        // Fallback
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return announcementsData;
    const q = searchQuery.toLowerCase();
    return announcementsData.filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.class?.toLowerCase().includes(q) ||
        a.desc?.toLowerCase().includes(q)
    );
  }, [announcementsData, searchQuery]);

  return (
    <div className="w-full h-auto min-h-[90vh] text-black px-1 md:px-0 md:pr-2 p-2">
      <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-1">
          <div className="flex-1">
            <NavbarSecondary head={"Announcements"} onSearch={setSearchQuery} />
          </div>
          {canManage && (
            <div className="ml-2 mb-2">
              <CreateAnnouncement />
            </div>
          )}
        </div>

        <div id="table-container" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-200">
                <TableHead className="text-gray-800 font-semibold">Title</TableHead>
                <TableHead className="text-gray-800 font-semibold">Class</TableHead>
                <TableHead className="text-gray-800 font-semibold">Date</TableHead>
                {canManage && (
                  <TableHead className="text-gray-800 font-semibold text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                    No announcements found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(startIndex, endIndex).map((item, idx) => (
                  <TableRow
                    key={item.id || idx}
                    className={`${idx % 2 === 0 ? "bg-[#F8FAFC]" : ""} hover:bg-slate-50 transition-colors`}
                  >
                    <TableCell className="text-left font-bold text-sm text-indigo-700 py-3">
                      {item.title}
                    </TableCell>
                    <TableCell className="text-left text-xs font-semibold text-slate-700">
                      {item.class || "All"}
                    </TableCell>
                    <TableCell className="text-left text-xs text-slate-600 font-medium">
                      {item.date ? String(item.date).split("T")[0] : "-"}
                    </TableCell>
                    {canManage && (
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-2">
                          <div className="rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 transition-colors cursor-pointer">
                            <UpdateAnnouncement data={item} />
                          </div>
                          <div className="rounded-md bg-red-100 hover:bg-red-200 text-red-700 p-1.5 transition-colors cursor-pointer">
                            <DeleteAnnouncement data={item} />
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
