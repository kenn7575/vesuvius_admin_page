"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function Tablist({}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(filter: string) {
    const params = new URLSearchParams(searchParams);
    if (filter) {
      params.set("filter", filter);
      params.set("page", "1");
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <TabsList>
      <TabsTrigger
        onClick={() => {
          handleSearch("all");
        }}
        value="all"
      >
        Alle
      </TabsTrigger>
      <TabsTrigger
        onClick={() => {
          handleSearch("active");
        }}
        value="active"
      >
        Aktive
      </TabsTrigger>
      <TabsTrigger
        onClick={() => {
          handleSearch("inactive");
        }}
        value="inactive"
      >
        Ikke aktive
      </TabsTrigger>
    </TabsList>
  );
}
