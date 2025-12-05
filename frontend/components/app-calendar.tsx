"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarSmall() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (

    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    //   numberOfMonths={2}
      className="rounded-md border w-full h-full bg-white text-black shadow-sm"
      captionLayout="dropdown"
      />
  )
}
