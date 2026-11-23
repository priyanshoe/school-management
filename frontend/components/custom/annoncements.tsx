"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { announcements as defaultAnnouncements } from "@/database/data";

export default function Announcements() {
  const [data, setData] = useState(defaultAnnouncements);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/announcement`, { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        // Fallback to defaults
      });
  }, []);

  return (
    <>
      <header className="w-full h-1/10 flex items-center justify-between pt-2">
        <h1 className="text-lg font-bold text-slate-800">Announcements</h1>
      </header>
      <div id="announcement-wrapper" className="h-9/10 overflow-y-auto scrollbar-hide pb-2">
        {data.map((item: any, id: number) => (
          <div
            id="announcement-container"
            key={id}
            className={`w-full px-4 py-2 mt-2 border-t rounded-tl-lg border-l-4 bg-[#ffffff] shadow-sm ${
              item.priority === "high"
                ? "border-red-500"
                : item.priority === "medium"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <header className="w-full flex gap-2 justify-between items-center">
              <h1 className="font-semibold capitalize text-slate-800 text-sm">{item.title}</h1>
              <h3 className="text-xs text-slate-500">{item.time || item.class || "All Day"}</h3>
            </header>
            <div className="flex justify-between gap-4 items-top text-gray-600 text-xs mt-1">
              <span className="w-4/5 leading-relaxed">{item.desc}</span>
              <h3 className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{item.date}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
