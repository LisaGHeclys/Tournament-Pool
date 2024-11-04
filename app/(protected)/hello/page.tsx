"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Hello() {
  return (
    <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <header className="md:p-8 w-full md:h-fit flex flex-row items-center justify-between">
        <h1 className="text-2xl md:text-4xl scroll-m-20 font-extrabold tracking-tight lg:text-5xl">
          Hi, first time around ?
        </h1>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Registration</CardTitle>
            <CardDescription>
              This is your first time on our app, we will need some information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="By default we use your github username"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="how-find">
                    How did you find my project ?
                  </Label>
                  <Select required>
                    <SelectTrigger id="how-find">
                      <SelectValue placeholder="example: GitHub" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="github">GitHub</SelectItem>
                      <SelectItem value="my-website">My Website</SelectItem>
                      <SelectItem value="linkedin">Linkedin</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Next</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
