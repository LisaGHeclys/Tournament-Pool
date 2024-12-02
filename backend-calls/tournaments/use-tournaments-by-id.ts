import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { useQuery } from "@tanstack/react-query";
import { tournamentBody } from "@/types/types";

type Props = {
  id: string;
  refetchInterval?: number;
  isShow?: boolean;
};

export function useTournamentsById({ id, refetchInterval, isShow }: Props) {
  async function getTournamentsByIdFn(id: string) {
    const response = await apiClient.get(`/tournaments/${id}`);
    response.data.points =
      response.data.points.length > 45 && isShow
        ? response.data.points.slice(0, 45)
        : response.data.points;
    return response.data as tournamentBody;
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.tournament(id),
    queryFn: () => getTournamentsByIdFn(id),
    refetchInterval: refetchInterval ?? 0,
  });
}
