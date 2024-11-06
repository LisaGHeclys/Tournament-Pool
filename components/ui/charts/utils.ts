import { tournamentBody } from "@/app/api/_helpers/types/types";
import { ChartConfig } from "@/components/ui/chart";

export type ChartProps = {
  tournament: tournamentBody;
};

export function createChartData({ tournament }: ChartProps) {
  return tournament.teams.map((team) => {
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
}

export function createChartConfig({ tournament }: ChartProps) {
  return tournament.teams.reduce((config, team) => {
    config[team.name.toLowerCase().replace(/\s+/g, "")] = {
      label: team.name,
      color: team.color,
    };
    return config;
  }, {} as ChartConfig);
}
