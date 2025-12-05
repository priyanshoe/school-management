"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AdminRadarChart } from "@/app/database/data"

const chartConfig = {
  admissions: {
    label: "Admissions",
    color: "var(--chart-1)",
  },
  withdrawals: {
    label: "Withdrawals",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartRadar() {
  return (
        <ChartContainer
          config={chartConfig}
          className="h-6/7 min-h-60 w-full"
        >
          <RadarChart data={AdminRadarChart}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="admissions"
              fill="var(--color-admissions)"
              fillOpacity={0.6}
            />
            <Radar dataKey="withdrawals"
            fill="var(--color-withdrawals)"
             />
              <ChartLegend className="" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
  )
}
