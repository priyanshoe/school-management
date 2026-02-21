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
import { studentsData, role } from '@/database/data';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteStudent, UpdateStudent } from "./form-student";
import axios from "axios";


export default function StudentsList() {
    type Student = {
        student_id: number;
        name: string;
        email: string;
        photo?: string;
        class?: string,
        grade?: string,
        subjects: string[];
        classes: string;
        phone?: string;
        address?: string;
    }
    const [studentsData, setStudentsData] = useState<Student[] | null>(null)
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/`, { withCredentials: true })
            .then(res => {
                const data = res.data.map((item: any) => ({
                    ...item,
                    subjects:
                        typeof item.subjects === "string"
                            ? item.subjects.split(",")
                            : [],
                    classes:
                        typeof item.classes === "string"
                            ? item.classes.split(",")
                            : []
                }))
                setStudentsData(data)
            })
            .catch(err => console.error(err))
    }, [])


    const rowsPerPage = 15;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);

    const router = useRouter();

    if (!studentsData) return (
        <div className='h-screen w-full text-2xl capitalize text-white flex items-center justify-center'>
            Loading...
        </div>
    )

    return (
        <div className="w-full h-[93vh] text-black px-1 md:px-0 md:pr-2">
            <div className="bg-white px-3 py-2  rounded-md">

                <NavbarSecondary head={"Students"} />
                <div id="table-container">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-gray-800 font-semibold">Name</TableHead>
                                <TableHead className="text-gray-800 font-semibold">Student ID</TableHead>
                                <TableHead className="text-gray-800 font-semibold">Class</TableHead>
                                <TableHead className="text-gray-800 font-semibold hidden sm:table-cell">Email</TableHead>
                                {
                                    ["admin", "teacher"].includes(role) &&
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
                                studentsData.slice(startIndex, endIndex).map((item, id) => (
                                    <TableRow key={id} className={`${id % 2 === 0 ? 'bg-[#F8FAFC]' : ''}`}>
                                        <TableCell className="text-left flex gap-2 items-center justify-start cursor-pointer hover:bg-gray-100"
                                            onClick={() => router.push(`students/${item.student_id}`)}>
                                            <div id="profile-photo" className="rounded-full overflow-hidden h-10 w-10 hidden sm:table-cell">
                                                <img src={item.photo || "https://github.com/evilrabbit.png"}
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://github.com/evilrabbit.png";
                                                    }} alt='profile'
                                                    className="w-full h-full" />
                                            </div>
                                            <div id="name">
                                                <h1 className="text-md font-semibold">{item.name}</h1>
                                                <h3 className="text-xs font-semibold text-gray-500">{item.class}</h3>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left">{item.student_id}</TableCell>
                                        <TableCell className="text-left">{item.class}</TableCell>
                                        <TableCell className="text-left hidden sm:table-cell">{item.email}</TableCell>
                                        {
                                            ["admin", "teacher"].includes(role) &&
                                            <TableCell className="text-left hidden sm:table-cell">{item.phone}</TableCell>
                                        }
                                        {
                                            role === "admin" &&
                                            <>
                                                <TableCell className="text-left hidden lg:table-cell">{item.address}</TableCell>
                                                <TableCell className="flex justify-start items-center gap-2">
                                                    <div className="rounded-full bg-purple-300 p-2">
                                                        <UpdateStudent data={item} />
                                                    </div>
                                                    <div className="rounded-full bg-red-300 p-2">
                                                        <DeleteStudent data={item} />
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
                            data={studentsData}
                            start={startIndex} setStart={setStartIndex}
                            end={endIndex} setEnd={setEndIndex}
                            rows={rowsPerPage} />
                    </div>
                </div>

            </div>
        </div>
    )
}