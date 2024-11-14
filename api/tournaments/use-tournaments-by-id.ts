import { apiClient, tournamentsQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: string;
};

export function useTournamentsById({ id }: Props) {
  async function getTournamentsByIdFn(id: string) {
    const response = await apiClient.get(id);
    return response.data;
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.userTournaments(id),
    queryFn: () => getTournamentsByIdFn(id),
  });
}
