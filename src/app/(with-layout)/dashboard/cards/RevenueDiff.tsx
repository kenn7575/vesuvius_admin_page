import { config } from "@/app/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { cookies } from "next/headers";

export async function RevenueDiff({ from, to }: { from: string; to: string }) {
  let thisRange: number | undefined;
  let lastRange: number | undefined;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    `${config.backendUrl}/analytics/revenue_diff?from=${from}&to=${to}`,
    {
      headers: {
        authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    console.log("🚀 ~ Revenue diff ~ data:", data);
    thisRange = data.thisRange;
    lastRange = data.lastRange;
  }

  return (
    <Card x-chunk="A card showing the total revenue in USD and the percentage difference from last month.">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Omsætnings tendens
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {/* Calculate percentage difference between range numbers */}
          {thisRange && lastRange ? (
            <>
              {thisRange > lastRange ? "▲" : "▼"}
              {Math.abs(((thisRange - lastRange) / lastRange) * 100).toFixed(2)}
              %
            </>
          ) : (
            new Intl.NumberFormat("da-DK", {
              style: "currency",
              currency: "DKK",
              maximumFractionDigits: 0,
            }).format((thisRange ?? 0) / 100)
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          I forhold til sidste periode.
        </p>
      </CardContent>
    </Card>
  );
}
