"use client";
import Footer from "@/components/ui/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Search, SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { pointsBody } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import PointsPreview from "@/components/ui/points-preview";
import Autoplay from "embla-carousel-autoplay";
import PieChartComponent from "@/components/charts/pie-chart";
import { BarChartComponent } from "@/components/charts/bar-chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserNav } from "@/components/navbar/user-nav";
import { useDeletePoints, useTournamentsById } from "@/backend-calls";
import { AddPointsForm } from "@/components/forms/add-points-form";
import { EditTournamentForm } from "@/components/forms/edit-tournament-form";

export default function Tournament() {
  const id: string | string[] = useParams().id;
  const [openPoints, setOpenPoints] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPoints, setFilteredPoints] = useState<pointsBody[]>();
  const { data, isFetching, refetch } = useTournamentsById({
    id: Array.isArray(id) ? id[0] : id,
  });
  const deletePointsMutation = useDeletePoints({
    id: Array.isArray(id) ? id[0] : id,
  });

  async function handleRemovePointsToTournament(
    targetCreatedAt: Date,
    setOpenDeletePoint: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    if (data) {
      const newTournament = {
        ...data,
        points:
          data && Array.isArray(data.points)
            ? data.points.filter(
                (existingPoint) => existingPoint.createdAt !== targetCreatedAt,
              )
            : [],
      };
      deletePointsMutation.mutate(newTournament, {
        onSuccess: () => {
          setOpenDeletePoint(false);
          refetch();
        },
      });
    }
  }

  useEffect(() => {
    if (data && Array.isArray(data.points) && data) {
      const results = data?.points.filter((point) =>
        point.reason.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredPoints(results);
    }
  }, [data, searchTerm]);

  if (isFetching) {
    return (
      <div className="min-h-screen max-w-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
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
    <div className="min-h-screen max-w-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <UserNav
        title={data?.name ?? ""}
        isBack
        backPath={"/user"}
        centered
        avatar
        isEdit
      >
        <TooltipProvider>
          <Tooltip>
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <SquarePen className="h-4 w-4 md:h-6 md:w-6" />
                    <span className="sr-only">
                      Edit tournament's information
                    </span>
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <DialogContent className="flex flex-col rounded-md max-w-[280px] sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit your tournament</DialogTitle>
                  <DialogDescription>
                    You can edit your tournament here.
                  </DialogDescription>
                </DialogHeader>
                {data && (
                  <EditTournamentForm data={data} setOpenEdit={setOpenEdit} />
                )}
              </DialogContent>
            </Dialog>
            <TooltipContent>Edit tournament's information</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </UserNav>
      <main className="gap-2 h-full w-full flex flex-col lg:flex-row md:gap-6 row-start-2 items-center justify-between">
        <Card className="flex flex-col h-[440px] md:h-[440px] p-2r md:px-16 w-full lg:w-2/3 lg:h-full">
          <CardHeader>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/public">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/user">Your page</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{data?.name ?? ""}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CardTitle>This tournament charts</CardTitle>
            <CardDescription>
              Here you can see the different charts for this tournaments.
            </CardDescription>
          </CardHeader>
          <div className="w-full h-full flex">
            {data && Array.isArray(data?.points) && (
              <Carousel
                className="w-full h-full flex justify-center items-center"
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 10000 })]}
              >
                <CarouselContent className="flex md:w-full md:h-full gap-4">
                  <CarouselItem className="w-[160px] h-[240px] md:h-full">
                    <PieChartComponent tournament={data} />
                  </CarouselItem>
                  <CarouselItem className="w-[20px] md:w-[160px] h-[240px] md:h-full">
                    <BarChartComponent tournament={data} />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            )}
          </div>
        </Card>
        <Card className="py-2 px-4 lg:py-8 lg:px-16 w-full lg:w-1/3 lg:h-full flex flex-col">
          <CardHeader>
            <CardTitle>Add more points ?</CardTitle>
            <CardDescription>
              You can add points depending on the team.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col w-full gap-2 md:gap-8 h-full p-2 md:p-6">
            <div className="h-fit w-full flex flex-col-reverse md:flex-row gap-2 md:gap-8">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search points..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={openPoints} onOpenChange={setOpenPoints}>
                <DialogTrigger asChild>
                  <Button className="hover:scale-105 transition ease-in-out delay-250">
                    <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add points</DialogTitle>
                    <DialogDescription>
                      You can add points for your teams here.
                    </DialogDescription>
                  </DialogHeader>
                  {data && (
                    <AddPointsForm data={data} setOpenPoints={setOpenPoints} />
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="w-full h-[380px] md:h-[550px] rounded-md p-0 md:px-2">
              {data && Array.isArray(data?.points) && filteredPoints ? (
                <div className="flex flex-col gap-4 p-2">
                  {filteredPoints.map((point, index) => (
                    <PointsPreview
                      point={point}
                      key={index}
                      handleRemovePointsToTournament={
                        data && handleRemovePointsToTournament
                      }
                    />
                  ))}
                </div>
              ) : (
                <h1 className="flex items-center justify-center text-xs md:text-md font-extrabold lg:text-xl text-muted-foreground ">
                  This tournament has no points set yet !
                </h1>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
