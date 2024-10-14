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
import { useRouter } from "next/navigation";
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

export default function Tournament() {
  const router = useRouter();

  return (
    <div className="min-h-screen md:max-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 w-full h-fit flex flex-wrap items-center sm:flex-row justify-between">
        <Button
          className="rounded-full"
          size="icon"
          onClick={() => {
            router.push("/user");
          }}
        >
          <ChevronLeft />
        </Button>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Tournament : name
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
                  <BreadcrumbPage>Tournament ID</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CardTitle>This tournament charts</CardTitle>
            <CardDescription>
              Here you can see the different charts for this tournaments.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full justify-center flex">
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
        <Card className="py-8 px-16 w-1/3 max-h-full flex flex-col">
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
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
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="reason">What reason ?</Label>
                        <Input
                          id="reason"
                          placeholder="Write the reason to add points"
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="points-number">How many points?</Label>
                        <Input
                          id="points-number"
                          type="number"
                          placeholder="How many points do you want to add ?"
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="team-number">For which team ?</Label>
                        <Select>
                          <SelectTrigger id="team-number">
                            <SelectValue placeholder="Choose a team" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="team1">Team 1</SelectItem>
                            <SelectItem value="team2">Team 2</SelectItem>
                            <SelectItem value="team3">Team 3</SelectItem>
                            <SelectItem value="team4">Team 4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                  <DialogFooter className="flex">
                    <Button>Add points</Button>
                  </DialogFooter>
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
