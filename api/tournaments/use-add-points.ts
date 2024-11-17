import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/api";
import { toast } from "@/hooks/use-toast";
import { tournamentBody } from "@/app/api/_helpers/types/types";

export interface Props {
  // closeModal: () => void;
  id: string;
}

export function useAddPoints({ id }: Props) {
  const queryClient = useQueryClient();

  const addPointsFn = async (updatedTournament: tournamentBody) => {
    return await apiClient.patch(`/tournaments/${id}`, updatedTournament);
  };

  return useMutation({
    mutationFn: addPointsFn,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: tournamentsQueryKeys.tournament(id),
      });
    },
    onSuccess: () => {
      toast({
        title: "Points added successfully !",
        description: "You’ve successfully add points to the tournament.",
      });
    },
    onError: () => {
      toast({
        title: "Couldn't add points to the tournaments",
        description:
          "An error occurred during the update of the points of the tournaments.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
  });
}
