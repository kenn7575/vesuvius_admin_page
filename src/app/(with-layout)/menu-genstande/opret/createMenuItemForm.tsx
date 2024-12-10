"use client";

import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MenuItemType } from "../types";
import { ChevronLeft, LoaderCircle, Upload } from "lucide-react";
import { useFormStatus } from "react-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { menuItemSchema } from "@/lib/zodSchemas";
import { config } from "@/app/config";

export function CreateMenuItemForm({
  initialMenuItemTypeList,
  token,
}: {
  initialMenuItemTypeList: MenuItemType[] | undefined;
  token: string | undefined;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof menuItemSchema>>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",

      category: "",
      is_active: true,
      is_sold_out: false,
      is_lacking_ingredient: false,
      comment: "",
    },
  });
  const { pending } = useFormStatus();

  async function onSubmit(values: z.infer<typeof menuItemSchema>) {
    console.log(values);
    const res = await fetch(`${config.backendUrl}/menu_items`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      method: "POST",
    });
    console.log("🚀 ~ onSubmit ~ res", res);
    if (res.ok) {
      const { id } = await res.json();
      router.push(`/menu-genstande/${id}?created=true`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/menu-genstande">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Opret ny menu genstand
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/menu-genstande`}>Annuller</Link>
            </Button>
            <Button size="sm" type="submit">
              {pending && <LoaderCircle className="animate-spin" />}
              Opret
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
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <Label htmlFor="name">Navn</Label>
                        <FormControl>
                          <Input
                            id="name"
                            type="text"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Beskrivelse</FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Pris i kr.</FormLabel>
                          <FormControl>
                            <Input
                              id="price"
                              type="number"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card x-chunk="A card with a form to edit the product category and subcategory">
              <CardHeader>
                <CardTitle>Menu kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategori</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {initialMenuItemTypeList?.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id.toString()}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="A card with a form to edit the product details">
              <CardHeader>
                <CardTitle>Lager status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="is_lacking_ingredient"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel> Mangler ingredienser</FormLabel>
                          <FormControl>
                            <Switch
                              className="scale-150 translate-x-2"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Kommentar</FormLabel>
                          <FormControl>
                            <Textarea className="w-full min-h-32" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    <FormDescription className="text-sm text-muted-foreground">
                      Beskrivelse til at beskrive hvilke ingredienser der
                      mangler, og andre relevante informationer.
                    </FormDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="A card with a form to edit the product status">
              <CardHeader>
                <CardTitle>Vis på menuen</CardTitle>
                <CardDescription>
                  Vælg om denne menu genstand skal være på menuen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3 ">
                    <FormField
                      control={form.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Aktiv</FormLabel>
                          <FormControl>
                            <Switch
                              className="scale-150 translate-x-2"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
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
                    src={`/img/placeholder.svg`}
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
                    <FormField
                      control={form.control}
                      name="is_sold_out"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Udsolgt</FormLabel>
                          <FormControl>
                            <Switch
                              className="scale-150 translate-x-2"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
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
      </form>
    </Form>
  );
}
