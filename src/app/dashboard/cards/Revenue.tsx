"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDateRange } from "../DateRangeProvider";
import { authFetch } from "@/lib/authHttpClient";

export function Revenue() {
  const { dateRange } = useDateRange();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // format the dates to match the API
    // YYYY-MM-DD
    const from = dateRange.from?.toISOString().split("T")[0];
    const to = dateRange.to?.toISOString().split("T")[0];
    if (!from || !to) return;

    fetch(`http://localhost:5005/analytics/revenue?from=${from}&to=${to}`, {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3RfbmFtZSI6Iktlbm5pIiwibGFzdF9uYW1lIjoiS29sbGVtb3J0ZW4iLCJwaG9uZV9udW1iZXIiOiI1MzgwNTAyNyIsImVtYWlsIjoia2Vubjc1NzVAZ21haWwuY29tIiwicm9sZV9pZCI6MywiY3JlYXRlZF9hdCI6IjIwMjQtMTEtMTJUMTg6NDA6MTMuNjU1WiIsInVwZGF0ZWRfYXQiOiIxOTcwLTAxLTAxVDE4OjQwOjEzLjY1NVoiLCJpYXQiOjE3MzM0Njk5NjUsImV4cCI6MTczMzQ3MzU2NSwiYXVkIjoicDV5SlQ3TkFhaVorcDFvRVlpdW13UT09OnNGdVdRSy9mbmw3cGJ2VG9hQjJNa3c9PSIsInN1YiI6IjUifQ.T2DBU3MTtH5RovbmlGHvji47i-NqfKJJgkK-hDDaQcY",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [dateRange]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
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
          }).format(data / 100)}
        </div>
        <p className="text-xs text-muted-foreground">
          Salg af mad og drikkelse.
        </p>
      </CardContent>
    </Card>
  );
}
