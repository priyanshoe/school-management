"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { totalCount as initialCount } from "@/database/data";
import { ChartBarMultiple } from "./charts/bar-chart";
import { ChartLineMultiple } from "./charts/line-chart";
import { ChartPieMultiple } from "./charts/pie-chart";
import { ChartRadar } from "./charts/radar-chart";
import CalendarSmall from "@/components/app-calendar";
import Announcements from "@/components/custom/annoncements";
import Events from "@/components/custom/events";

export default function Admin() {
  const [counts, setCounts] = useState(initialCount);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/stats`, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.data && res.data.data.totalCount) {
          setCounts(res.data.data.totalCount);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch dynamic stats:", err);
      });
  }, []);

  return (
    <div className="w-full h-full lg:h-screen flex flex-col lg:flex-row text-black">
      {/* left */}
      <div id="left" className="h-full md:h-screen w-full lg:w-2/3">
        <div id="count-container" className="min-h-1/7 flex flex-wrap items-center gap-4 px-4 py-2">
          {counts.map((item, id) => (
            <div
              id="count-box"
              key={id}
              className="min-w-30 text-black flex-1 rounded-xl px-4 py-2 odd:bg-[#CECBFC] even:bg-[#F7E681] shadow-sm"
            >
              <h3 className="text-xs bg-white text-blue-600 mb-2 rounded-full px-2 py-1 text-center w-fit font-medium">
                {item.date}
              </h3>
              <h1 className="text-2xl font-bold">{item.total}</h1>
              <span className="text-sm capitalize font-medium text-slate-700">{item.role}</span>
            </div>
          ))}
        </div>

        <div id="chart-container" className="w-full h-6/7 text-black">
          <div id="chart-column-1" className="w-full h-full md:h-1/2 flex flex-wrap flex-col md:flex-row justify-center p-2 gap-2">
            <div id="char-1" className="w-full md:w-[33%] h-full rounded-xl bg-[#ffffff] shadow-sm">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Gender</h1>
              </header>
              <ChartPieMultiple />
            </div>
            <div id="char-2" className="w-full md:w-[64%] h-full bg-[#ffffff] rounded-xl shadow-sm">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Attendance</h1>
                <h3 className="text-sm text-slate-500">Students</h3>
              </header>
              <ChartBarMultiple />
            </div>
          </div>

          <div id="chart-column-2" className="w-full h-full md:h-1/2 flex flex-wrap flex-col md:flex-row justify-center px-2 lg:p-2 gap-2">
            <div id="chart-3" className="h-full w-full md:w-[64%] bg-[#ffffff] rounded-xl shadow-sm">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Finance</h1>
                <h3 className="text-sm text-slate-500">Expense & Profit</h3>
              </header>
              <ChartLineMultiple />
            </div>
            <div id="chart-4" className="h-full w-full md:w-[33%] bg-[#ffffff] rounded-xl shadow-sm">
              <ChartRadar />
            </div>
          </div>
        </div>
      </div>

      {/* right */}
      <div id="right" className="h-screen w-full lg:w-1/3 px-2 lg:pr-2 flex flex-col gap-2 pt-2 lg:pt-4">
        <div id="calendar" className="w-full h-auto max-h-1/3 bg-white rounded-lg shadow-sm">
          <CalendarSmall />
        </div>
        <div id="announcement" className="w-full h-1/3 px-4 bg-white rounded-lg shadow-sm">
          <Announcements />
        </div>
        <div id="events" className="w-full h-1/3 bg-white px-4 rounded-lg shadow-sm">
          <Events />
        </div>
      </div>
    </div>
  );
}
