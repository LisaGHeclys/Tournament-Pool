"use client";
import Footer from "@/components/ui/footer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ChartPreview from "@/components/charts/chart-preview";
import { UserNav } from "@/components/navbar/user-nav";
import { usePaginatedTournaments } from "@/backend-calls";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const [isActive, setIsActive] = React.useState<number>(1);
  const t = useTranslations();
  const locale = useLocale();
  const { data, isFetching, refetch } = usePaginatedTournaments({
    pageLimit: 4,
    page: isActive,
  });

  function handlePageClick(page: number, totalPages: number) {
    if (page < 1 || page > totalPages) return;
    refetch();
    setIsActive(page);
  }

  function getVisiblePageNumbers(totalPages: number) {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    let startPage, endPage;

    if (isActive === 1) {
      startPage = 1;
      endPage = 3;
    } else if (isActive === totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    } else {
      startPage = isActive - 1;
      endPage = isActive + 1;
    }

    startPage = Math.max(1, startPage);
    endPage = Math.min(totalPages, endPage);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  if (isFetching) {
    return (
      <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
        <header className="md:p-8 w-full h-full md:h-fit flex flex-row items-center justify-between">
          <div />
          <h1 className="scroll-m-20 tracking-tight">
            <Skeleton className="h-8 sm:h-12 w-[180px] sm:w-[450px]" />
          </h1>
          <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" />
        </header>
        <main className="w-full h-full flex gap-8 items-center">
          <Skeleton className="h-[600px] md:h-full w-full flex" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <UserNav title="navbar.welcome" avatar centered />
      <main className="gap-2 h-full w-full flex flex-col md:gap-6 row-start-2 items-center justify-between">
        <div className="flex relative mt-4"></div>
        {data ? (
          <div className="grid md:grid-rows-2 grid-cols-1 md:gap-4 xl:grid-cols-2 w-full h-full">
            {data.tournaments.map((tournament, index) => (
              <ChartPreview
                key={index}
                tournament={tournament}
                link={`/${locale}/show/`}
              />
            ))}
          </div>
        ) : (
          <h1 className="flex items-center justify-center text-xs md:text-md font-extrabold lg:text-xl text-muted-foreground ">
            {t("no.yet")}
          </h1>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${isActive === 1 ? "pointer-events-none" : ""} text-xs md:text-sm`}
                onClick={() =>
                  handlePageClick(isActive - 1, data?.totalPages ?? 1)
                }
              />
            </PaginationItem>
            {getVisiblePageNumbers(data?.totalPages ?? 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={isActive === pageNum}
                  className="text-xs md:text-sm w-8 h-8 sm:w-10 sm:h-10"
                  onClick={() =>
                    handlePageClick(pageNum, data?.totalPages ?? 1)
                  }
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            {(data?.totalPages ?? 1) > 3 && (
              <PaginationItem>
                <PaginationEllipsis className="text-xs md:text-sm w-8 h-8 sm:w-10 sm:h-10" />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className={`${isActive === data?.totalPages ? "pointer-events-none" : ""} text-xs md:text-sm`}
                onClick={() =>
                  handlePageClick(isActive + 1, data?.totalPages ?? 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
      <Footer />
    </div>
  );
}
