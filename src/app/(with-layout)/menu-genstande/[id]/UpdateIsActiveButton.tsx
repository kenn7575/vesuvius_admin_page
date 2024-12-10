"use client";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { updateMenuItemStatus } from "./actions/UpdateMenuActiveActiveAction";
import { LoaderCircle } from "lucide-react";

interface MenuItemToggleProps {
  id: string;
  initialIsActive: boolean | undefined;
}

export function UpdateMenuActiveButton({
  id,
  initialIsActive,
}: MenuItemToggleProps) {
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    startTransition(async () => {
      try {
        const updatedItem = await updateMenuItemStatus(id, !isActive);
        setIsActive(updatedItem.is_active);
      } catch (error) {
        console.error("Failed to update menu item status", error);
      }
    });
  };

  return (
    <>
      {initialIsActive ? (
        <>
          <input
            className="hidden"
            type="text"
            value="false"
            name="activate"
            onChange={() => {}}
            id="activate"
            checked={false}
          />
          <Button onClick={handleToggle} variant="destructive" size="sm">
            {isPending && <LoaderCircle className="animate-spin" />}
            Fjern fra menuen
          </Button>
        </>
      ) : (
        <>
          <input
            className="hidden"
            type="text"
            value="true"
            onChange={() => {}}
            name="activate"
            id="activate"
            checked={true}
          />
          <Button variant="outline" onClick={handleToggle} size="sm">
            {isPending && <LoaderCircle className="animate-spin" />}
            Vis på menuen
          </Button>
        </>
      )}
    </>
  );
}
