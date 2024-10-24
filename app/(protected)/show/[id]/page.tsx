"use client";
import Footer from "@/components/ui/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useParams, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { Method, tournamentBody } from "@/app/api/_helpers/types/types";
import { useFetch } from "@/app/api/_helpers/useFetch";
import { Skeleton } from "@/components/ui/skeleton";
import { object } from "prop-types";
import PieChartComponent from "@/components/ui/pie-chart";
import Autoplay from "embla-carousel-autoplay";

export default function ShowTournament() {
  const router = useRouter();
  const id = useParams().id;
  const { executeFetch, isLoading, isError } = useFetch();
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = 2;

  const [tournament, setTournament] = React.useState<tournamentBody>({
    id: "",
    name: "",
    teams: [
      {
        name: "",
        color: "",
        points: [],
      },
    ],
    createdBy: "",
    createdAt: object,
  });

  async function handleGetTournamentById() {
    try {
      const res = await executeFetch({
        url: `/api/tournaments/${id}`,
        method: Method.GET,
      });

      if (res === null) {
        setTournament({
          id: "",
          name: "",
          teams: [
            {
              name: "",
              color: "",
              points: [],
            },
          ],
          createdBy: "",
          createdAt: object,
        });
        return;
      }

      const resToJSON = await res.json();

      if (!resToJSON) {
        setTournament({
          id: "",
          name: "",
          teams: [
            {
              name: "",
              color: "",
              points: [],
            },
          ],
          createdBy: "",
          createdAt: object,
        });
        return;
      }

      if (!isLoading && !isError) {
        setTournament(resToJSON);
      }
    } catch (error) {
      console.error("Unexpected error during creation of tournament:", error);
    }
  }

  useEffect(() => {
    handleGetTournamentById();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen sm:p-16 p-8 gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
        <header className="p-8 w-full h-fit flex flex-wrap items-center sm:flex-row justify-between">
          <Skeleton className="h-12 w-full" />
        </header>
        <main className="w-full h-full flex gap-8 items-center">
          <Skeleton className="h-full w-2/3" />
          <Skeleton className="h-full w-1/3" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:p-16 p-8 gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 w-full h-fit flex flex-wrap items-center sm:flex-row justify-between">
        <Button
          className="rounded-full"
          size="icon"
          onClick={() => {
            router.push("/");
          }}
        >
          <ChevronLeft />
        </Button>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tournament : {tournament.name}
        </h1>
        <div />
      </header>
      <main className="w-full h-full flex gap-8 items-center">
        <Card className="flex flex-col p-2 px-16 w-2/3 h-full">
          <CardHeader>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Tournament : {tournament.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CardTitle>This tournament charts</CardTitle>
            <CardDescription>
              Here you can see the different charts for this tournaments.
            </CardDescription>
          </CardHeader>
          <div className="w-full h-full flex flex-col">
            <Carousel
              className="h-full flex justify-center items-center"
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 10000 })]}
            >
              <CarouselContent>
                <CarouselItem className="flex justify-center items-center">
                  <div className="flex justify-center items-center h-full w-full">
                    <PieChartComponent tournament={tournament} />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex justify-center items-center h-full w-full">
                    <span>2</span>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </Card>
        <Card className="py-8 px-16 w-1/3 h-full flex flex-col">
          <CardHeader>
            <CardTitle>Team&#39;s points ?</CardTitle>
            <CardDescription>
              Here you can see the points from each teams.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full gap-8">
            <div className="h-fit w-full flex flex-row gap-8">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search points..."
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
            </div>
            <ScrollArea className="w-full h-[500px] px-2">
              <div className="flex flex-col gap-4 p-2">
                {/*TODO: create a PointsPreview component*/}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
