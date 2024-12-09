"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

import { usePathname } from "next/navigation";

export function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((value, index) => {
          const href = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          return (
            <BreadcrumbItem
              key={href}
              className={isLast ? "" : "hidden md:flex "}
            >
              {isLast ? (
                <BreadcrumbPage>{value}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={href}>{value}</BreadcrumbLink>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
