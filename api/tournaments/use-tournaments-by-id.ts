import { apiClient, tournamentsQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { tournamentBody } from "@/app/api/_helpers/types/types";

type Props = {
  id: string;
};

export function useTournamentsById({ id }: Props) {
  async function getTournamentsByIdFn(id: string) {
    const response = await apiClient.get(`/tournaments/${id}`);
    return response.data as tournamentBody;
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.tournament(id),
    queryFn: () => getTournamentsByIdFn(id),
  });
}
