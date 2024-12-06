"use client";
import { subDays } from "date-fns";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { DateRange } from "react-day-picker";
const defaultDateRange: DateRange = {
  from: new Date(),
  to: new Date(),
};
interface DateRangeContextType {
  dateRange: DateRange;
  updateDateRange: (newDateRange: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);
export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the date range
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const updateDateRange = useCallback((newDateRange: DateRange) => {
    setDateRange(newDateRange);
  }, []);

  return (
    <DateRangeContext.Provider value={{ dateRange, updateDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};

// Custom hook to use DateRangeContext
export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};
