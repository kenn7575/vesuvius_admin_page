"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MenuItemMetaData } from "./types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function TablePagination({ metaData }: { metaData: MenuItemMetaData }) {
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

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination className="flex-grow">
      <PaginationContent>
        {metaData.page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              aria-label="Previous page"
              onClick={() => handlePageChange(metaData.page - 1)}
            />
          </PaginationItem>
        )}
        {Array.from({ length: metaData.pageCount }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              aria-label={`Go to page ${i + 1}`}
              onClick={() => handlePageChange(i + 1)}
              isActive={metaData.page === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {metaData.page < metaData.pageCount && (
          <PaginationItem>
            <PaginationNext
              aria-label="Next page"
              onClick={() => handlePageChange(metaData.page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
