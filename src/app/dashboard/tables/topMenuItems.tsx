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
import { cookies } from "next/headers";
import Image from "next/image";
import { TopMenuItemDataPoint } from "../types";

export async function TopMenuItems({ from, to }: { from: string; to: string }) {
  let menuItems: TopMenuItemDataPoint[] | undefined;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    `http://localhost:5005/analytics/top_menu_items?from=${from}&to=${to}`,
    {
      headers: {
        authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    console.log("🚀 ~ Top Menu Items ~ data:", data);
    menuItems = data;
  }

  return (
    <Card x-chunk="A card showing a list of recent sales with customer names and email addresses.">
      <CardHeader>
        <CardTitle>Mest populære genstande</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {menuItems &&
          menuItems.map((item, index) => (
            <div className="flex items-center gap-4" key={item.menuItemId}>
              <Image
                className="hidden h-9 w-9 sm:flex"
                src={"/img/" + item.image_path}
                alt={item.name}
                width={36}
                height={36}
              />

              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.count} solgt
                </p>
              </div>
              <div className="ml-auto font-medium text-xl">{index + 1}#</div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
