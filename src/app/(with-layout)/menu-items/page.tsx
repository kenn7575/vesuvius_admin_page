export const dynamic = "force-dynamic";
import Link from "next/link";

import { File, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Tablist } from "../menu-genstande/Tablist";
import { MenuItemTable } from "../menu-genstande/table";

export default async function Dashboard(props: {
  searchParams?: Promise<{
    filter: string;
    page: number;
    perPage: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const filter = searchParams?.filter || "All";
  const page = searchParams?.page || "1";
  const perPage = searchParams?.perPage || "10";

  return (
    <Tabs defaultValue="all" className="pr-2 mb-2 ">
      <div className="flex items-center sticky top-16 bg-background z-40 pb-2">
        <Tablist />

        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-7 gap-1" asChild>
            <Link href="/menu-items/opret">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <MenuItemTable
          filter={filter}
          page={Number(page)}
          perPage={Number(perPage)}
        />
      </TabsContent>
      <TabsContent value="active">
        <MenuItemTable
          filter={filter}
          page={Number(page)}
          perPage={Number(perPage)}
        />
      </TabsContent>
      <TabsContent value="inactive">
        <MenuItemTable
          filter={filter}
          page={Number(page)}
          perPage={Number(perPage)}
        />
      </TabsContent>
    </Tabs>
  );
}
