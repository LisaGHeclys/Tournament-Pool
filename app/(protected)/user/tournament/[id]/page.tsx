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
import { useFetch } from "@/app/api/_helpers/useFetch";
import React, { useEffect, useState } from "react";
import {
  Method,
  pointsBody,
  tournamentBody,
} from "@/app/api/_helpers/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

export default function Tournament() {
  const router = useRouter();
  const { data: session } = useSession();
  const id = useParams().id;
  const [open, setOpen] = React.useState(false);
  const { executeFetch, isLoading, isError } = useFetch();
  const [point, setPoint] = useState<pointsBody>({
    reason: "",
    points: 1,
    createBy: session?.user?.name ?? "",
  });
  const [teamName, setTeamName] = useState<string>("");
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
    createdAt: new Date(),
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPoint((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
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
      const updatedTournament = { ...tournament };

      const teamToUpdate = updatedTournament.teams.find(
        (team) => team.name === teamName,
      );
      if (teamToUpdate?.points) {
        teamToUpdate.points.push(point);
      }

      const res = await executeFetch({
        url: `/api/tournaments/${id}`,
        method: Method.PATCH,
        body: updatedTournament,
      });

      if (res === null) {
        setPoint({
          reason: "",
          points: 1,
          createBy: session?.user?.name ?? "",
        });
        return;
      }
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
      createBy: session?.user?.name ?? "",
    });
    setOpen(false);
  }

  useEffect(() => {
    handleGetTournamentById();
  }, []);

  if (isLoading || tournament.name == "") {
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
          className="rounded-full hover:scale-[102%] transition ease-in-out delay-250"
          size="icon"
          onClick={() => {
            router.push("/user");
          }}
        >
          <ChevronLeft />
        </Button>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tournament : {tournament.name}
        </h1>
        <UserNav />
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
          <CardContent className="w-full h-full items-center justify-center flex">
            <Carousel className="w-full max-w-lg">
              <CarouselContent>
                {Array.from({ length: 2 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
        <Card className="py-8 px-16 w-1/3 h-full flex flex-col">
          <CardHeader>
            <CardTitle>Add more points ?</CardTitle>
            <CardDescription>
              You can add points depending on the team.
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
                        <Select onValueChange={(value) => setTeamName(value)}>
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
                      {teamName !== "" && (
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
                      <Button type="submit" disabled={point.reason === ""}>
                        Add points
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
