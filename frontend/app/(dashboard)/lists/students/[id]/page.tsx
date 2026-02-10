'use client'
import { useParams } from "next/navigation";
import { CalendarClock, HeartPulse, Mail, Phone } from "lucide-react";
import Image from "next/image";
import CalendarBig from "@/components/app-big-calendar";
import Announcements from "@/components/custom/annoncements";
import { ChartBar } from "@/components/app-bar-chart";
import { DeleteStudent, UpdateStudent } from "../form-student";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDetails() {
    const { id } = useParams<{ id: string }>()
    const ID = Number(id);

    const shortcuts = [
        { name: "Student's Classes", bgcolor: "bg-sky-100" },
        { name: "Student's Teacher", bgcolor: "bg-yellow-100" },
        { name: "Student's Lessons", bgcolor: "bg-purple-100 xl:hidden 2xl:block" },
        { name: "Student's Exam", bgcolor: "bg-pink-100" },
        { name: "Student's Assignments", bgcolor: "bg-sky-100" },
    ];

    type Student = {
        teacher_id: number;
        name: string;
        email: string;
        photo?: string;
        phone?: string;
        address?: string;
        class?: string;
        bio?: string;
        blood_group: string;
        dob: string;
    }

    const [userData, setUserData] = useState<Student | null>(null)
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/student/${ID}`)
            .then((res) => setUserData(res.data))
            .catch((err) => console.error(err))
    }, [ID])

    if (!userData) return (
        <div className='h-screen w-full text-2xl capitalize text-white flex items-center justify-center'>
            Loading...
        </div>
    )

    return (
        <div id="main" className="text-black h-full xl:h-[94vh] w-full flex flex-col xl:flex-row md:pr-3">

            {/* left */}
            <div id="left" className="h-full w-full xl:w-2/3 px-2">

                <div id="details" className="w-full h-[30%] flex flex-col lg:flex-row gap-4  pb-2">

                    <div id="card" className="h-full w-full lg:w-1/2 bg-white flex items-center rounded-md p-2 pt-0.5">
                        <div id="photo" className="hidden h-full w-1/3  sm:flex items-center justify-center">
                            <div id="img-container" className="w-[74%] h-38 md:h-35 lg:h-23 xl:h-20 2xl:h-33 rounded-full overflow-hidden">
                                <img src={userData.photo || "https://github.com/evilrabbit.png"}
                                    onError={(e) => {
                                        e.currentTarget.src = "https://github.com/evilrabbit.png";
                                    }} alt='profile'
                                    className="w-full h-full object-cover" />                            </div>
                        </div>
                        <div id="text-container" className="h-full w-full sm:w-2/3 ` flex flex-col justify-center gap-5  md:py-1.5 xl:px-2">
                            <header>
                                <h1 className="text-xl font-semibold">{userData.name}</h1>
                                <span className="text-sm text-gray-700 md:pr-12 py-3">{userData.bio}</span>
                            </header>
                            <div id="extras" className="flex flex-wrap justify-between gap-2 border-gray-200 border-t pt-1">
                                <div className="w-[45%] flex gap-1 items-center">
                                    <HeartPulse size={15} />
                                    <h2 className="text-sm">{userData.blood_group}</h2>
                                </div>
                                <div className="w-[45%] flex gap-1 items-center">
                                    <CalendarClock size={15} />
                                    <h2 className="text-sm">{new Date(userData.dob).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                        timeZone: "Asia/Kolkata",
                                    })}</h2>
                                </div>
                                <div className="w-[45%] flex gap-1 items-center">
                                    <Mail size={15} />
                                    <h2 className="text-sm">{userData.email}</h2>
                                </div>
                                <div className="w-[45%] flex gap-1 items-center">
                                    <Phone size={15} />
                                    <h2 className="text-sm">{userData.phone}</h2>
                                </div>
                                <div className="w-[45%] bg-purple-300 rounded-sm px-1 flex gap-1 items-center">
                                    <UpdateStudent data={userData} />
                                    <h2 className="text-sm">Update</h2>
                                </div>
                                <div className="w-[45%] bg-red-300 rounded-sm px-1 flex gap-1 items-center">
                                    <DeleteStudent data={userData} />
                                    <h2 className="text-sm">Delete</h2>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div id="box-container" className="h-full w-full lg:w-1/2 rounded-md   flex flex-wrap justify-center gap-2 py-2">
                        <div id="box" className="bg-white h-[48%] w-[48%] flex p-4 gap-4 rounded-md">
                            <Image
                                src="/singleAttendance.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-400">Attendance</span>
                            </div>
                        </div>
                        <div id="box" className="bg-white h-[48%] w-[48%] flex p-4 gap-4 rounded-md">
                            <Image
                                src="/singleBranch.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">6th</h1>
                                <span className="text-sm text-gray-400">Grade</span>
                            </div>
                        </div>
                        <div id="box" className="bg-white h-[48%] w-[48%] flex p-4 gap-4 rounded-md">
                            <Image
                                src="/singleLesson.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">18</h1>
                                <span className="text-sm text-gray-400">Lessons</span>
                            </div>
                        </div>
                        <div id="box" className="bg-white h-[48%] w-[48%] flex p-4 gap-4 rounded-md">
                            <Image
                                src="/singleClass.png"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <div className="">
                                <h1 className="text-xl font-semibold">{userData.class}</h1>
                                <span className="text-sm text-gray-400">Class</span>
                            </div>
                        </div>


                    </div>

                </div>


                <div id="big-calender" className="w-full h-[70%] bg-white overflow-hidden rounded-md px-2">
                    <header className="font-bold text-2xl lg:h-1/15">
                        <h1>Student Schedule</h1>
                    </header>
                    <div id="calender-container" className="lg:h-14/15 w-full px-1">
                        <CalendarBig />
                    </div>
                </div>

            </div>

            {/* right */}
            <div id="right" className="h-full w-full lg:h-screen xl:h-full xl:w-1/3 px-2 mt-2">

                <div className="h-full lg:h-[35%] xl:h-[50%] w-full flex flex-col gap-2 lg:flex-row xl:flex-col">

                    <div id="shortcuts" className="w-full h-[40%] lg:h-full lg:w-[30%] xl:w-full xl:h-[40%] bg-white pb-2 rounded-lg xl:rounded-bl-none">
                        <header className="lg:h-8 xl:h-1/4 px-2 py-1">
                            <h1 className="font-bold text-lg">Shortcuts</h1>
                        </header>
                        <div className="w-full h-3/4 flex flex-wrap gap-3 items-center px-3">
                            {
                                shortcuts.map((item, id) => (
                                    <button key={id} className={`${item.bgcolor} text-md text-black p-1 md:py-2 md:px-3 rounded-sm`}>{item.name}</button>

                                ))
                            }
                        </div>
                    </div>

                    <div id="chart-container" className="w-full h-[59%] lg:h-full lg:w-[69%] xl:w-full xl:h-[58%] xl:mt-2 bg-white rounded-lg xl:rounded-l-none">
                        <header className="h-1/7 px-4 py-1">
                            <h1 className="font-bold text-lg">Attendence</h1>
                        </header>
                        <div id="chart-wrapper" className="w-full h-6/7">
                            <ChartBar />
                        </div>
                    </div>

                </div>

                <div id="announcement" className="w-full h-[40vh] lg:h-[63%] xl:h-[47%] mt-3  px-4  bg-white rounded-lg xl:rounded-tl-none">
                    <Announcements />
                </div>

            </div>
        </div>
    )
}