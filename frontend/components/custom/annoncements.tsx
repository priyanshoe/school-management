import { announcements } from "@/database/data";

export default function Announcements() {
    return (
        <>
            <header className="w-full h-1/10">
                <h1 className="text-lg font-bold">Announcements</h1>
            </header>
            <div id="announcement-wrapper" className="h-9/10 overflow-y-scroll scrollbar-hide ">
                {
                    announcements.map((item, id) => (
                        <div id="announcement-container" key={id} className={`w-full px-4 py-2 mt-2 border-t rounded-tl-lg border-l-2 bg-[#ffffff]
                  ${item.priority === 'high' ? 'border-red-500' :
                                item.priority === 'medium' ? 'border-yellow-500' :
                                    'border-green-500'} `}>
                            <header className="w-full flex gap-2 justify-between items-center">
                                <h1 className="font-semibold capitalize">{item.title}</h1>
                                <h3>{item.time}</h3>
                            </header>
                            <div className="flex justify-between gap-4 items-top text-gray-600 text-xs">
                                <span className="w-4/5">{item.desc}</span>
                                <h3 className="text-sm">{item.date}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}