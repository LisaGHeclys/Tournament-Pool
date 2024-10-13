import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { tournamentBody } from "@/app/api/_helpers/types/interfaces";
import PieChartComponent from "@/components/ui/pie-chart";

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
      <CardHeader className="w-1/2">
        <CardTitle>{tournament.name}</CardTitle>
        <CardDescription>Description of the pool</CardDescription>
      </CardHeader>
      <div className="flex h-full p-4 w-1/2">
        <PieChartComponent tournament={tournament} />
      </div>
    </Card>
  );
}
