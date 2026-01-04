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
import { eventsData, role } from '@/database/data';
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";


export default function EventsList() {
    const rowsPerPage = 15;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(rowsPerPage);

    return (
        <div className="w-full h-[93vh] text-black px-1 md:px-0 md:pr-2">
            <div  className="bg-white px-3 py-2  rounded-md">

            <NavbarSecondary head={"Events"} />
            <div id="table-container">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" text-gray-800 font-semibold">Event Name</TableHead>
                            <TableHead className="text-gray-800 font-semibold hidden sm:table-cell">Class</TableHead>
                            <TableHead className="text-gray-800 font-semibold">Date</TableHead>
                            <TableHead className="text-gray-800 font-semibold">From</TableHead>
                            <TableHead className="text-gray-800 font-semibold">To</TableHead>
                            {
                                role === "admin" &&
                                <TableHead className="text-gray-800 font-semibold">Actions</TableHead>
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            eventsData.slice(startIndex, endIndex).map((item) =>(
                                <TableRow key={item.id} className={`${item.id%2 === 0 ? 'bg-[#F8FAFC]':''}`}>
                                    <TableCell className="text-left">{item.title}</TableCell>
                                    <TableCell className="text-left hidden sm:table-cell">{item.class}</TableCell>
                                    <TableCell className="text-left">{item.date}</TableCell>
                                    <TableCell className="text-left">{item.startTime}</TableCell>
                                    <TableCell className="text-left">{item.endTime}</TableCell>
                                    {
                                        role === "admin" &&
                                        <TableCell className="flex justify-start items-center gap-2">
                                            <div className="rounded-full bg-purple-300 p-2">
                                                        <FormUpdate data={item}/>
                                            </div>
                                            <div className="rounded-full bg-red-300 p-2">
                                                        <FormDelete id={item.id} name={item.title}/>
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
                        data={eventsData} 
                        start={startIndex} setStart={setStartIndex} 
                        end={endIndex} setEnd={setEndIndex} 
                        rows={rowsPerPage} />
                </div>
            </div>

            </div>
        </div>
    )
}