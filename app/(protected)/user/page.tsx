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
import React from "react";
import { tournamentBody } from "@/app/api/_helpers/types/interfaces";
import { ColorPicker } from "@/components/ui/color-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChartPreview from "@/components/ui/chart-preview";

export default function User() {
  const { data: session } = useSession();
  const [tournament, setTournament] = React.useState<tournamentBody>({
    name: "",
    teams: [
      { name: "", color: "", points: [] },
      { name: "", color: "", points: [] },
    ],
    createdBy: session?.user?.name ?? "",
  });
  const [teamNumber, setTeamNumber] = React.useState<number>(2);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tournament name:", tournament);
  };

  return (
    <div className="min-h-screen md:max-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 w-full h-fit flex flex-wrap items-center sm:flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome back {session?.user?.name} !
        </h1>
        <UserNav />
      </header>
      <main className="w-full h-full flex gap-8 items-center">
        <Card className="flex flex-col p-2 px-16 w-full h-full">
          <CardHeader>
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
          <CardContent className="flex flex-col h-full gap-8">
            <div className="lg:px-32 w-full flex flex-row gap-8">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search a pool..."
                  className="w-full rounded-lg bg-background pl-8"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col sm:max-w-[425px]">
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
                                aria-required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create a tournament</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex w-full justify-center">
              <ScrollArea className="w-2/3 h-[500px] px-2">
                <div className="flex flex-col gap-4 p-2">
                  <ChartPreview height="360" />
                  <ChartPreview height="360" />
                  <ChartPreview height="360" />
                  <ChartPreview height="360" />
                  <ChartPreview height="360" />
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
