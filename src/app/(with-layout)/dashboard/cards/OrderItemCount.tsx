import { config } from "@/app/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { cookies } from "next/headers";

export async function OrderItemCount({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  let totalItemCount: number | undefined;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    `${config.backendUrl}/analytics/order_item_count?from=${from}&to=${to}`,
    {
      headers: {
        authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (res.ok) {
    const data = (await res.json()) as number;
    console.log("🚀 ~ Order item count ~ data:", data);
    totalItemCount = data;
  }

  return (
    <Card x-chunk="A card showing the total revenue in USD and the percentage difference from last month.">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ordre genstande</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("da", {
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(totalItemCount ?? 0)}
        </div>
        <p className="text-xs text-muted-foreground">
          Antal af retter og drikkevare solgt i perioden.
        </p>
      </CardContent>
    </Card>
  );
}
