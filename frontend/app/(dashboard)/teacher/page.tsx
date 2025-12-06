import CalendarBig from "@/components/app-big-calendar";
import Announcements from "@/components/custom/annoncements";
import Events from "@/components/custom/events";

export default function Teacher() {
  return (
    <div className="flex flex-col lg:flex-row gap-2 h-screen w-full text-black px-2">
      {/* left */}
      <div id="left" className="w-full lg:w-2/3 h-full bg-white text-black rounded-lg p-2">
        <header className="font-bold text-2xl lg:h-1/20 px-2 ">
          <h1>Schedule</h1>
        </header>
        <div id="calender-container" className="lg:h-19/20 w-full">
          <CalendarBig />
        </div>
      </div>
      {/* right */}
      <div id="right" className="w-full lg:w-1/3 h-full lg:pr-2">
        <div id="announcement" className="w-full h-1/2  px-4  bg-white rounded-lg lg:rounded-bl-none">
          <Announcements />
        </div>
        <div id="events" className="w-full h-1/2 bg-white mt-2  px-4  rounded-lg lg:rounded-tl-none">
          <Events />
        </div>
      </div>

    </div>
  )
}