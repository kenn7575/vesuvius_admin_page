"use client";

import { DateRangeProvider } from "./DateRangeProvider";
import DataPage from "./DataPage";

export default function Page() {
  return (
    <DateRangeProvider>
      <DataPage />
    </DateRangeProvider>
  );
}
