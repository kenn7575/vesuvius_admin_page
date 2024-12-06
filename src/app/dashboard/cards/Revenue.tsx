import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

import { useDateRange } from "../DateRangeProvider";
import { authFetch } from "@/lib/authHttpClient";
import { subDays } from "date-fns";

export async function Revenue({ from, to }: { from: string; to: string }) {
  console.log("🚀 ~ Revenue ~ { from, to }:", { from, to });
  let revenue: number | undefined;

  const res = await fetch(
    `http://localhost:5005/analytics/revenue?from=${from}&to=${to}`,
    {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3RfbmFtZSI6Iktlbm5pIiwibGFzdF9uYW1lIjoiS29sbGVtb3J0ZW4iLCJwaG9uZV9udW1iZXIiOiI1MzgwNTAyNyIsImVtYWlsIjoia2Vubjc1NzVAZ21haWwuY29tIiwicm9sZV9pZCI6MywiY3JlYXRlZF9hdCI6IjIwMjQtMTEtMTJUMTg6NDA6MTMuNjU1WiIsInVwZGF0ZWRfYXQiOiIxOTcwLTAxLTAxVDE4OjQwOjEzLjY1NVoiLCJpYXQiOjE3MzM0NzI4MzYsImV4cCI6MTczMzQ3NjQzNiwiYXVkIjoiTUJIVEZhWHF2eGYvQmR5UlI4V2FnZz09OllXaGluNXpPVHBiVXZ0VGdBYmhqd1E9PSIsInN1YiI6IjUifQ.3luR1cODPcNJL6dlaBeUdLl_RvATs8eSVSZusBDe4cY",
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    console.log("🚀 ~ Revenue ~ data:", data);
    revenue = data;
  }

  return (
    <Card x-chunk="A card showing the total revenue in USD and the percentage difference from last month.">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Omsætning</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("da-DK", {
            style: "currency",
            currency: "DKK",
            maximumFractionDigits: 0,
          }).format((revenue ?? 0) / 100)}
        </div>
        <p className="text-xs text-muted-foreground">
          Salg af mad og drikkelse.
        </p>
      </CardContent>
    </Card>
  );
}
