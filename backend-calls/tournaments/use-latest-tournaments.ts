import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { useQuery } from "@tanstack/react-query";
import { tournamentBody } from "@/types/types";

export function useLatestTournaments() {
  async function getPaginatedTournamentsFn() {
    const response = await apiClient.get(`/tournaments/latest`);
    return response.data.tournaments as tournamentBody[];
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.tournaments(),
    queryFn: () => getPaginatedTournamentsFn(),
  });
}
