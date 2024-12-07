import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { cookies } from "next/headers";

export async function Revenue({ from, to }: { from: string; to: string }) {
  let revenue: number | undefined;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    `http://localhost:5005/analytics/revenue?from=${from}&to=${to}`,
    {
      headers: {
        authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (res.ok) {
    const data = (await res.json()) as number;
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
