import { MenuItemDetails, MenuItemType } from "../../types";
import { cookies } from "next/headers";
import { MenuItemEditForm } from "./EditMenuItemForm";
import { config } from "@/app/config";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let menuItem: MenuItemDetails | undefined;
  let menuItemTypeList: MenuItemType[] | undefined;
  const cookieStore = await cookies();
  const id = (await params).id;
  const accessToken = cookieStore.get("accessToken");

  const menuItemRes = await fetch(
    `${config.backendUrl}/menu_items/admin/${id}`,
    {
      headers: {
        authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (menuItemRes.ok) {
    const data = (await menuItemRes.json()) as MenuItemDetails;

    menuItem = data;
  }

  const menuItemTypeRes = await fetch(`${config.backendUrl}/menu_item_types`);
  if (menuItemTypeRes.ok) {
    const data = (await menuItemTypeRes.json()) as MenuItemType[];
    console.log("🚀 ~ data:", data);

    menuItemTypeList = data;
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-2">
      <MenuItemEditForm
        initialMenuItem={menuItem}
        initialMenuItemTypeList={menuItemTypeList}
        id={id}
        token={accessToken?.value}
      ></MenuItemEditForm>
    </main>
  );
}
