"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { tournamentBody } from "@/types/types";
import PieChartComponent from "@/components/charts/pie-chart";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
type ChartPreviewProps = {
  tournament: tournamentBody;
  link: string;
};

export default function ChartPreview({ tournament, link }: ChartPreviewProps) {
  const router = useRouter();

  return (
    <Button
      className="w-full h-[460px] p-1 px-2 md:p-2 md:px-4 sm:h-[330px] flex hover:scale-[102%] transition ease-in-out delay-50"
      variant="ghost"
      onClick={() => {
        router.push(link + tournament.id);
      }}
    >
      <Card className="w-full h-full flex flex-col sm:flex-row justify-between drop-shadow-lg">
        <CardHeader className="h-1/2 sm:h-full w-full sm:w-1/2 pb-2 sm:pb-6 gap-1 sm:gap-2 items-start justify-between flex">
          <div className="w-full flex gap-2 items-start flex-col">
            <CardTitle>{tournament.name}</CardTitle>
            <Separator />
            <CardDescription className="flex gap-1 sm:gap-2 flex-col font-medium">
              {tournament.teams.map((team, index) => (
                <span key={index} className="flex">
                  Team {index + 1} : {team.name}
                </span>
              ))}
            </CardDescription>
          </div>
          <span className="flex">Created by : {tournament.createdBy}</span>
        </CardHeader>
        <div className="flex h-1/2 sm:h-full w-full sm:w-1/2 p-2 sm:p-4">
          <PieChartComponent tournament={tournament} />
        </div>
      </Card>
    </Button>
  );
}
