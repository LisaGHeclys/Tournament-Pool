"use client";

import * as React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { tournamentBody } from "@/app/api/_helpers/types/types";
import { useWindowSize } from "@/hooks/useWindowSize";

type PieChartProps = {
  tournament: tournamentBody;
};

export default function PieChartComponent({ tournament }: PieChartProps) {
  const size = useWindowSize();
  const chartData = tournament.teams.map((team) => {
    const totalPoints = Array.isArray(tournament.points)
      ? tournament.points
          .filter((point) => point.team.name === team.name)
          .reduce((acc, curr) => acc + curr.points, 0)
      : 0;
    return {
      teamName: team.name,
      teamPoints: totalPoints,
      fill: team.color,
    };
  });

  const chartConfig = tournament.teams.reduce((config, team) => {
    config[team.name.toLowerCase().replace(/\s+/g, "")] = {
      label: team.name,
      color: team.color,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card className="w-full justify-center h-full flex flex-col p-1 sm:p-4">
      <ResponsiveContainer className="w-full h-full flex">
        <ChartContainer
          config={chartConfig}
          className="h-[96%] w-[96%] max-w-xs md:max-w-lg flex justify-center aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart className="h-[96%] w-[96%] p-4 sm:p-0">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="teamPoints"
              label
              nameKey="teamName"
              innerRadius={size.width <= 425 ? 55 : 70}
            />
          </PieChart>
        </ChartContainer>
      </ResponsiveContainer>
    </Card>
  );
}
