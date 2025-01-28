import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { useQuery } from "@tanstack/react-query";

export function useLatestTournaments() {
  async function getPaginatedTournamentsFn() {
    const response = await apiClient.get(`/tournaments/latest`);
    return response.data as Response;
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.tournaments(),
    queryFn: () => getPaginatedTournamentsFn(),
  });
}
