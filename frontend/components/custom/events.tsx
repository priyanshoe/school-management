import { events } from "@/database/data";

export default function Events() {
    const bgcolor = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100']
    return (
        <>
            <header className="w-full h-1/10">
                <h1 className="text-lg font-bold">Events</h1>
            </header>
            <div id="events-wrapper" className="h-9/10 overflow-y-scroll scrollbar-hide ">
                {
                    events.map((item, id) => (
                        <div id="events-container" key={id} className={`w-full px-4 py-2 mt-2 rounded-sm ${bgcolor[id % bgcolor.length]}`}>
                            <header className="w-full flex gap-2 justify-between items-center">
                                <h1 className="font-semibold capitalize">{item.title}</h1>
                                <h3 className="text-sm">{item.date}</h3>
                            </header>
                            <div className="w-6/7">
                                <span className="text-gray-600 text-xs">{item.desc}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}