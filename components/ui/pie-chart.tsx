"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { tournamentBody } from "@/app/api/_helpers/types/types";

type PieChartProps = {
  tournament: tournamentBody;
};

export default function PieChartComponent({ tournament }: PieChartProps) {
  const chartData = tournament.teams.map((team) => ({
    teamName: team.name,
    teamPoints: team.points?.reduce((a, b) => a + b, 0) || 50,
    fill: team.color,
  }));

  const chartConfig = tournament.teams.reduce((config, team) => {
    config[team.name.toLowerCase().replace(/\s+/g, "")] = {
      label: team.name,
      color: team.color,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className="w-full justify-center h-full flex flex-col p-4">
      <CardContent className="h-full w-full flex-auto justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-w-lg aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="teamPoints"
              label
              nameKey="teamName"
              innerRadius={80}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
