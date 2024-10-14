import {
  Card,
  CardDescription,
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
        <CardHeader className="w-1/2 gap-2 items-start flex">
          <CardTitle>{tournament.name}</CardTitle>
          <Separator />
          <CardDescription className="flex gap-4 flex-col font-medium">
            {tournament.teams.map((team, index) => (
              <span key={index}>
                Team {index + 1} : {team.name}
              </span>
            ))}
          </CardDescription>
        </CardHeader>
        <div className="flex h-full p-4 w-1/2">
          <PieChartComponent tournament={tournament} />
        </div>
      </Card>
    </Button>
  );
}
