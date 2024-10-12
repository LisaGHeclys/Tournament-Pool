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

const chartData = [
  { teamName: "team1", teamPoints: 275, fill: "var(--color-team1)" },
  { teamName: "team2", teamPoints: 200, fill: "var(--color-team2)" },
  { teamName: "team3", teamPoints: 287, fill: "var(--color-team3)" },
  { teamName: "team4", teamPoints: 173, fill: "var(--color-team4)" },
];

const chartConfig = {
  teamPoints: {
    label: "Teams Points",
  },
  team1: {
    label: "Team 1",
    color: "hsl(var(--chart-1))",
  },
  team2: {
    label: "Team 2",
    color: "hsl(var(--chart-2))",
  },
  team3: {
    label: "Team 3",
    color: "hsl(var(--chart-3))",
  },
  team4: {
    label: "Team 4",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function PieChartComponent() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="teamPoints"
              nameKey="teamName"
              innerRadius={60}
              strokeWidth={5}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
