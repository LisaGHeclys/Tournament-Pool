"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ChartPreview from "@/components/ui/chart-preview";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const router = useRouter();

  return (
    <SessionProvider>
      <div className="min-h-screen p-8 sm:pb-20 gap-8 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="md:p-8 w-full h-fit flex flex-wrap sm:flex-row justify-between">
          <div />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to the Tournament Pool !
          </h1>
          {
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          }
        </header>
        <main className="h-full w-full flex flex-col gap-8 row-start-2 items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search a pool..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-3/4 justify-center">
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
            <ChartPreview />
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
}
