import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { useQuery } from "@tanstack/react-query";
import { tournamentBody } from "@/types/types";

export function useUserTournaments() {
  async function getUserTournamentsFn() {
    const response = await apiClient.get(`/tournaments/my`);
    return response.data.tournaments as tournamentBody[];
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.userTournaments(),
    queryFn: () => getUserTournamentsFn(),
  });
}
