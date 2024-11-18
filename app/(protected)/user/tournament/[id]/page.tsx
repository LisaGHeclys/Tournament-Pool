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
import { useFetch } from "@/hooks/use-fetch";
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
import Autoplay from "embla-carousel-autoplay";
import PieChartComponent from "@/components/ui/charts/pie-chart";
import { useToast } from "@/hooks/use-toast";
import { BarChartComponent } from "@/components/ui/charts/bar-chart";
import { RadialChartComponent } from "@/components/ui/charts/radial-chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColorPicker } from "@/components/ui/color-picker";
import { UserNav } from "@/components/ui/navbar/user-nav";

export default function Tournament() {
  const router = useRouter();
  const { data: session } = useSession();
  const id = useParams().id;
  const [openPoints, setOpenPoints] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { toast } = useToast();
  const { executeFetch, isLoading, isError } = useFetch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPoints, setFilteredPoints] = useState<pointsBody[]>();
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
  const [updatedTournament, setUpdatedTournament] =
    React.useState<tournamentBody>({
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
          setUpdatedTournament(resToJSON);
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

  async function handleAddPointsToTournament() {
    try {
      const newTournament = {
        ...tournament,
        points: Array.isArray(tournament.points)
          ? [
              { ...point, createdAt: new Date(), team: team },
              ...tournament.points.map((existingPoint) => ({
                ...existingPoint,
                createdAt: existingPoint.createdAt
                  ? new Date(existingPoint.createdAt)
                  : null,
              })),
            ]
          : [{ ...point, createdAt: new Date(), team: team }],
      };

      const res = await executeFetch({
        url: `/api/tournaments/${id}`,
        method: Method.PATCH,
        body: newTournament,
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
      if (!isLoading && isError) {
        toast({
          title: "Couldn't add points to the tournaments",
          description:
            "An error occurred during the update of the points of the tournaments.",
          variant: "destructive",
        });
      }
      toast({
        title: "Points added successfully !",
        description: "You’ve successfully add points to the tournament.",
      });
      handleGetTournamentById();
    } catch (error) {
      toast({
        title: "Unexpected error: " + error,
        description: "Unexpected error during the update of a tournament.",
        variant: "destructive",
      });
      console.error(
        "Unexpected error during the update of a tournament:",
        error,
      );
      router.push("/user/");
    }
  }

  async function handleRemovePointsToTournament(targetCreatedAt: Date) {
    try {
      const newTournament = {
        ...tournament,
        points: Array.isArray(tournament.points)
          ? tournament.points.filter(
              (existingPoint) => existingPoint.createdAt !== targetCreatedAt,
            )
          : [],
      };

      const res = await executeFetch({
        url: `/api/tournaments/${id}`,
        method: Method.PATCH,
        body: newTournament,
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
      if (!isLoading && isError) {
        toast({
          title: "Couldn't delete the points to the tournaments",
          description:
            "An error occurred during the suppression of the points of the tournaments.",
          variant: "destructive",
        });
      }
      toast({
        title: "Points successfully deleted !",
        description: "You’ve successfully deleted points of the tournament.",
      });
      handleGetTournamentById();
    } catch (error) {
      toast({
        title: "Unexpected error: " + error,
        description: "Unexpected error during the update of a tournament.",
        variant: "destructive",
      });
      console.error(
        "Unexpected error during the update of a tournament:",
        error,
      );
      router.push("/user/");
    }
  }

  async function handleUpdateTournament() {
    try {
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

      if (!isLoading && isError) {
        toast({
          title: "Couldn't update the tournaments",
          description:
            "An error occurred during the update of the tournaments.",
          variant: "destructive",
        });
      }
      toast({
        title: "Updated successfully !",
        description: "You’ve successfully updated the tournament.",
      });
      handleGetTournamentById();
    } catch (error) {
      toast({
        title: "Unexpected error: " + error,
        description: "Unexpected error during the update of a tournament.",
        variant: "destructive",
      });
      console.error(
        "Unexpected error during the update of a tournament:",
        error,
      );
      router.push("/user/");
    }
  }

  async function handleDeleteTournament() {
    try {
      const res = await executeFetch({
        url: `/api/tournaments/${id}`,
        method: Method.DELETE,
      });

      if (res === null) {
        return;
      }

      if (!isLoading && isError) {
        toast({
          title: "Couldn't delete the tournaments",
          description:
            "An error occurred during the suppression of the tournaments.",
          variant: "destructive",
        });
      }
      router.push("/user/");
      toast({
        title: "Deleted successfully !",
        description: "You’ve successfully deleted the tournament.",
      });
    } catch (error) {
      toast({
        title: "Unexpected error: " + error,
        description: "Unexpected error during the suppression of a tournament.",
        variant: "destructive",
      });
      console.error(
        "Unexpected error during the suppression of a tournament:",
        error,
      );
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleAddPointsToTournament();
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
    setOpenPoints(false);
  }

  function handleUpdate(e: React.FormEvent) {
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
    setOpenEdit(false);
  }

  const handleDisabled = () => {
    if (updatedTournament.name == "") return true;

    return updatedTournament.teams.some((team) => {
      return (
        team.name === "" ||
        team.color.toLowerCase() === "#ffffff" ||
        team.color === ""
      );
    });
  };

  const handleTeamChange = (
    index: number,
    field: "name" | "color",
    value: string,
  ) => {
    const newUpdatedTeams = updatedTournament.teams.map((team, i) =>
      i === index ? { ...team, [field]: value } : team,
    );

    const newUpdatedPoints = updatedTournament.points?.map((point) => {
      if (point.team.name === updatedTournament.teams[index].name) {
        return {
          ...point,
          team: {
            ...point.team,
            [field]: value,
          },
        };
      }
      return point;
    });

    setUpdatedTournament((prev) => ({
      ...prev,
      teams: newUpdatedTeams,
      points: newUpdatedPoints,
    }));
  };

  useEffect(() => {
    handleGetTournamentById();
  }, []);

  useEffect(() => {
    if (Array.isArray(tournament.points)) {
      const results = tournament?.points.filter((point) =>
        point.reason.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredPoints(results);
    }
  }, [tournament, searchTerm, tournament.points]);

  if (isLoading || tournament.name == "") {
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
        title={tournament.name}
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
                <form onSubmit={handleUpdate} className="grid gap-4">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Tournament Name</Label>
                      <Input
                        id="name"
                        value={updatedTournament.name}
                        disabled
                      />
                    </div>
                    {updatedTournament.teams.map((team, index) => (
                      <div
                        key={index}
                        className="flex w-full flex-col space-y-1.5"
                      >
                        <Label htmlFor={`update-team-name-${index}`}>
                          Team {index + 1} : Name and Color
                        </Label>
                        <div key={index} className="flex flex-row gap-4">
                          <Input
                            id={`update-team-name-${index}`}
                            value={team.name}
                            onChange={(e) =>
                              handleTeamChange(index, "name", e.target.value)
                            }
                            placeholder="Team name"
                            required
                          />
                          <div>
                            <ColorPicker
                              id={`update-team-color-${index}`}
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
                  <DialogFooter className="sm:justify-between">
                    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </DialogTrigger>
                      <DialogContent className="flex flex-col rounded-md max-w-[280px] sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Delete {tournament.name}</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this tournament ?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-between">
                          <Button
                            variant="outline"
                            onClick={() => setOpenDelete(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteTournament}
                          >
                            Confirm delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={handleDisabled()}
                    >
                      Update
                    </Button>
                  </DialogFooter>
                </form>
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
            {Array.isArray(tournament.points) && (
              <Carousel
                className="w-full h-full flex justify-center items-center"
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 10000 })]}
              >
                <CarouselContent className="flex md:w-full md:h-full gap-4">
                  <CarouselItem className="w-[160px] h-[240px] md:h-full">
                    <PieChartComponent tournament={tournament} />
                  </CarouselItem>
                  <CarouselItem className="w-[160px] h-[240px] md:h-full">
                    <BarChartComponent tournament={tournament} />
                  </CarouselItem>
                  <CarouselItem className="w-[160px] h-[240px] md:h-full">
                    <RadialChartComponent tournament={tournament} />
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
              {Array.isArray(tournament.points) && filteredPoints ? (
                <div className="flex flex-col gap-4 p-2">
                  {filteredPoints.map((point, index) => (
                    <PointsPreview
                      point={point}
                      key={index}
                      handleRemovePointsToTournament={
                        handleRemovePointsToTournament
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
