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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { tournamentBody } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChartPreview from "@/components/charts/chart-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { UserNav } from "@/components/navbar/user-nav";
import { useUserTournaments } from "@/backend-calls";
import { CreateTournamentForm } from "@/components/forms/create-tournament-form";

export default function User() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTournaments, setFilteredTournaments] =
    useState<tournamentBody[]>();
  const { data, isFetching } = useUserTournaments();

  useEffect(() => {
    if (data) {
      const results = data.filter((tournament) =>
        tournament.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredTournaments(results);
    }
  }, [data, searchTerm]);

  if (isFetching) {
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
      <UserNav title={`Welcome back ${session?.user?.name} !`} avatar />
      <main className="w-full h-full flex gap-2 md:gap-6 items-center">
        <Card className="flex flex-col p-2 md:px-16 w-full h-full">
          <CardHeader className="p-2 pb-4 md:p-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/public">Home</BreadcrumbLink>
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
            <div className="lg:px-32 w-full flex items-center justify-center flex-col-reverse md:flex-row gap-2 md:gap-8">
              <div className="relative w-full md:w-2/3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for a pool..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  <CreateTournamentForm setOpen={setOpen} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex w-full justify-center">
              <ScrollArea className="w-full lg:w-2/3 h-[560px] md:px-2">
                {data && filteredTournaments ? (
                  <div className="flex flex-col gap-2 md:gap-4 md:p-2">
                    {filteredTournaments.map((tournament, index) => (
                      <ChartPreview
                        key={index}
                        tournament={tournament}
                        link={"/user/tournament/"}
                      />
                    ))}
                  </div>
                ) : (
                  <h1 className="flex items-center justify-center text-xs md:text-md font-extrabold lg:text-xl text-muted-foreground ">
                    You have no tournaments yet !
                  </h1>
                )}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
