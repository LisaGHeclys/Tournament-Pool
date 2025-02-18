import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { useQuery } from "@tanstack/react-query";
import { tournamentBody } from "@/types/types";

type Props = {
  page: number;
  pageLimit: number;
};

type Response = {
  tournaments: tournamentBody[];
  totalPages: number;
};

export function usePaginatedTournaments({ page, pageLimit }: Props) {
  async function getPaginatedTournamentsFn(page: number) {
    const response = await apiClient.get(
      `/tournaments?page=${page}&limit=${pageLimit}`,
    );
    return response.data as Response;
  }
  return useQuery({
    queryKey: tournamentsQueryKeys.pagination(page),
    queryFn: () => getPaginatedTournamentsFn(page),
  });
}
