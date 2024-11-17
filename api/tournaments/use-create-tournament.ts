import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/api";
import { tournamentBody } from "@/app/api/_helpers/types/types";
import { toast } from "@/hooks/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface Props {
  router: AppRouterInstance;
  closeModal: () => void;
}

export function useCreateTournament({ router, closeModal }: Props) {
  const queryClient = useQueryClient();

  async function createTournamentFn(tournament: tournamentBody) {
    const response = await apiClient.put(`/tournaments`, tournament);
    console.log(response.data);
    return response.data;
  }

  return useMutation({
    mutationFn: createTournamentFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: tournamentsQueryKeys.all });
    },
    onSuccess: () => {
      toast({
        title: "Creation successful !",
        description: "You’ve successfully created a tournament.",
      });
    },
    onError: (newTournament) => {
      queryClient.setQueryData(tournamentsQueryKeys.all, newTournament);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
      // router.push("/user/tournament/" + data.id);
    },
  });
}
