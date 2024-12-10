"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { config } from "@/app/config";

export async function updateMenuItemStatus(id: string, newStatus: boolean) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  try {
    // Example external API call (replace with your actual API endpoint)
    let url = `${config.backendUrl}/menu_items/${id}/`;
    newStatus ? (url += "activate") : (url += "deactivate");
    let mothod = newStatus ? "PATCH" : "DELETE";

    const response = await fetch(url, {
      method: mothod,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify({ is_active: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update menu item");
    }

    const updatedItem = await response.json();

    // Revalidate the current path to trigger a re-render
    revalidatePath("/your-menu-page");

    return updatedItem;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
}
