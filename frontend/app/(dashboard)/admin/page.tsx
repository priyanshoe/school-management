import { communityCount } from "@/app/database/data"
import { ChartBarMultiple } from "./charts/bar-chart"
import { ChartLineMultiple } from "./charts/line-chart"
import { ChartPieMultiple } from "./charts/pie-chart"
import { ChartRadar } from "./charts/radar-chart"
import { CalendarSmall } from "@/components/app-calendar"


export default function Admin() {

  const announcements = [
    {
      title: "School Assembly",
      desc: "Mandatory assembly for all students in the main hall",
      date: "2024-01-15",
      time: "9:00 - 10:00",
      priority: "high"
    },
    {
      title: "Math Exam Results",
      desc: "Mid-term math exam results will be announced today",
      date: "2024-01-15",
      time: "11:00 - 12:00",
      priority: "medium"
    },
    {
      title: "Sports Day Practice",
      desc: "All sports teams meet for practice at the ground",
      date: "2024-01-16",
      time: "2:00 - 3:30",
      priority: "low"
    },
    {
      title: "Parent-Teacher Meeting",
      desc: "Schedule a meeting with your child's teacher",
      date: "2024-01-17",
      time: "4:00 - 5:00",
      priority: "high"
    },
    {
      title: "Library Closure",
      desc: "Library will be closed for maintenance tomorrow",
      date: "2024-01-18",
      time: "All Day",
      priority: "low"
    },
    {
      title: "Science Fair Registration",
      desc: "Final day to register for the annual science fair",
      date: "2024-01-19",
      time: "10:00 - 2:00",
      priority: "high"
    },
    {
      title: "Holiday Notice",
      desc: "School will remain closed for national holiday",
      date: "2024-01-22",
      time: "All Week",
      priority: "medium"
    }
  ]

  const events = [
    {
      title: "Annual Sports Day",
      desc: "Inter-house sports competition with various events",
      date: "2024-01-25"
    },
    {
      title: "Graduation Ceremony",
      desc: "Class 12 students graduation and awards distribution",
      date: "2024-02-10"
    },
    {
      title: "Field Trip - Science Museum",
      desc: "Educational visit for science students to the museum",
      date: "2024-02-14"
    },
    {
      title: "Annual Cultural Fest",
      desc: "Showcase of student talents in music, dance, and drama",
      date: "2024-03-01"
    },
    {
      title: "Debate Competition",
      desc: "Inter-school debate championship on current topics",
      date: "2024-03-05"
    },
    {
      title: "Science Exhibition",
      desc: "Student projects and innovations on display",
      date: "2024-03-12"
    },
    {
      title: "Teacher Appreciation Day",
      desc: "Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers",
      date: "2024-03-15"
    }
  ]

  const bgcolor = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100']

  return (
    <div className="w-full h-full lg:h-screen flex flex-col lg:flex-row  text-black">

      <div id="left" className="h-full md:h-screen w-full lg:w-2/3">

        <div id="count-container" className="min-h-1/7 flex flex-wrap items-center gap-4 px-4 py-2">
          {
            communityCount.map((item, id) => (
              <div id="count-box" key={id} className="min-w-30 text-black flex-1 rounded-xl px-4 py-2 odd:bg-[#CECBFC] even:bg-[#F7E681]">
                <h3 className="text-xs bg-white text-blue-600 mb-2 rounded-full px-2 py-1 text-center w-fit">{item.date}</h3>
                <h1 className="text-xl font-bold">{item.total}</h1>
                <span className="text-sm capitalize">{item.role}</span>
              </div>
            ))
          }
        </div>

        <div id="chart-container" className="w-full h-6/7 text-black">

          <div id="chart-column-1" className="w-full h-full md:h-1/2  flex flex-wrap flex-col md:flex-row justify-center p-2 gap-2 ">
            <div id="char-1" className="w-full md:w-[33%] h-full̆̆ rounded-xl bg-[#ffffff]">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Gender</h1>
              </header>
              <ChartPieMultiple />
            </div>
            <div id="char-2" className="w-full md:w-[64%] h-full bg-[#ffffff]  rounded-xl">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Attendence</h1>
                <h3 className="text-sm">Students</h3>
              </header>
              <ChartBarMultiple />
            </div>
          </div>

          <div id="chart-column-2" className=" w-full h-full md:h-1/2 flex flex-wrap flex-col md:flex-row justify-center p-2 gap-2 ">
            <div id="chart-3" className="h-full w-full md:w-[64%] bg-[#ffffff]  rounded-xl">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Finance</h1>
                <h3 className="text-sm">Expensse & Profit</h3>
              </header>
              <ChartLineMultiple />
            </div>
            <div id="chart-4" className="h-full w-full md:w-[33%] bg-[#ffffff]  rounded-xl">
              <ChartRadar />
            </div>

          </div>

        </div>
      </div>


      <div id="right" className="h-screen w-full lg:w-1/3 pr-2">
        <div id="calendar-messages" className="w-full h-1/3 bg-white rounded-lg rounded-bl-none flex justify-center">
          <div id="calendar" className="h-full w-1/2 bg-amber-200">

          </div>
          <div id="messages" className="h-full w-1/2 hidden bg-blue-200">

          </div>
        </div>
        <div id="announcement" className="w-full h-1/3  px-4  bg-white mt-2 rounded-lg rounded-l-none">
        <header className="w-full h-1/10">
          <h1 className="text-lg font-bold">Announcements</h1>
        </header>
        <div id="announcement-wrapper" className="h-9/10 overflow-y-scroll scrollbar-hide ">
            {
              announcements.map((item, id) => (
                <div id="announcement-container" key={id} className={`w-full px-4 py-2 mt-2 border-t rounded-tl-lg border-l-2 bg-[#ffffff]
                  ${item.priority === 'high' ? 'border-red-500':
                    item.priority === 'medium' ? 'border-yellow-500':
                    'border-green-500'} `}>
                  <header className="w-full flex justify-between items-center">
                    <h1 className="font-semibold capitalize">{item.title}</h1>
                    <h3>{item.time}</h3>
                  </header>
                  <div className="flex justify-between items-top text-gray-600 text-xs">
                    <span className="w-4/5">{item.desc}</span>
                    <h3 className="text-sm">{item.date}</h3>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div id="events" className="w-full h-1/3 bg-white mt-2  px-4  rounded-lg rounded-tl-none">
        <header className="w-full h-1/10 p-2">
          <h1 className="text-lg font-bold">Events</h1>
        </header>
        <div id="events-wrapper" className="h-9/10 overflow-y-scroll scrollbar-hide ">
            {
              events.map((item, id) => (
                <div id="events-container" key={id} className={`w-full px-4 py-2 mt-2 rounded-sm ${bgcolor[id % bgcolor.length]}`}>
                  <header className="w-full flex justify-between items-center">
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

        </div>
      </div>

    </div>
  )
}