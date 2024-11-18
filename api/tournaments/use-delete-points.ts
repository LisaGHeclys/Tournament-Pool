import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/api";
import { toast } from "@/hooks/use-toast";
import { tournamentBody } from "@/app/api/_helpers/types/types";

interface Props {
  id: string;
}

export function useDeletePoints({ id }: Props) {
  const queryClient = useQueryClient();

  const deletePointsFn = async (updatedTournament: tournamentBody) => {
    return await apiClient.patch(`/tournaments/${id}`, updatedTournament);
  };

  return useMutation({
    mutationFn: deletePointsFn,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: tournamentsQueryKeys.tournament(id),
      });
    },
    onSuccess: () => {
      toast({
        title: "Points successfully deleted !",
        description: "You’ve successfully deleted points of the tournament.",
      });
    },
    onError: () => {
      toast({
        title: "Couldn't delete the points to the tournaments",
        description:
          "An error occurred during the suppression of the points of the tournaments.",
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
  });
}
