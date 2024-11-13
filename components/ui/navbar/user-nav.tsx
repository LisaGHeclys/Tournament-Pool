import { useSession } from "next-auth/react";
import { UserToggle } from "@/components/ui/navbar/user-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/navbar/theme/theme-toggle";

interface UserNavProps {
  title: string;
}

export function UserNav({ title }: UserNavProps): JSX.Element {
  const router = useRouter();
  const { status } = useSession();

  function handleUserNav() {
    switch (status) {
      case "authenticated":
        return (
          <div className="w-full md:w-fit flex flex-row gap-4 md:gap-6 items-center justify-end md:justify-center">
            <ThemeToggle />
            <UserToggle />
          </div>
        );
      case "loading":
        return <Skeleton className="h-8 w-8 rounded-full" />;
      default:
        return (
          <Button
            className="hover:scale-105 transition ease-in-out delay-250"
            onClick={() => router.push("/login")}
          >
            <span>Login</span>
          </Button>
        );
    }
  }
  return (
    <header className="gap-2 md:gap-0 md:p-8 w-full md:h-fit flex flex-col md:flex-row items-center justify-between">
      <div />
      <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      {handleUserNav()}
    </header>
  );
}
