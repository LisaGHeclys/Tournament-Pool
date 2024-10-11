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

export default function User() {
  const { data } = useSession();

  return (
    <div className="min-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 w-full h-fit flex flex-wrap items-center sm:flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome back {data?.user?.name} !
        </h1>
        <UserNav />
      </header>
      <main className="w-full h-full flex gap-8 items-center">
        <Card className="m-16 p-2 px-16 w-full h-full ">
          <CardHeader>
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
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="tournament-name">
                            Tournament Name
                          </Label>
                          <Input
                            id="tournament-name"
                            placeholder="Your tournament name"
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="team-number">
                            How many teams do you need ?
                          </Label>
                          <Input
                            id="team-number"
                            type="number"
                            placeholder="Your number of teams"
                            required
                          />
                        </div>
                      </div>
                    </form>
                    <DialogFooter className="flex">
                      <Button>Create a tournament</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
