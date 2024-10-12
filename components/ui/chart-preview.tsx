import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { tournamentBody } from "@/app/api/_helpers/types/interfaces";

type ChartPreviewProps = {
  tournament?: tournamentBody;
};

export default function ChartPreview({ tournament }: ChartPreviewProps) {
  return (
    <Card className="w-full h-[100px]">
      <CardHeader>
        <CardTitle>{tournament?.name ?? "Title of the pool"}</CardTitle>
        <CardDescription>Description of the pool</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {/*TODO: preview of the chart*/}
      </CardContent>
    </Card>
  );
}
