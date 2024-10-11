"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import React from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("github", { redirectTo: "/user" });
  };

  return (
    <div className="min-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 w-full h-fit flex flex-wrap sm:flex-row items-center justify-between">
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Homepage
        </Button>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to the Login page !
        </h1>
        <div />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              On this app, we’ll use your GitHub account to securely log you in,
              so you don’t need to create a new password.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <form onSubmit={handleSignIn}>
              <Button type="submit">
                <Github className="mr-2" /> Login with GitHub
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
