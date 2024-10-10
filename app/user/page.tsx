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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "@/components/ui/footer";
import { Plus, Search } from "lucide-react";

export default function User() {
  return (
    <div className="min-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 w-full h-fit flex flex-wrap sm:flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome back pookie !
        </h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <main className="w-full h-full flex gap-8 items-center">
        <Card className="m-16 p-8 px-16 w-full h-full ">
          <CardHeader>
            <CardTitle>Your tournaments ?</CardTitle>
            <CardDescription>
              You can create tournaments here and find your previous ones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <div className="lg:px-32 w-full flex flex-row gap-8">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search a pool..."
                    className="w-full rounded-lg bg-background pl-8"
                  />
                </div>
                <Button>
                  <Plus />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
