"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AdminPieChart } from "@/database/data"

const chartConfig = {

  female:{
    label:"Female",
    color: "var(--chart-1)",
  },
  male: {
    label: "Male",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartPieMultiple() {
  return (
    
        <ChartContainer config={chartConfig} 
          className="h-6/7 min-h-60 w-full">
          <BarChart accessibilityLayer data={AdminPieChart}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="role"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              dataKey=""
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="male"
              stackId="a"
              fill="var(--color-male)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="female"
              stackId="a"
              fill="var(--color-female)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
  )
}
