import { TableBodyRow } from "./TableBodyRow";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { MenuItem, MenuItemData, MenuItemMetaData } from "./types";
import { TablePagination } from "./TablePagination";
import Link from "next/link";

export async function MenuItemTable({
  filter,
  page,
  perPage,
}: {
  filter?: string;
  page?: number;
  perPage?: number;
}) {
  let menuItems: MenuItem[] = [];
  let metaData: MenuItemMetaData | undefined;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(
    `http://localhost:5005/menu_items/admin?filter=${filter?.toLocaleLowerCase()}&page=${page}&perPage=${perPage}`,
    {
      headers: {
        authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (res.ok) {
    const data = (await res.json()) as MenuItemData;
    console.log("🚀 ~ Menu items~ data:", data.items[0]);

    menuItems = data.items;
    metaData = data.meta;
  }

  return (
    <Card
      className="overflow-hidden"
      x-chunk="A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
    >
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <span className="sr-only">Image</span>
              </TableHead>
              {filter !== "active" && filter !== "inactive" && (
                <TableHead>Aktiv?</TableHead>
              )}
              <TableHead>Navn</TableHead>
              <TableHead>Pris</TableHead>
              <TableHead>Udsolgt</TableHead>
              <TableHead className="hidden md:table-cell">
                Beskrivelse
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                Oprettet den
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                Opdateret den
              </TableHead>
              <TableHead className="hidden xl:table-cell">Type</TableHead>
              <TableHead className="hidden xl:table-cell">Kommentar</TableHead>
              <TableHead className="hidden 2xl:table-cell">
                Mangler ingredienser
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {menuItems.length > 0 &&
              menuItems.map((item) => (
                <TableBodyRow
                  key={item.id}
                  filter={filter}
                  item={item}
                ></TableBodyRow>
              ))}
          </TableBody>
        </Table>
        {menuItems.length === 0 && (
          <p className="justify-center flex p-8 text-lg font-semibold">
            Der ingen produkter at vise med denne filtrering.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-row items-center">
        {metaData && (
          <div className="text-xs text-muted-foreground min-w-24">
            Showing{" "}
            <strong>
              {metaData.page * metaData.perPage - metaData.perPage + 1} -{" "}
              {Math.min(metaData.page * metaData.perPage, metaData.total)}
            </strong>{" "}
            of <strong>{metaData.total}</strong>
            products
          </div>
        )}
        {metaData && <TablePagination metaData={metaData} />}
        <div className="min-w-24" />
      </CardFooter>
    </Card>
  );
}
