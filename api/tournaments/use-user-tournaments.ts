import { apiClient, tournamentsQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { tournamentBody } from "@/app/api/_helpers/types/types";

export function useUserTournaments() {
  async function getUserTournaments() {
    const response = await apiClient.get(`/tournaments/my`);
    return response.data.tournaments as tournamentBody[];
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.userTournaments(),
    queryFn: () => getUserTournaments(),
  });
}
