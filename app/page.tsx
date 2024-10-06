"use client";
import { Copyright, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  return (
    <SessionProvider>
      <div className="min-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="p-8 w-full h-fit flex flex-wrap sm:flex-row justify-between">
          <div />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to this page !
          </h1>
          {
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </Button>
          }
        </header>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <p className="flex items-center gap-2">
            <Copyright width={16} height={16} />
            All rights reserved
          </p>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/LisaGHeclys"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github width={16} height={16} />
            Github
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://lisamlglaziou.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe width={16} height={16} />
            Go see my other projects →
          </a>
        </footer>
      </div>
    </SessionProvider>
  );
}
