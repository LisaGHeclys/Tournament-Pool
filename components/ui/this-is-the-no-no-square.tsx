"use client";
import { useSession } from "next-auth/react";
import PulseLoader from "@/components/ui/pulse-loader";
import { redirect } from "next/navigation";

export default function ThisIsTheNoNoSquare({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();

  switch (status) {
    case "loading":
      return (
        <div className="min-h-screen flex justify-center">
          <PulseLoader />
        </div>
      );
    case "authenticated":
      return children;
    default:
      redirect("/");
  }
}
