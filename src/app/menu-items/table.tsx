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
              menuItems.map((item, index) => (
                <TableRow>
                  <TableCell>
                    <div className="relative">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover min-w-16"
                        height="64"
                        src={`/img/${item.image_path}`}
                        width="64"
                      />
                    </div>
                  </TableCell>
                  {filter !== "active" && filter !== "inactive" && (
                    <TableHead>
                      {item.is_active ? (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                      )}
                    </TableHead>
                  )}
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("da-DK", {
                      style: "currency",
                      currency: "DKK",
                      maximumFractionDigits: 0,
                    }).format((item.price_in_oere ?? 0) / 100)}
                  </TableCell>
                  <TableCell>
                    {item.is_sold_out ? (
                      <Badge variant="destructive">Udsolgt</Badge>
                    ) : (
                      <Badge variant="default">Tilgængelig</Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-32 hidden md:table-cell">
                    <p className="line-clamp-3">{item.description}</p>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    {new Date(item.created_at)
                      .toLocaleDateString("da-DK")
                      .replaceAll(".", "/")}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(item.updated_at)
                      .toLocaleDateString("da-DK")
                      .replaceAll(".", "/")}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {item.type}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {item.comment ? item.comment : "Ingen"}
                  </TableCell>
                  <TableCell className="hidden 2xl:table-cell">
                    {item.is_lacking_ingredient ? (
                      <Badge variant="destructive">Ja</Badge>
                    ) : (
                      <Badge variant="default">Nej</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
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
