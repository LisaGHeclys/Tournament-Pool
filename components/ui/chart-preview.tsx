import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { tournamentBody } from "@/app/api/_helpers/types/interfaces";
import PieChartComponent from "@/components/ui/pie-chart";
import { Separator } from "@/components/ui/separator";

type ChartPreviewProps = {
  height?: string;
  tournament: tournamentBody;
};

export default function ChartPreview({
  height,
  tournament,
}: ChartPreviewProps) {
  return (
    <Card
      className={`w-full h-[${height ?? "240"}px] flex flex-row justify-between drop-shadow-md`}
    >
      <CardHeader className="w-1/2 gap-2">
        <CardTitle>{tournament.name}</CardTitle>
        <Separator />
        <CardDescription className="flex gap-4 flex-col font-medium">
          {tournament.teams.map((team, index) => (
            <h2 key={index}>
              Team {index + 1} : {team.name}
            </h2>
          ))}
        </CardDescription>
      </CardHeader>
      <div className="flex h-full p-4 w-1/2">
        <PieChartComponent tournament={tournament} />
      </div>
    </Card>
  );
}
