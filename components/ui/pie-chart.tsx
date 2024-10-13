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
import { tournamentBody } from "@/app/api/_helpers/types/interfaces";

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

  console.log(tournament.name, chartData, chartConfig);

  return (
    <Card className="w-full h-full flex flex-col p-4">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
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
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
