"use client"
import { PaginationList } from "@/components/app-pagination"
import NavbarSecondary from "@/components/custom/navbar-secondary"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { role, subjectsData } from '@/database/data';
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";


export default function SubjectsList() {
    const rowsPerPage = 10;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);

    return (
        <div className="w-full h-[93vh] text-black pr-3">
            <div className="bg-white px-3 py-2  rounded-md">

                <NavbarSecondary head={"Subjects"} />
                <div id="table-container">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" text-gray-800 font-semibold">Subjects Name</TableHead>
                                <TableHead className="text-gray-800 font-semibold">Teachers</TableHead>
                                {role==="admin" &&
                                    <TableHead className="text-gray-800 font-semibold">Actions</TableHead>
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                subjectsData.slice(startIndex, endIndex).map((item) => (
                                    <TableRow key={item.id} className={`${item.id % 2 === 0 ? 'bg-[#F8FAFC]' : ''}`}>
                                        <TableCell className="text-left">{item.name}</TableCell>
                                        <TableCell className="text-left">{item.teachers.join(', ')}</TableCell>
                                        {role === "admin" &&
                                            <TableCell className="flex justify-start items-center gap-2">
                                                <div className="rounded-full bg-purple-300 p-2">
                                                    <SquarePen size={15} />
                                                </div>
                                                <div className="rounded-full bg-red-300 p-2">
                                                    <Trash2 size={15} />
                                                </div>
                                            </TableCell>
                                        }
                                    </TableRow>
                                ))

                            }

                        </TableBody>
                    </Table>
                    <div className="mt-2">
                        <PaginationList
                            data={subjectsData}
                            start={startIndex} setStart={setStartIndex}
                            end={endIndex} setEnd={setEndIndex}
                            rows={rowsPerPage} />
                    </div>
                </div>

            </div>
        </div>
    )
}