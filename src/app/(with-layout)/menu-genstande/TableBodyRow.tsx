"use client";
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
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { MenuItem } from "./types";
import Link from "next/link";

export function TableBodyRow({
  filter,
  item,
}: {
  filter?: string;
  item: MenuItem;
}) {
  const router = useRouter();
  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => {
        router.push(`/menu-genstande/${item.id}`);
      }}
    >
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
      <TableCell className="hidden xl:table-cell">{item.type}</TableCell>
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
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                onClick={(e) => e.stopPropagation()}
                href={`/menu-genstande/${item.id}/edit`}
              >
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
