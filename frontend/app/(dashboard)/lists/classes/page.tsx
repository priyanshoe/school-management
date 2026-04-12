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
import { DeleteClass, UpdateClass } from "./form-classes";

export default function ClassesList() {
  const rowsPerPage = 15;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  type Class = {
    class_id: number;
    name: string;
    class_teacher: string;
  };
  const [classesData, setClassesData] = useState<Class[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/class`)
      .then((res) => setClassesData(res.data.data))
      .catch((err) => console.log(err.data));
  }, []);

  if (!classesData)
    return (
      <div className="h-screen w-full text-2xl capitalize text-white flex items-center justify-center">
        Loading...
      </div>
    );
  return (
    <div className="w-full h-[93vh] text-black px-1 md:px-0 md:pr-2">
      <div className="bg-white px-3 py-2  rounded-md">
        <NavbarSecondary head={"Classes"} />
        <div id="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" text-gray-800 font-semibold">
                  Class Name
                </TableHead>
                <TableHead className="text-gray-800 font-semibold">
                  Class Teacher
                </TableHead>
                {role === "admin" && (
                  <TableHead className="text-gray-800 font-semibold">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {classesData.slice(startIndex, endIndex).map((item) => (
                <TableRow
                  key={item.class_id}
                  className={`${item.class_id % 2 === 0 ? "bg-[#F8FAFC]" : ""}`}
                >
                  <TableCell className="text-left">{item.name}</TableCell>
                  <TableCell className="text-left">
                    {item.class_teacher}
                  </TableCell>
                  {role === "admin" && (
                    <TableCell className="flex justify-start items-center gap-2">
                      <div className="rounded-full bg-purple-300 p-2">
                        <UpdateClass data={item} />
                      </div>
                      <div className="rounded-full bg-red-300 p-2">
                        <DeleteClass data={item} />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-2">
            <PaginationList
              data={classesData}
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
