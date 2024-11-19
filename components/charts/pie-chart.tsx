"use client";
import * as React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/charts/chart";
import { useWindowSize } from "@/hooks/use-window-size";
import {
  ChartProps,
  createChartConfig,
  createChartData,
} from "@/components/charts/utils";

export default function PieChartComponent({ tournament }: ChartProps) {
  const size = useWindowSize();
  const chartData = createChartData({ tournament });
  const chartConfig = createChartConfig({ tournament });

  return (
    <Card className="w-full justify-center h-full flex flex-col p-1 sm:p-4">
      <ResponsiveContainer className="md:w-full md:h-full flex">
        <ChartContainer
          config={chartConfig}
          className="h-[96%] w-[96%] max-w-xs md:max-w-lg flex justify-center aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart className="h-[96%] w-[96%] md:p-4 sm:p-0">
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="teamPoints"
              label
              nameKey="teamName"
              innerRadius={size.width <= 425 ? 55 : 70}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="teamName" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </ResponsiveContainer>
    </Card>
  );
}
