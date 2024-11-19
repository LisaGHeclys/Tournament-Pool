import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tournamentBody } from "@/types/types";
import { toast } from "@/hooks/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { apiClient, tournamentsQueryKeys } from "@/backend-calls";

interface Props {
  router: AppRouterInstance;
  closeModal: () => void;
}

export function useCreateTournament({ router, closeModal }: Props) {
  const queryClient = useQueryClient();

  async function createTournamentFn(tournament: tournamentBody) {
    const response = await apiClient.put(`/tournaments`, tournament);
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
      closeModal();
      router.push("/user/tournament/" + data.id);
    },
  });
}
