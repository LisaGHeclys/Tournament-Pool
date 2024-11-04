"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/ui/footer";
import { Plus, Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserNav } from "@/components/ui/user-nav";
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
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Method, tournamentBody } from "@/app/api/_helpers/types/types";
import { ColorPicker } from "@/components/ui/color-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChartPreview from "@/components/ui/chart-preview";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function User() {
  const { executeFetch, isLoading, isError } = useFetch();
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [tournament, setTournament] = React.useState<tournamentBody>({
    name: "",
    teams: [
      { name: "", color: "" },
      { name: "", color: "" },
    ],
    createdBy: session?.user?.name ?? "",
    createdAt: new Date(),
    points: [],
  });
  const [teamNumber, setTeamNumber] = React.useState<number>(2);
  const [tournaments, setTournaments] = React.useState<tournamentBody[]>([]);
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTournament((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleTeamNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = parseInt(e.target.value, 10);
    setTeamNumber(number);
    setTournament((prev) => {
      let updatedTeams = [...prev.teams];

      if (number > updatedTeams.length) {
        updatedTeams.push(
          ...Array.from({ length: number - updatedTeams.length }, () => ({
            name: "",
            color: "",
          })),
        );
      } else {
        updatedTeams = updatedTeams.slice(0, number);
      }

      return {
        ...prev,
        teams: updatedTeams,
      };
    });
  };

  const handleTeamChange = (
    index: number,
    field: "name" | "color",
    value: string,
  ) => {
    const updatedTeams = [...tournament.teams];
    updatedTeams[index][field] = value;
    setTournament((prev) => ({
      ...prev,
      teams: updatedTeams,
    }));
  };

  const handleDisabled = () => {
    if (tournament.name == "") return true;

    return tournament.teams.some((team) => {
      return (
        team.name === "" ||
        team.color.toLowerCase() === "#ffffff" ||
        team.color === ""
      );
    });
  };

  const handleCreateTournament = async () => {
    try {
      const res = await executeFetch({
        url: "/api/tournaments",
        method: Method.PUT,
        body: tournament,
      });

      if (res === null) {
        console.error("Couldn't create tournament", res);
        return;
      }

      const resToJSON = await res.json();

      if (!isLoading && !isError)
        router.push("/user/tournament/" + resToJSON.id);
    } catch (error) {
      console.error("Unexpected error during creation of tournament:", error);
    }
  };

  const handleGetTournaments = async () => {
    try {
      const res = await executeFetch({
        url: "/api/tournaments/my",
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
      }
    } catch (error) {
      console.error("Unexpected error during creation of tournament:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeamNumber(2);
    setTournaments((prevState) => [tournament, ...prevState]);
    handleCreateTournament();
    setTournament({
      name: "",
      teams: [
        { name: "", color: "" },
        { name: "", color: "" },
      ],
      createdBy: session?.user?.name ?? "",
      createdAt: new Date(),
      points: [],
    });
    setOpen(false);
  };

  useEffect(() => {
    handleGetTournaments();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
        <header className="md:p-8 w-full h-full md:h-fit flex flex-row items-center justify-between">
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
    <div className="min-h-screen sm:p-16 p-8 gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <header className="md:p-8 w-full md:h-fit flex flex-row items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome back {session?.user?.name} !
        </h1>
        <UserNav />
      </header>
      <main className="w-full h-full flex gap-2 md:gap-6 items-center">
        <Card className="flex flex-col p-2 md:px-16 w-full h-full">
          <CardHeader className="p-2 pb-4 md:p-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Your page</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CardTitle>Your tournaments ?</CardTitle>
            <CardDescription>
              You can create tournaments here and find your previous ones.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full p-2 md:p-6 gap-4 md:gap-8">
            <div className="lg:px-32 w-full flex flex-col-reverse md:flex-row gap-2 md:gap-8">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for a pool..."
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="hover:scale-105 transition ease-in-out delay-250">
                    <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col rounded-md max-w-[280px] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add a tournament</DialogTitle>
                    <DialogDescription>
                      You can create your own tournament here.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Tournament Name</Label>
                        <Input
                          id="name"
                          placeholder="Your tournament name"
                          onChange={handleOnChange}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="team-number">
                          How many teams do you need ?
                        </Label>
                        <Input
                          id="team-number"
                          className="flex flex-grow"
                          type="number"
                          value={teamNumber.toString()}
                          min="2"
                          max="5"
                          onChange={handleTeamNumberChange}
                          placeholder="Your number of teams"
                          required
                        />
                      </div>
                      {tournament.teams.map((team, index) => (
                        <div
                          key={index}
                          className="flex w-full flex-col space-y-1.5"
                        >
                          <Label htmlFor={`team-name-${index}`}>
                            Team {index + 1} : Name and Color
                          </Label>
                          <div key={index} className="flex flex-row gap-4">
                            <Input
                              id={`team-name-${index}`}
                              value={team.name}
                              onChange={(e) =>
                                handleTeamChange(index, "name", e.target.value)
                              }
                              placeholder="Team name"
                              required
                            />
                            <div>
                              <ColorPicker
                                id={`team-color-${index}`}
                                value={team.color}
                                onChange={(v) =>
                                  handleTeamChange(index, "color", v)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={handleDisabled()}>
                        Create a tournament
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex w-full justify-center">
              {tournaments ? (
                <ScrollArea className="w-full lg:w-2/3 h-[560px] md:px-2">
                  <div className="flex flex-col gap-2 md:gap-4 md:p-2">
                    {tournaments &&
                      tournaments.map((tournament, index) => (
                        <ChartPreview
                          key={index}
                          tournament={tournament}
                          link={"/user/tournament/"}
                        />
                      ))}
                  </div>
                </ScrollArea>
              ) : (
                <h1 className="flex items-center justify-center text-xs md:text-md font-extrabold lg:text-xl text-muted-foreground ">
                  You have no tournaments yet !
                </h1>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
