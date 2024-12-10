import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { ArrowUpRight } from "lucide-react";
import { RevenueChart } from "./RevenueChartD";
import { RevenueChartDataWithMeta } from "../types";
import { config } from "@/app/config";

export async function RevenueChartContainer({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  let chartData: RevenueChartDataWithMeta | undefined;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    `${config.backendUrl}/analytics/revenue_chart?from=${from}&to=${to}`,
    {
      headers: {
        authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    console.log("🚀 ~ RevenueCharts ~ data:", data);
    chartData = data;
  } else {
    console.error("Failed to fetch revenue chart data", res);
  }

  return (
    <Card
      className="xl:col-span-2"
      x-chunk="A card showing a table of recent transactions with a link to view all transactions."
    >
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {chartData && <RevenueChart chartData={chartData} />}
      </CardContent>
    </Card>
  );
}
