"use client";
import Footer from "@/components/ui/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
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
import React, { useEffect } from "react";
import { Method, tournamentBody } from "@/app/api/_helpers/types/types";
import { useFetch } from "@/hooks/useFetch";
import { Skeleton } from "@/components/ui/skeleton";
import PieChartComponent from "@/components/ui/pie-chart";
import Autoplay from "embla-carousel-autoplay";
import PointsPreview from "@/components/ui/points-preview";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function ShowTournament() {
  const size = useWindowSize();
  const router = useRouter();
  const id = useParams().id;
  const { executeFetch, isLoading, isError } = useFetch();
  const [tournament, setTournament] = React.useState<tournamentBody>({
    id: "",
    name: "",
    teams: [
      {
        name: "",
        color: "",
      },
    ],
    createdBy: "",
    createdAt: new Date(),
    points: [],
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
            },
          ],
          createdBy: "",
          createdAt: new Date(),
          points: [],
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
            },
          ],
          createdBy: "",
          createdAt: new Date(),
          points: [],
        });
        return;
      }

      if (!isLoading && !isError) {
        setTournament(resToJSON);
      }
    } catch (error) {
      console.error(
        "Unexpected error during the retrieval of a tournament:",
        error,
      );
    }
  }

  useEffect(() => {
    handleGetTournamentById();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
        <header className="md:p-8 w-full md:h-fit flex flex-row items-center justify-between">
          <Skeleton className="h-12 w-full" />
        </header>
        <main className="gap-2 h-full w-full flex flex-col lg:flex-row md:gap-6 row-start-2 items-center justify-between">
          <Skeleton className="flex flex-col h-[400px] md:h-[440px] p-2r md:px-16 w-full lg:w-2/3 lg:h-full" />
          <Skeleton className="py-2 px-4 lg:py-8 lg:px-16 w-full lg:w-1/3 lg:h-full flex flex-col" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <header className="md:p-8 w-full md:h-fit flex flex-row items-center justify-between">
        <Button
          className="rounded-full hover:scale-[102%] transition ease-in-out delay-250"
          size="icon"
          onClick={() => {
            router.push("/");
          }}
        >
          <ChevronLeft size={size.width <= 425 ? 18 : 32} />
        </Button>
        <h1 className="text-2xl md:text-4xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl">
          {tournament.name}
        </h1>
        <div />
      </header>
      <main className="gap-2 h-full w-full flex flex-col lg:flex-row md:gap-6 row-start-2 items-center justify-between">
        <Card className="flex flex-col h-[400px] md:h-[440px] p-2r md:px-16 w-full lg:w-2/3 lg:h-full">
          <CardHeader>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{tournament.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CardTitle>This tournament charts</CardTitle>
            <CardDescription>
              Here you can see the different charts for this tournaments.
            </CardDescription>
          </CardHeader>
          <div className="w-full h-full flex">
            <Carousel
              className="w-full h-full flex justify-center items-center"
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 10000 })]}
            >
              <CarouselContent>
                <CarouselItem className="w-[238px] h-[240px]">
                  <PieChartComponent tournament={tournament} />
                </CarouselItem>
                <CarouselItem className="bg-red-900 h-full">
                  <div className="flex justify-center items-center h-full w-full">
                    <span>2</span>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </Card>
        <Card className="py-2 px-4 lg:py-8 lg:px-16 w-full lg:w-1/3 lg:h-full flex flex-col">
          <CardHeader>
            <CardTitle>Team&#39;s points ?</CardTitle>
            <CardDescription>
              Here you can see the points from each teams.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex w-full h-full p-2 md:p-6">
            <ScrollArea className="w-full h-[460px] md:h-[600px] rounded-md p-0 md:px-2">
              <div className="flex flex-col gap-2 p-1 md:gap-4 md:p-2">
                {Array.isArray(tournament.points) &&
                  tournament?.points?.map((point, index) => (
                    <PointsPreview point={point} key={index} />
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
