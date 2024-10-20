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
import { useFetch } from "@/app/api/_helpers/useFetch";
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
        return <Button onClick={() => router.push("/login")}>Login</Button>;
    }
  }

  async function handleGetTournaments(page: number) {
    try {
      const res = await executeFetch({
        url: `/api/tournaments?page=${page}&limit=6`,
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
      console.log(resToJSON.tournaments);
      if (!isLoading && !isError) setTournaments(resToJSON.tournaments);
    } catch (error) {
      console.error("Unexpected error during creation of tournament:", error);
    }
  }

  function handlePageClick(page: number) {
    if (page < 1 || page > totalPages) return;
    setIsActive(page);
  }

  useEffect(() => {
    handleGetTournaments(isActive);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 sm:pb-20 gap-8 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="p-8 w-full h-fit flex flex-wrap items-center sm:flex-row justify-between">
          <div />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            <Skeleton className="h-12 w-[450px]" />
          </h1>
          <Skeleton className="h-8 w-8 rounded-full" />
        </header>
        <main className="w-full h-full flex gap-8 items-center">
          <Skeleton className="h-full w-full" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 gap-4 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <header className="md:p-8 w-full h-fit flex flex-wrap sm:flex-row items-center justify-between">
        <div />
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to the Tournament Pool !
        </h1>
        {handleUserNav()}
      </header>
      <main className="h-full w-full gap-4 flex flex-col row-start-2 items-center justify-between">
        <div className="flex relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a pool..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <div className="grid md:grid-rows-2 lg:grid-rows-3 grid-cols-1 lg:grid-cols-3 w-full">
          {tournaments &&
            tournaments.map((tournament, index) => (
              <div key={index} className="h-[280px]">
                <ChartPreview tournament={tournament} />
              </div>
            ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`disabled:opacity-75`}
                onClick={() => handlePageClick(isActive - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={isActive === index + 1}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                isActive={isActive === totalPages}
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
