"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ChartProps,
  createChartConfig,
  createChartData,
} from "@/components/ui/charts/utils";

export function BarChartComponent({ tournament }: ChartProps) {
  const chartData = createChartData({ tournament });
  const chartConfig = createChartConfig({ tournament });

  return (
    <Card className="w-full justify-center h-full flex">
      <CardContent className="h-full w-full flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-[96%] w-[96%] max-w-xs md:max-w-sm flex items-center justify-center aspect-square pb-0"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 50,
            }}
            className="h-[90%] w-full p-4 sm:p-0"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="teamName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="teamPoints" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
