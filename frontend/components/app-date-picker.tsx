"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date || isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function toISODate(date: Date | undefined): string {
  if (!date || isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface DatePickerProps {
  value?: string;
  onChange?: (dateStr: string) => void;
  date?: string;
  label?: string;
}

export function DatePicker({ value: propValue, onChange, date: legacyDate, label }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const initialDateStr = propValue || legacyDate || "2000-01-01";
  const [date, setDate] = React.useState<Date | undefined>(() => {
    const d = new Date(initialDateStr);
    return isValidDate(d) ? d : new Date();
  });
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [textValue, setTextValue] = React.useState(formatDate(date));

  React.useEffect(() => {
    if (propValue) {
      const d = new Date(propValue);
      if (isValidDate(d)) {
        setDate(d);
        setMonth(d);
        setTextValue(formatDate(d));
      }
    }
  }, [propValue]);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && isValidDate(selectedDate)) {
      setTextValue(formatDate(selectedDate));
      if (onChange) {
        onChange(toISODate(selectedDate));
      }
    }
    setOpen(false);
  };

  return (
    <div className="text-black flex flex-col gap-2 w-full">
      <Label htmlFor="date" className="px-1 text-black">
        {label || "Date of Birth"}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={textValue}
          placeholder="June 01, 2000"
          className="bg-white font-semibold text-xs pr-10"
          onChange={(e) => {
            const raw = e.target.value;
            setTextValue(raw);
            const d = new Date(raw);
            if (isValidDate(d)) {
              setDate(d);
              setMonth(d);
              if (onChange) {
                onChange(toISODate(d));
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              type="button"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 bg-white"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelectDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
