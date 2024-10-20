import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { tournamentBody } from "@/app/api/_helpers/types/types";
import PieChartComponent from "@/components/ui/pie-chart";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ChartPreviewProps = {
  height?: string;
  tournament: tournamentBody;
};

export default function ChartPreview({
  height,
  tournament,
}: ChartPreviewProps) {
  const router = useRouter();

  return (
    <Button
      className={`w-full h-[${height ?? "240"}px] flex`}
      variant="ghost"
      onClick={() => {
        router.push("/user/tournament/" + tournament.id);
      }}
    >
      <Card
        className={`w-full h-full flex flex-row justify-between drop-shadow-md`}
      >
        <CardHeader className="w-1/2 gap-2 items-start justify-between flex">
          <div className="w-full flex gap-2 items-start flex-col">
            <CardTitle>{tournament.name}</CardTitle>
            <Separator />
            <CardDescription className="flex gap-4 flex-col font-medium">
              {tournament.teams.map((team, index) => (
                <span key={index} className="flex">
                  Team {index + 1} : {team.name}
                </span>
              ))}
            </CardDescription>
          </div>
          <span className="flex">Created by : {tournament.createdBy}</span>
        </CardHeader>
        <div className="flex h-full p-4 w-1/2">
          <PieChartComponent tournament={tournament} />
        </div>
      </Card>
    </Button>
  );
}
