"use client"
import axios from 'axios'
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
import { role } from '@/database/data';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteTeacher, UpdateTeacher } from './form-teacher';


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
    }
    const [teachersData, setTeachersData] = useState<Teacher[] | null>(null)
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/teacher/`, { withCredentials: true })
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
        setTeachersData(data)
    })
        .catch(err => console.error(err))
}, [])


const router = useRouter();
const rowsPerPage = 13;
const [startIndex, setStartIndex] = useState(0);
const [endIndex, setEndIndex] = useState(rowsPerPage);


const [loading, setLoading] = useState(true)
if (!teachersData) {
    setTimeout(() => {
        setLoading(false)
    }, 10000);
    if (loading) {
        return (
            <div className='h-screen w-full text-2xl capitalize text-white flex items-center justify-center'>
                Loading...
            </div>
        )
    } else {
        return (
            <div className='h-screen w-full text-2xl capitalize text-white flex items-center justify-center'>
                Try again / server down
            </div>
        )
    }
}


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
                            <TableHead className="text-gray-800 font-semibold min-w-40 w-6">Subjects</TableHead>
                            <TableHead className="text-gray-800 font-semibold">Classes</TableHead>
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
                            teachersData.slice(startIndex, endIndex).map((item, id) => (
                                <TableRow key={id} className={`${id % 2 === 0 ? 'bg-[#F8FAFC]' : ''}`}>
                                    <TableCell className="text-left flex gap-2 items-center justify-start cursor-pointer"
                                        onClick={() => router.push(`teachers/${item.teacher_id}`)}>
                                        <div id="profile-photo" className="rounded-full overflow-hidden h-10 w-10 hidden sm:table-cell">
                                            <img src={item.photo || "https://github.com/evilrabbit.png"}
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://github.com/evilrabbit.png";
                                                }} alt='profile'
                                                className="w-full h-full" />
                                        </div>
                                        <div id="name">
                                            <h1 className="text-md font-semibold">{item.name}</h1>
                                            <h3 className="text-xs font-semibold text-gray-500">{item.email}</h3>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left">{item.teacher_id}</TableCell>
                                    <TableCell className="text-left">{item.subjects.join(", ")}</TableCell>
                                    <TableCell className="text-left">{item.classes.join(", ")}</TableCell>
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
                                                    <UpdateTeacher data={item} />
                                                    {/* <SquarePen size={15} /> */}
                                                </div>
                                                <div className="rounded-full bg-red-300 p-2">
                                                    <DeleteTeacher data={item} />
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