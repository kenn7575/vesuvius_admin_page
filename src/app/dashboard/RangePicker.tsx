"use client";
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
import {
  datesOfLastQuarter,
  datesOfLastYear,
  daysSinceLastQuarter,
  daysSinceLastYear,
  daysSinceMonthStart,
  daysSinceWeekStart,
} from "@/lib/dateUtils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  // const { updateDateRange, dateRange } = useDateRange();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(dates: DateRange) {
    const params = new URLSearchParams(searchParams);
    if (dates.from && dates.to) {
      params.set("from", dates.from.toISOString());
      params.set("to", dates.to.toISOString());
    } else {
      params.delete("from");
      params.delete("to");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  let dateRange = {
    from: new Date(searchParams.get("from") || subDays(new Date(), 30)),
    to: new Date(searchParams.get("to") || new Date()),
  };

  return (
    <div
      suppressHydrationWarning={true}
      className={cn("grid gap-2", className)}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Select
            onValueChange={(value) => {
              console.log("🚀 ~ value:", value);
              const dates = JSON.parse(value) as { from: Date; to: Date };
              console.log("🚀 ~ dates:", dates);
              handleSearch(dates);
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
              handleSearch({ from: new Date(), to: new Date() });
            }}
          >
            Nulstil
          </Button>
          <Calendar
            weekStartsOn={1}
            initialFocus
            mode="range"
            // defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(e) => {
              if (e) {
                handleSearch(e);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
