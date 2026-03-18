"use client";
import { PaginationList } from "@/components/app-pagination";
import { FormDelete, FormUpdate } from "@/components/custom/form-modal";
import NavbarSecondary from "@/components/custom/navbar-secondary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { role } from "@/database/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteSubject, UpdateSubject } from "./form-subject";

export default function SubjectsList() {
  const rowsPerPage = 15;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  type Subject = {
    subject_id: number;
    name: string;
    teachers: string[];
  };
  const [subjectsData, setSubjectsData] = useState<Subject[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/subject`)
      .then((res) => {
        const data = res.data.data.map((item: any) => ({
          ...item,
          teachers:
            typeof item.teachers === "string" ? item.teachers.split(",") : [],
        }));
        setSubjectsData(data);
      })
      .catch((err) => console.log(err.messase));
  }, []);

  if (!subjectsData)
    return (
      <div className="h-screen w-full text-2xl capitalize text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-[93vh] text-black px-1 md:px-0 md:pr-2">
      <div className="bg-white px-3 py-2 rounded-md">
        <NavbarSecondary head={"Subjects"} />
        <div id="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" text-gray-800 font-semibold">
                  Subjects Id
                </TableHead>
                <TableHead className=" text-gray-800 font-semibold">
                  Subjects Name
                </TableHead>
                <TableHead className="text-gray-800 font-semibold min-w-40">
                  Teachers
                </TableHead>
                {role === "admin" && (
                  <TableHead className="text-gray-800 font-semibold">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectsData.slice(startIndex, endIndex).map((item) => (
                <TableRow
                  key={item.subject_id}
                  className={`${item.subject_id % 2 === 0 ? "bg-[#F8FAFC]" : ""}`}
                >
                  <TableCell className="text-left">{item.subject_id}</TableCell>
                  <TableCell className="text-left">{item.name}</TableCell>
                  <TableCell className="text-left">
                    {item.teachers.join(", ")}
                  </TableCell>
                  {role === "admin" && (
                    <TableCell className="flex justify-start items-center gap-2">
                      <div className="rounded-full bg-purple-300 p-2">
                        <UpdateSubject data={item} />
                      </div>
                      <div className="rounded-full bg-red-300 p-2">
                        <DeleteSubject data={item} />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-2">
            <PaginationList
              data={subjectsData}
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
