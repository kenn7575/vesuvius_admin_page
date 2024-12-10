export const dynamic = "force-dynamic";

import DataPage from "./DataPage";
import { Suspense } from "react";
import { subDays } from "date-fns";
import { DatePickerWithRange } from "./RangePicker";

export default async function Page(props: {
  searchParams?: Promise<{
    from?: string;
    to?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const from = new Date(searchParams?.from || subDays(new Date(), 30));
  const to = new Date(searchParams?.to || new Date());

  // format the dates to match the API
  // YYYY-MM-DD
  const fromFormatted = from?.toISOString().split("T")[0];

  const toFormatted = to?.toISOString().split("T")[0];
  if (!from || !to) return;
  return (
    <div
      suppressHydrationWarning={true}
      className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8"
    >
      <DatePickerWithRange />
      <Suspense key={from.toString() + to.toString()} fallback={<p>loading</p>}>
        <DataPage from={fromFormatted} to={toFormatted} />
      </Suspense>
    </div>
  );
}
