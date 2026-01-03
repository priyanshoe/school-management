"use client"
import { PaginationList } from "@/components/app-pagination"
import { FormDelete, FormUpdate } from "@/components/custom/form-modal";
import NavbarSecondary from "@/components/custom/navbar-secondary"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { teachersData, role } from '@/database/data';
import { SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function TeachersList() {
    const router = useRouter();
    const rowsPerPage = 15;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);

    return (
        <div className="w-full h-[93vh] text-black px-1 md:px-0 md:pr-2">
            <div className="bg-white px-3 py-2  rounded-md">

                <NavbarSecondary head={"Teachers"} />
                <div id="table-container">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-gray-800 font-semibold">Name</TableHead>
                                <TableHead className="text-gray-800 font-semibold">Teacher ID</TableHead>
                                <TableHead className="text-gray-800 font-semibold">Subjects</TableHead>
                                <TableHead className="text-gray-800 font-semibold">Classes</TableHead>
                                {
                                    ["admin","teacher"].includes(role) &&
                                    <TableHead className="text-gray-800 font-semibold hidden sm:table-cell">Phone</TableHead>
                                }
                                {
                                    role === "admin" &&
                                    <>
                                        <TableHead className="text-gray-800 font-semibold hidden lg:table-cell">Address</TableHead>
                                        <TableHead className="text-gray-800 font-semibold">Actions</TableHead>
                                    </>
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                teachersData.slice(startIndex, endIndex).map((item) => (
                                    <TableRow key={item.id} className={`${item.id % 2 === 0 ? 'bg-[#F8FAFC]' : ''}`}>
                                        <TableCell className="text-left flex gap-2 items-center justify-start cursor-pointer"
                                                    onClick={()=> router.push(`teachers/${item.id}`)}>
                                            <div id="profile-photo" className="rounded-full overflow-hidden h-10 w-10 hidden sm:table-cell">
                                                <img src={item.photo} className="w-full h-full" />
                                            </div>
                                            <div id="name">
                                                <h1 className="text-md font-semibold">{item.name}</h1>
                                                <h3 className="text-xs font-semibold text-gray-500">{item.email}</h3>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left">{item.teacherId}</TableCell>
                                        <TableCell className="text-left">{item.subjects.join(", ")}</TableCell>
                                        <TableCell className="text-left">{item.classes.join(", ")}</TableCell>
                                        {
                                            ["admin","teacher"].includes(role) &&
                                            <TableCell className="text-left hidden sm:table-cell">{item.phone}</TableCell>
                                        }
                                        {
                                            role === "admin" &&
                                            <>
                                                <TableCell className="text-left hidden lg:table-cell">{item.address}</TableCell>
                                                <TableCell className="flex justify-start items-center gap-2">
                                                    <div className="rounded-full bg-purple-300 p-2">
                                                        <FormUpdate data={item}/>
                                                        {/* <SquarePen size={15} /> */}
                                                    </div>
                                                    <div className="rounded-full bg-red-300 p-2">
                                                        <FormDelete id={item.id} name={item.name}/>
                                                        {/* <Trash2 size={15} /> */}
                                                    </div>
                                                </TableCell>
                                            </>
                                        }
                                    </TableRow>
                                ))

                            }

                        </TableBody>
                    </Table>
                    <div className="mt-2">
                        <PaginationList
                            data={teachersData}
                            start={startIndex} setStart={setStartIndex}
                            end={endIndex} setEnd={setEndIndex}
                            rows={rowsPerPage} />
                    </div>
                </div>

            </div>
        </div>
    )
}