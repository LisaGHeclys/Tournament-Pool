import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { toast } from "@/hooks/use-toast";
import { tournamentBody } from "@/types/types";
import { useTranslations } from "next-intl";

interface Props {
  id: string;
}

export function useEditTournament({ id }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations();

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
        title: t("toast.edit-tournament-success.title"),
        description: t("toast.edit-tournament-success.description"),
      });
      return {
        previousTournament: previousTournament,
        updateTournament: updateTournament,
      };
    },
    onError: (updatedTournament: tournamentBody) => {
      toast({
        title: t("toast.edit-tournament-fail.title"),
        description: t("toast.edit-tournament-fail.description"),
        variant: "destructive",
      });
      queryClient.setQueryData(
        tournamentsQueryKeys.tournament(id),
        updatedTournament,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
  });
}
