"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Footer from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserNav } from "@/components/ui/user-nav";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import { Method, tournamentBody } from "@/app/api/_helpers/types/types";
import ChartPreview from "@/components/ui/chart-preview";

export default function Home() {
  const router = useRouter();
  const { executeFetch, isLoading, isError } = useFetch();
  const { status } = useSession();
  const [tournaments, setTournaments] = React.useState<tournamentBody[]>([]);
  const [isActive, setIsActive] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  function handleUserNav() {
    switch (status) {
      case "authenticated":
        return <UserNav />;
      case "loading":
        return <Skeleton className="h-8 w-8 rounded-full" />;
      default:
        return (
          <Button
            className="hover:scale-105 transition ease-in-out delay-250"
            onClick={() => router.push("/login")}
          >
            <span>Login</span>
          </Button>
        );
    }
  }

  async function handleGetTournaments(page: number) {
    try {
      const res = await executeFetch({
        url: `/api/tournaments?page=${page}&limit=4`,
        method: Method.GET,
      });

      if (res === null) {
        setTournaments([]);
        return;
      }

      const resToJSON = await res.json();

      if (!resToJSON) {
        setTournaments([]);
        return;
      }
      if (!isLoading && !isError) {
        setTournaments(resToJSON.tournaments);
        setTotalPages(resToJSON.totalPages);
      }
    } catch (error) {
      console.error("Unexpected error during creation of tournament:", error);
    }
  }

  function handlePageClick(page: number) {
    if (page < 1 || page > totalPages) return;
    handleGetTournaments(page);
    setIsActive(page);
  }

  function getVisiblePageNumbers() {
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

  useEffect(() => {
    handleGetTournaments(isActive);
  }, []);

  if (isLoading) {
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
      <header className="md:p-8 w-full md:h-fit flex flex-row items-center justify-between">
        <div />
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Tournament Pool !
        </h1>
        {handleUserNav()}
      </header>
      <main className="gap-2 h-full w-full flex flex-col md:gap-6 row-start-2 items-center justify-between">
        <div className="flex relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a pool..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        {tournaments ? (
          <div className="grid md:grid-rows-2 grid-cols-1 md:gap-4 xl:grid-cols-2 w-full h-full">
            {tournaments.map((tournament, index) => (
              <ChartPreview
                key={index}
                tournament={tournament}
                link={"/show/"}
              />
            ))}
          </div>
        ) : (
          <h1 className="flex items-center justify-center text-xs md:text-md font-extrabold lg:text-xl text-muted-foreground ">
            No tournaments yet !
          </h1>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${isActive === 1 ? "pointer-events-none" : ""} text-xs md:text-sm`}
                onClick={() => handlePageClick(isActive - 1)}
              />
            </PaginationItem>
            {getVisiblePageNumbers().map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={isActive === pageNum}
                  className="text-xs md:text-sm w-8 h-8 sm:w-10 sm:h-10"
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            {totalPages > 3 && (
              <PaginationItem>
                <PaginationEllipsis className="text-xs md:text-sm w-8 h-8 sm:w-10 sm:h-10" />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className={`${isActive === totalPages ? "pointer-events-none" : ""} text-xs md:text-sm`}
                onClick={() => handlePageClick(isActive + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
      <Footer />
    </div>
  );
}
