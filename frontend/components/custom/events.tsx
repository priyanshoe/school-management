"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { events as defaultEvents } from "@/database/data";

export default function Events() {
  const [data, setData] = useState(defaultEvents);
  const bgcolor = ["bg-red-50", "bg-blue-50", "bg-green-50", "bg-yellow-50", "bg-purple-50"];

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";
    axios
      .get(`${apiUrl}/event`, { withCredentials: true })
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
        <h1 className="text-lg font-bold text-slate-800">Events</h1>
      </header>
      <div id="events-wrapper" className="h-9/10 overflow-y-auto scrollbar-hide pb-2">
        {data.map((item: any, id: number) => (
          <div
            id="events-container"
            key={id}
            className={`w-full px-4 py-2 mt-2 rounded-md shadow-sm border border-slate-100 ${
              bgcolor[id % bgcolor.length]
            }`}
          >
            <header className="w-full flex gap-2 justify-between items-center">
              <h1 className="font-semibold capitalize text-sm text-slate-800">{item.title}</h1>
              <h3 className="text-xs text-slate-500 font-medium">{item.date}</h3>
            </header>
            <div className="w-full mt-1">
              <span className="text-gray-600 text-xs leading-relaxed">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
