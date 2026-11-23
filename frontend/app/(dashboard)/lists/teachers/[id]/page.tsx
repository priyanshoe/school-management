'use client';

import { useParams, useRouter } from "next/navigation";
import { CalendarClock, HeartPulse, Mail, Phone } from "lucide-react";
import Image from "next/image";
import CalendarBig from "@/components/app-big-calendar";
import Announcements from "@/components/custom/annoncements";
import { ChartBar } from "@/components/app-bar-chart";
import { UpdateTeacher, DeleteTeacher } from "../form-teacher";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/lib/auth-context";

export default function TeacherDetails() {
  type Teacher = {
    teacher_id: number;
    name: string;
    email: string;
    photo?: string;
    phone?: string;
    address?: string;
    bio?: string;
    blood_group: string;
    dob: string;
    subjects?: string[];
    classes?: string[];
  };

  const { id } = useParams<{ id: string }>();
  const ID = Number(id);
  const [userData, setUserData] = useState<Teacher | null>(null);
  const { role } = useAuth();
  const isAdmin = (role || "").toLowerCase() === "admin";
  const router = useRouter();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/teacher/${ID}`, { withCredentials: true })
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err));
  }, [ID]);

  const shortcuts = [
    { name: "Teacher's Classes", bgcolor: "bg-sky-100", url: "/lists/classes" },
    { name: "Teacher's Lessons", bgcolor: "bg-purple-100", url: "/lists/lessons" },
    { name: "Teacher's Exams", bgcolor: "bg-pink-100", url: "/lists/exams" },
    { name: "Teacher's Assignments", bgcolor: "bg-sky-100", url: "/lists/assignments" },
  ];

  if (!userData) {
    return (
      <div className="h-screen w-full text-2xl capitalize text-slate-800 flex items-center justify-center">
        Loading teacher details...
      </div>
    );
  }

  return (
    <div id="main" className="text-black h-full xl:h-[94vh] w-full flex flex-col xl:flex-row md:pr-3 p-2">
      {/* left */}
      <div id="left" className="h-full w-full xl:w-2/3 px-2">
        <div id="details" className="w-full h-auto min-h-[30%] flex flex-col lg:flex-row gap-4 pb-2">
          <div id="card" className="h-full w-full lg:w-1/2 bg-white flex items-center rounded-md p-3 shadow-sm border border-slate-100">
            <div id="photo" className="hidden h-full w-1/3 sm:flex items-center justify-center">
              <div id="img-container" className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-200">
                <img
                  src={userData.photo || "https://github.com/evilrabbit.png"}
                  onError={(e) => {
                    e.currentTarget.src = "https://github.com/evilrabbit.png";
                  }}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div id="text-container" className="h-full w-full sm:w-2/3 flex flex-col justify-center gap-3 md:py-1.5 xl:px-2">
              <header>
                <h1 className="text-xl font-semibold text-slate-800">{userData.name}</h1>
                <span className="text-xs text-gray-500 line-clamp-2">{userData.bio || "Teacher profile"}</span>
              </header>
              <div id="extras" className="flex flex-wrap justify-between gap-2 border-gray-100 border-t pt-2 text-xs text-slate-600">
                <div className="w-[45%] flex gap-1 items-center">
                  <HeartPulse size={14} className="text-red-500" />
                  <h2>{userData.blood_group || "N/A"}</h2>
                </div>
                <div className="w-[45%] flex gap-1 items-center">
                  <CalendarClock size={14} className="text-indigo-500" />
                  <h2>{userData.dob ? String(userData.dob).split("T")[0] : "N/A"}</h2>
                </div>
                <div className="w-[45%] flex gap-1 items-center truncate" title={userData.email}>
                  <Mail size={14} className="text-blue-500 shrink-0" />
                  <h2 className="truncate">{userData.email}</h2>
                </div>
                <div className="w-[45%] flex gap-1 items-center">
                  <Phone size={14} className="text-green-500" />
                  <h2>{userData.phone || "N/A"}</h2>
                </div>

                {isAdmin && (
                  <>
                    <div className="w-[45%] bg-purple-100 hover:bg-purple-200 rounded-sm p-1 flex gap-1 items-center cursor-pointer">
                      <UpdateTeacher data={userData} />
                      <span className="text-xs font-medium text-purple-800">Edit</span>
                    </div>
                    <div className="w-[45%] bg-red-100 hover:bg-red-200 rounded-sm p-1 flex gap-1 items-center cursor-pointer">
                      <DeleteTeacher data={userData} />
                      <span className="text-xs font-medium text-red-800">Delete</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div id="box-container" className="h-full w-full lg:w-1/2 rounded-md flex flex-wrap justify-between gap-2 py-2">
            <div className="bg-white flex-1 min-w-[45%] p-4 flex gap-3 items-center rounded-md shadow-sm border border-slate-100">
              <Image src="/singleAttendance.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-bold">95%</h1>
                <span className="text-xs text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white flex-1 min-w-[45%] p-4 flex gap-3 items-center rounded-md shadow-sm border border-slate-100">
              <Image src="/singleBranch.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-bold">Faculty</h1>
                <span className="text-xs text-gray-400">Department</span>
              </div>
            </div>
            <div className="bg-white flex-1 min-w-[45%] p-4 flex gap-3 items-center rounded-md shadow-sm border border-slate-100">
              <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-bold">18</h1>
                <span className="text-xs text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white flex-1 min-w-[45%] p-4 flex gap-3 items-center rounded-md shadow-sm border border-slate-100">
              <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-bold">6A, 2B</h1>
                <span className="text-xs text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>

        <div id="big-calender" className="w-full h-[65%] bg-white overflow-hidden rounded-md p-3 shadow-sm border border-slate-100 mt-2">
          <header className="font-bold text-xl mb-2 text-slate-800">
            <h1>Teacher Schedule</h1>
          </header>
          <div id="calender-container" className="w-full h-full">
            <CalendarBig />
          </div>
        </div>
      </div>

      {/* right */}
      <div id="right" className="h-full w-full lg:h-screen xl:h-full xl:w-1/3 px-2 mt-2">
        <div className="h-full lg:h-[35%] xl:h-[45%] w-full flex flex-col gap-2">
          <div id="shortcuts" className="w-full bg-white p-3 rounded-lg shadow-sm border border-slate-100">
            <header className="mb-2">
              <h1 className="font-bold text-base text-slate-800">Quick Navigation</h1>
            </header>
            <div className="flex flex-wrap gap-2">
              {shortcuts.map((item, id) => (
                <button
                  key={id}
                  onClick={() => router.push(item.url)}
                  className={`${item.bgcolor} text-xs font-semibold text-slate-800 py-1.5 px-3 rounded-md hover:opacity-80 transition-opacity`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div id="chart-container" className="w-full bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex-1">
            <header className="mb-1">
              <h1 className="font-bold text-base text-slate-800">Attendance Overview</h1>
            </header>
            <div id="chart-wrapper" className="w-full h-44">
              <ChartBar />
            </div>
          </div>
        </div>

        <div id="announcement" className="w-full h-[40vh] xl:h-[48%] mt-3 p-3 bg-white rounded-lg shadow-sm border border-slate-100">
          <Announcements />
        </div>
      </div>
    </div>
  );
}
