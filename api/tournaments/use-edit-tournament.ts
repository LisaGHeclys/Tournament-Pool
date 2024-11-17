import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/api";
import { toast } from "@/hooks/use-toast";
import { tournamentBody } from "@/app/api/_helpers/types/types";

export interface Props {
  closeModal: () => void;
  id: string;
}

export function useEditTournament({ closeModal, id }: Props) {
  const queryClient = useQueryClient();

  const editTournamentFn = async (updatedTournament: tournamentBody) => {
    return await apiClient.patch(`/tournaments/${id}`, updatedTournament);
  };

  return useMutation({
    mutationFn: editTournamentFn,
    onMutate: async (updateTournament: tournamentBody) => {
      await queryClient.cancelQueries({
        queryKey: tournamentsQueryKeys.tournament(id),
      });
      const previousTournament = queryClient.getQueryData(
        tournamentsQueryKeys.tournament(id),
      );
      queryClient.setQueryData(
        tournamentsQueryKeys.tournament(id),
        updateTournament,
      );
      toast({
        title: "Updated successfully !",
        description: "You’ve successfully updated the tournament.",
      });
      return {
        previousTournament: previousTournament,
        updateTournament: updateTournament,
      };
    },
    onError: (updatedTournament: tournamentBody) => {
      toast({
        title: "Couldn't update the tournaments",
        description: "An error occurred during the update of the tournaments.",
        variant: "destructive",
      });
      queryClient.setQueryData(
        tournamentsQueryKeys.tournament(id),
        updatedTournament,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
      closeModal();
    },
  });
}
