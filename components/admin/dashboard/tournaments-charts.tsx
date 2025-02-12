"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/charts/chart";
import React from "react";
import { TournamentsByMonth } from "@/types/types";

export function getChartData(data: TournamentsByMonth) {
  const today = new Date();
  const chartData = [];

  for (let i = 11; i >= 0; i--) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = monthDate.getFullYear() + "-" + (monthDate.getMonth() + 1);

    chartData.push({
      month: monthKey,
      tournaments: data[monthKey] || 0,
    });
  }

  return chartData;
}

const chartConfig = {
  tournaments: {
    label: "Tournaments",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Props = {
  data: TournamentsByMonth;
};

export default function TournamentsCharts({ data }: Props) {
  const chartData = getChartData(data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tournaments by month</CardTitle>
        <CardDescription>
          The number of tournaments created the last year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="tournaments"
              type="natural"
              fill="var(--color-tournaments)"
              fillOpacity={0.4}
              stroke="var(--color-tournaments)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
