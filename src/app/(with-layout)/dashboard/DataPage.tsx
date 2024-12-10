import Link from "next/link";
import { Activity, ArrowUpRight, CreditCard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Revenue } from "./cards/Revenue";
import { OrderCount } from "./cards/OrderCount";
import { OrderItemCount } from "./cards/OrderItemCount";
import { RevenueDiff } from "./cards/RevenueDiff";
import { TopMenuItems } from "./tables/topMenuItems";
import { RevenueChartContainer } from "./charts/RevenueChartContainer";
import { cookies } from "next/headers";

export default async function DataPage({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Revenue from={from} to={to} />
        <RevenueDiff from={from} to={to} />
        <OrderCount from={from} to={to} />
        <OrderItemCount from={from} to={to} />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <RevenueChartContainer from={from} to={to} />
        <TopMenuItems from={from} to={to} />
      </div>
    </>
  );
}
