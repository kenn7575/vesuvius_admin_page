import { MenuItemType } from "../types";
import { cookies } from "next/headers";
import { CreateMenuItemForm } from "./createMenuItemForm";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let menuItemTypeList: MenuItemType[] = [];
  const cookieStore = await cookies();
  const id = (await params).id;
  const accessToken = cookieStore.get("accessToken");

  const res = await fetch(`http://localhost:5005/menu_item_types`);
  if (res.ok) {
    const data = (await res.json()) as MenuItemType[];

    menuItemTypeList = data;
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-2">
      <CreateMenuItemForm
        initialMenuItemTypeList={menuItemTypeList}
        token={accessToken?.value}
      ></CreateMenuItemForm>
    </main>
  );
}
