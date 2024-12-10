"use client";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function Toast({ name }: { name: string | undefined }) {
  const searchParams = useSearchParams();
  const updated = searchParams.get("updated");
  const created = searchParams.get("created");

  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (updated == "true" || created == "true") {
      setTimeout(() => {
        toast(
          `${name || "Menu genstand"} ${
            updated ? "blev opdateret" : "blev oprettet"
          }`
        );
        const params = new URLSearchParams(searchParams);
        params.delete("updated");
        params.delete("created");
        replace(`${pathname}?${params.toString()}`);
      }, 200);
    }
  }, []);
  return <div></div>;
}
