import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { pointsBody } from "@/app/api/_helpers/types/types";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type PointsPreviewProps = {
  point: pointsBody;
};

export default function PointsPreview({ point }: PointsPreviewProps) {
  return (
    <Card className="w-full h-full flex justify-between drop-shadow-lg dark:shadow-white">
      <CardHeader className="w-full gap-2 items-start justify-between flex">
        <div className="w-[160px] sm:w-full flex gap-2 items-start flex-col">
          <div className="w-full flex items-center justify-between rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <CardTitle className="font-extrabold">{point.reason}</CardTitle>
            <Button
              className="rounded-full hover:scale-115 transition ease-in-out delay-250"
              variant="ghost"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full flex gap-2 items-start flex-col md:flex-row justify-between">
            <CardTitle>{point.points}</CardTitle>
          </div>
          <Separator />
        </div>
        <span className="flex text-xs md:text-sm">
          Team : {point.team.name}
        </span>
        <span className="flex text-xs md:text-sm">
          Created by : {point.createdBy}
        </span>
      </CardHeader>
    </Card>
  );
}
