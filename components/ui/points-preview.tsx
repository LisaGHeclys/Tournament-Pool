import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { tournamentBody } from "@/app/api/_helpers/types/types";
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
      className={`w-full h-[180px] flex`}
      variant="ghost"
      onClick={() => {
        router.push(link + tournament.id);
      }}
    >
      <Card
        className={`w-full h-full flex flex-row justify-between drop-shadow-md`}
      >
        <CardHeader className="w-1/2 gap-2 items-start justify-between flex">
          <div className="w-full flex gap-2 items-start flex-col">
            <CardTitle>{tournament.name}</CardTitle>
            <Separator />
            <CardDescription className="flex gap-2 flex-col font-medium">
              {tournament.teams.map((team, index) => (
                <span key={index} className="flex">
                  Team {index + 1} : {team.name}
                </span>
              ))}
            </CardDescription>
          </div>
          <span className="flex">Created by : {tournament.createdBy}</span>
        </CardHeader>
      </Card>
    </Button>
  );
}
