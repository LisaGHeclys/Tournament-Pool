import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { TournamentsByMonth } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useYearTournaments() {
  async function getPaginatedTournamentsFn() {
    const response = await apiClient.get(`/tournaments/year`);
    return response.data.tournaments as TournamentsByMonth;
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.year(),
    queryFn: () => getPaginatedTournamentsFn(),
  });
}
