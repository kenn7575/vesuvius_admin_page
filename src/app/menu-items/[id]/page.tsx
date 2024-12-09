import { BackButton } from "./BackButton";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MenuItemDetails, MenuItemType } from "../types";
import { cookies } from "next/headers";
import { UpdateMenuActiveButton } from "./UpdateIsActiveButton";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let menuItem: MenuItemDetails | undefined;

  const cookieStore = await cookies();
  const id = (await params).id;
  const accessToken = cookieStore.get("accessToken");

  const menuItemRes = await fetch(
    `http://localhost:5005/menu_items/admin/${id}`,
    {
      headers: {
        authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (menuItemRes.ok) {
    const data = (await menuItemRes.json()) as MenuItemDetails;
    console.log("🚀 ~ data:", data);

    menuItem = data;
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-2">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {menuItem?.menu_item?.name}
          </h1>
          <h2 className="text-xl">ID: {menuItem?.menu_item?.id}</h2>
          {menuItem?.menu_item?.is_sold_out ? (
            <Badge variant="destructive">Udsolgt</Badge>
          ) : (
            <Badge variant="default">På lager</Badge>
          )}
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <UpdateMenuActiveButton
              id={id}
              initialIsActive={menuItem?.menu_item?.is_active}
            ></UpdateMenuActiveButton>

            <Button asChild size="sm">
              <Link href={`/menu-items/${id}/edit`}>Rediger</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 xl:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="A card with a form to edit the product details">
              <CardHeader>
                <CardTitle>Menu Detailjer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Navn</Label>
                    <p className="font-semibold ">
                      {menuItem?.menu_item?.name}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Beskrivelse</Label>

                    <p className="font-semibold ">
                      {menuItem?.menu_item?.description}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price">Pris i kr.</Label>
                    <p className="font-semibold ">
                      {menuItem?.menu_item?.price_in_oere
                        ? menuItem?.menu_item?.price_in_oere / 100
                        : 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card x-chunk="A card with a form to edit the product category and subcategory">
              <CardHeader>
                <CardTitle>Menu kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Kategori</Label>
                    <p className="font-semibold ">
                      {menuItem?.menu_item_type?.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card x-chunk="A card with a form to edit the product details">
              <CardHeader>
                <CardTitle>Lager status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8">
                  <div className="grid gap-3">
                    <Label htmlFor="is_lacking_ingredient">
                      Mangler ingredienser
                    </Label>

                    <p className="font-semibold ">
                      {menuItem?.menu_item?.is_lacking_ingredient
                        ? "Ja"
                        : "Nej"}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Kommentar</Label>
                    <p className="font-semibold ">
                      {menuItem?.menu_item?.comment
                        ? menuItem?.menu_item?.comment
                        : "Ingen kommentar"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Beskrivelse til at beskrive hvilke ingredienser der
                      mangler, og andre relevante informationer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="A card with a form to edit the product status">
              <CardHeader>
                <CardTitle>Vises på menuen</CardTitle>
                <CardDescription>
                  Vælg om denne menu genstand skal være på menuen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3 ">
                    <p className="font-semibold ">
                      {menuItem?.menu_item?.is_active ? "Ja" : "Nej"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="overflow-hidden"
              x-chunk="A card with a form to upload product images"
            >
              <CardHeader>
                <CardTitle>Menu billede</CardTitle>
                <CardDescription>
                  Billedet her vil blive vist på menuen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={`/img/${menuItem?.menu_item?.image_path}`}
                    width="300"
                  />
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="A card with a form to edit the product status">
              <CardHeader>
                <CardTitle>Udsolgt</CardTitle>
                <CardDescription>
                  Til menu genstanden som er udsolgt og men stadig på menuen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3 ">
                    <p className="font-semibold ">
                      {menuItem?.menu_item?.is_sold_out ? "Ja" : "Nej"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </main>
  );
}
