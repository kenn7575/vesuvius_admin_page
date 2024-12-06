"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Activity, ArrowUpRight, CreditCard, TrendingUp } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RevenueChart as RevenueChartType } from "./RevenueChartContainer";

export function RevenueChart({ chartData }: { chartData: RevenueChartType }) {
  const chartConfig = {
    revenue: {
      label: "revenue",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData.data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          className=""
          dataKey="period"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-revenue)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-revenue)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="revenue"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-revenue)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
