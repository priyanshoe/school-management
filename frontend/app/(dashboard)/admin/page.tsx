import { ChartBarMultiple } from "./charts/bar-chart"
import { ChartLineMultiple } from "./charts/line-chart"
import { ChartPieDonutText } from "./charts/pie-chart"
import { ChartRadarLegend } from "./charts/radar-chart"

export default function Admin() {

  const items = [
    {
      date: "24/08/2026",
      total: 2,
      role: "admin"

    },
    {
      date: "24/08/2026",
      total: 30,
      role: "Teachers"
    },
    {
      date: "24/08/2026",
      total: 500,
      role: "students"
    },
    {
      date: "24/08/2026",
      total: 357,
      role: "parentes"
    },
  ]

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-600">

      <div id="left" className="h-full w-full md:w-2/3">

        <div id="count-container" className="min-h-1/7 flex flex-wrap items-center gap-4 px-4 py-2">
          {
            items.map((item, id) => (
              <div id="count-box" key={id} className="text-black flex-1 rounded-xl px-4 py-2 odd:bg-[#CECBFC] even:bg-[#F7E681]">
                <h3 className="text-xs bg-white text-blue-600 mb-2 rounded-full px-2 py-1 text-center w-fit">{item.date}</h3>
                <h1 className="text-xl font-bold">{item.total}</h1>
                <span className="text-sm capitalize">{item.role}</span>
              </div>
            ))
          }
        </div>

        <div id="chart-container" className="w-full h-6/7 text-black">

          <div id="chart-column-1" className="w-full md:h-1/2  flex flex-wrap flex-col md:flex-row py-2 px-4 gap-4 ">
            <div id="char-1" className="w-full lg:w-[35%] h-full rounded-xl bg-[#ffffff]">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Total Crew</h1>
              </header>
              <ChartPieDonutText />
            </div>
            <div id="char-2" className="w-full lg:w-[60%] h-full bg-[#ffffff]  rounded-xl">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Attendence</h1>
                <h3 className="text-sm">Students</h3>
              </header>
              <ChartBarMultiple />
            </div>
          </div>

          <div id="chart-column-2" className="w-full h-1/2 flex flex-wrap flex-col md:flex-row py-2 px-4 gap-4 ">
            <div id="chart-3" className="h-full w-full lg:w-[60%] bg-[#ffffff]  rounded-xl">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Finance</h1>
                <h3 className="text-sm">Expensse & Profit</h3>
              </header>
            <ChartLineMultiple/>

            </div>
            <div id="chart-4" className="h-full w-full lg:w-[35%] bg-[#ffffff]  rounded-xl">
              <header className="h-1/7 px-4 py-1">
                <h1 className="font-bold text-lg">Finance</h1>
                <h3 className="text-sm">Last 6 months</h3>
              </header>
              <ChartRadarLegend />
            </div>

          </div>

        </div>
      </div>


      <div id="right" className="h-screen w-full md:w-1/3 bg-red-800">
      </div>

    </div>
  )
}