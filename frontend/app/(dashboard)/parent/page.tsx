"use client";

import CalendarBig from "@/components/app-big-calendar";
import Events from "@/components/custom/events";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Parent() {
  const { user } = useAuth();
  const [childrenList, setChildrenList] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/parent/${user.id}`, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.data) {
          const namesStr = res.data.data.student_names;
          if (namesStr) {
            setChildrenList(namesStr.split(",").map((s: string) => s.trim()));
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load children:", err);
      });
  }, [user]);

  const activeChildren = childrenList.length > 0 ? childrenList : ["Sarah Brewer"];

  return (
    <div className="flex flex-col lg:flex-row gap-2 h-auto w-full text-black px-2 pb-6">
      {/* left */}
      <div id="left" className="w-full lg:w-2/3 h-full flex flex-col justify-start gap-4 text-black rounded-lg p-2">
        {activeChildren.map((item, id) => (
          <div id="bigCalender-container" key={id} className="w-full h-auto lg:h-[80vh] bg-white rounded-lg p-3 shadow-sm">
            <header className="font-bold text-2xl lg:h-1/20 px-2 pb-2 border-b border-slate-100 mb-2">
              <h1>Schedule ({item})</h1>
            </header>
            <div id="calender-container" className="lg:h-19/20 w-full">
              <CalendarBig />
            </div>
          </div>
        ))}
      </div>
      {/* right */}
      <div id="right" className="w-full h-[60vh] lg:w-1/3 lg:pr-2 pt-2">
        <div id="events" className="w-full h-full bg-white px-4 rounded-lg shadow-sm">
          <Events />
        </div>
      </div>
    </div>
  );
}
