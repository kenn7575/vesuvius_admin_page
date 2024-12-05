"use client";

import { useEffect, useState } from "react";
import { addDays, format, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
  onDateUpdate,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>;
  onDateUpdate: (dates: DateRange | undefined) => void;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  useEffect(() => {
    onDateUpdate(date);
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Select
            onValueChange={(value) => {
              const dates = JSON.parse(value) as { from: Date; to: Date };
              setDate({
                from: dates.from,
                to: dates.to,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem
                value={JSON.stringify({
                  from: daysSinceWeekStart(new Date()),
                  to: new Date(),
                })}
              >
                Denne uge
              </SelectItem>
              <SelectItem
                value={JSON.stringify({
                  from: daysSinceMonthStart(new Date()),
                  to: new Date(),
                })}
              >
                Denne måned
              </SelectItem>
              <SelectItem
                value={JSON.stringify({
                  from: subDays(new Date(), 30),
                  to: new Date(),
                })}
              >
                Sidste 30 date
              </SelectItem>
              <SelectItem
                value={JSON.stringify({
                  from: daysSinceLastQuarter(new Date()),
                  to: new Date(),
                })}
              >
                Dette kvatal
              </SelectItem>
              <SelectItem
                value={JSON.stringify({
                  from: datesOfLastQuarter()[0],
                  to: datesOfLastQuarter()[1],
                })}
              >
                Sidste kvatal
              </SelectItem>
              <SelectItem
                value={JSON.stringify({
                  from: daysSinceLastYear(new Date()),
                  to: new Date(),
                })}
              >
                I år
              </SelectItem>
              <SelectItem
                value={JSON.stringify({
                  from: datesOfLastYear()[0],
                  to: datesOfLastYear()[1],
                })}
              >
                Sidste år
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setDate({ from: new Date(), to: new Date() });
            }}
          >
            Nulstil
          </Button>
          <Calendar
            weekStartsOn={1}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => {
              setDate(e);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function daysSinceMonthStart(date: Date): Date {
  const test = new Date(date.getFullYear(), date.getMonth(), 1);

  return test;
}
function daysSinceWeekStart(date: Date): Date {
  //monday is the first day of the week
  // return date

  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}
function daysSinceLastYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}
function daysSinceLastQuarter(date: Date): Date {
  // return the first day of the current quarter
  const quarter = Math.floor(date.getMonth() / 3);
  const firstDayOfQuarter = new Date(date.getFullYear(), quarter * 3, 1);
  return firstDayOfQuarter;
}
function datesOfLastQuarter(): Date[] {
  const date = new Date();
  // return the first day of the last quarter and the last day of the last quarter
  const quarter = Math.floor(date.getMonth() / 3) - 1;
  const firstDayOfLastQuarter = new Date(date.getFullYear(), quarter * 3, 1);
  const lastDayOfLastQuarter = new Date(date.getFullYear(), quarter * 3 + 3, 0);
  return [firstDayOfLastQuarter, lastDayOfLastQuarter];
}
function datesOfLastYear(): Date[] {
  const date = new Date();
  // return the first day of the last year and the last day of the last year
  const firstDayOfLastYear = new Date(date.getFullYear() - 1, 0, 1);
  const lastDayOfLastYear = new Date(date.getFullYear(), 0, 0);
  return [firstDayOfLastYear, lastDayOfLastYear];
}
