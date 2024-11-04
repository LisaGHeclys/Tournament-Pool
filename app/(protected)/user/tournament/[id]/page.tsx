"use client";
import Footer from "@/components/ui/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/ui/user-nav";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import {
  Method,
  pointsBody,
  teamBody,
  tournamentBody,
} from "@/app/api/_helpers/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import PointsPreview from "@/components/ui/points-preview";
import { useWindowSize } from "@/hooks/useWindowSize";
import Autoplay from "embla-carousel-autoplay";
import PieChartComponent from "@/components/ui/pie-chart";

export default function Tournament() {
  const size = useWindowSize();
  const router = useRouter();
  const { data: session } = useSession();
  const id = useParams().id;
  const [open, setOpen] = React.useState(false);
  const { executeFetch, isLoading, isError } = useFetch();
  const [point, setPoint] = useState<pointsBody>({
    reason: "",
    points: 1,
    createdBy: session?.user?.name ?? "",
    team: {
      name: "",
      color: "",
    },
    createdAt: new Date(),
  });
  const [team, setTeam] = useState<teamBody>({
    name: "",
    color: "",
  });
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

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPoint((prev) => ({
      ...prev,
      [e.target.id]:
        e.target.id == "points" ? Number(e.target.value) : e.target.value,
    }));
  }

  function handleOnChangeTeam(value: string) {
    const tempTeam: teamBody = tournament.teams.find(
      (team) => team.name == value,
    ) || {
      name: "",
      color: "",
    };
    setTeam(tempTeam);
  }

  async function handleGetTournamentById() {
    try {
      const res = await executeFetch({
        url: `/api/tournaments/${id}`,
        method: Method.GET,
      });

      if (res === null) {
        router.push("/user/");
      } else {
        const resToJSON = await res.json();

        if (!resToJSON.name) {
          router.push("/user/");
        }

        if (!isLoading && !isError) {
          setTournament(resToJSON);
        }
      }
    } catch (error) {
      console.error(
        "Unexpected error during the retrieval of a tournament:",
        error,
      );
      router.push("/user/");
    }
  }

  async function handleUpdateTournament() {
    try {
      const updatedTournament = {
        ...tournament,
        points: Array.isArray(tournament.points)
          ? [
              { ...point, createdAt: new Date(), team: team },
              ...tournament.points,
            ]
          : [{ ...point, createdAt: new Date(), team: team }],
      };

      const res = await executeFetch({
        url: `/api/tournaments/${id}`,
        method: Method.PATCH,
        body: updatedTournament,
      });

      if (res === null) {
        setPoint({
          reason: "",
          points: 1,
          createdBy: session?.user?.name ?? "",
          team: {
            name: "",
            color: "",
          },
          createdAt: new Date(),
        });
        return;
      }
      handleGetTournamentById();
    } catch (error) {
      console.error(
        "Unexpected error during the update of a tournament:",
        error,
      );
      router.push("/user/");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleUpdateTournament();
    setPoint({
      reason: "",
      points: 1,
      createdBy: session?.user?.name ?? "",
      team: {
        name: "",
        color: "",
      },
      createdAt: new Date(),
    });
    setTeam({
      name: "",
      color: "",
    });
    setOpen(false);
  }

  useEffect(() => {
    handleGetTournamentById();
  }, []);

  if (isLoading || tournament.name == "") {
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
            router.push("/user");
          }}
        >
          <ChevronLeft size={size.width <= 425 ? 18 : 32} />
        </Button>
        <h1 className="text-2xl md:text-4xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl">
          {tournament.name}
        </h1>
        <UserNav />
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
                  <BreadcrumbLink href="/user">Your page</BreadcrumbLink>
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
                />
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
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
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="team-number">For which team ?</Label>
                        <Select onValueChange={handleOnChangeTeam}>
                          <SelectTrigger id="team-number">
                            <SelectValue placeholder="Choose a team" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {tournament.teams &&
                              tournament.teams.map((team, index) => {
                                return (
                                  <SelectItem key={index} value={team.name}>
                                    {team.name}
                                  </SelectItem>
                                );
                              })}
                          </SelectContent>
                        </Select>
                      </div>
                      {team.name !== "" && (
                        <>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="reason">What reason ?</Label>
                            <Input
                              id="reason"
                              placeholder="Write the reason to add points"
                              onChange={handleOnChange}
                              required
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="points">How many points?</Label>
                            <Input
                              defaultValue={1}
                              id="points"
                              type="number"
                              min={1}
                              placeholder="How many points do you want to add ?"
                              onChange={handleOnChange}
                              required
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <DialogFooter className="flex">
                      <Button
                        type="submit"
                        disabled={point.reason === "" && point.team.name === ""}
                      >
                        Add points
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="w-full h-[380px] md:h-[550px] rounded-md p-0 md:px-2">
              <div className="flex flex-col gap-4 p-2">
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
