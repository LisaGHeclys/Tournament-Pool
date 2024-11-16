import { apiClient, tournamentsQueryKeys } from "@/api";
import { useQuery } from "@tanstack/react-query";

type Props = {
  page: number;
  pageLimit: number;
};

export function usePaginatedTournaments({ page, pageLimit }: Props) {
  async function getPaginatedTournamentsFn(page: number) {
    const response = await apiClient.get(
      `/tournaments?page=${page}&limit=${pageLimit}`,
    );
    return response.data;
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.pagination(page),
    queryFn: () => getPaginatedTournamentsFn(page),
  });
}
