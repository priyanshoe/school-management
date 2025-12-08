import CalendarBig from "@/components/app-big-calendar";
import Events from "@/components/custom/events";

const children = ['Jhon', 'Rechal','Putin']

export default function Parent() {
  return (
    <div className="flex flex-col lg:flex-row gap-2 h-auto w-full text-black px-2">
      {/* left */}
      <div id="left" className="w-full lg:w-2/3 h-full flex flex-col justify-start gap-4  text-black rounded-lg p-2">
      {
        children.map((item,id)=>(
          <div id="bigCalender-container" key={id} className="w-full h-auto lg:h-[80vh] bg-white  rounded-lg p-2 ">
          <header className="font-bold text-2xl lg:h-1/20 px-2 ">
            <h1>Schedule ({item})</h1>
          </header>
          <div id="calender-container" className="lg:h-19/20 w-full">
            <CalendarBig />
          </div>
      </div>
        ))
      }
      </div>
      {/* right */}
      <div id="right" className="w-full h-[60vh] lg:w-1/3 lg:pr-2">
        <div id="events" className="w-full h-full bg-white mt-2  px-4  rounded-lg">
          <Events />
        </div>
      </div>

    </div>
  )
}