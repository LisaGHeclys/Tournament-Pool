"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/charts/chart";
import {
  ChartProps,
  createChartConfig,
  createChartData,
} from "@/components/ui/charts/utils";
import { useWindowSize } from "@/hooks/use-window-size";

export function RadialChartComponent({ tournament }: ChartProps) {
  const size = useWindowSize();
  const chartData = createChartData({ tournament });
  const chartConfig = createChartConfig({ tournament });

  return (
    <Card className="w-full justify-center h-full flex p-1 sm:p-4">
      <CardContent className="md:w-full md:h-full flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="w-full max-w-xs md:max-w-lg flex justify-center"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={size.width <= 425 ? 55 : 70}
            outerRadius={size.width <= 425 ? 110 : 260}
            className="h-[96%] w-[96%] p-4 sm:p-0"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <RadialBar dataKey="teamPoints" background>
              <LabelList
                position="insideStart"
                dataKey="teamName"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
