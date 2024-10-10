"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import ChartPreview from "@/components/ui/chart-preview";

export default function Tournament() {
  const router = useRouter();

  return (
    <div className="min-h-screen md:max-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 w-full h-fit flex flex-wrap sm:flex-row justify-between">
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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <main className="w-full h-full flex gap-8 items-center">
        <Card className="flex flex-col p-8 px-16 w-2/3 h-full">
          <CardHeader>
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
              <Button>
                <Plus />
              </Button>
            </div>
            <ScrollArea className="w-full h-[500px] px-2">
              <div className="flex flex-col gap-4 p-2">
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
                <ChartPreview />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
