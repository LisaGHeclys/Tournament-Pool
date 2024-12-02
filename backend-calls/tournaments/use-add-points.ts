import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { toast } from "@/hooks/use-toast";
import { tournamentBody } from "@/types/types";
import { useTranslations } from "next-intl";

export interface Props {
  id: string;
}

export function useAddPoints({ id }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations();

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
        title: t("toast.add-points-success.title"),
        description: t("toast.add-points-success.description"),
      });
    },
    onError: () => {
      toast({
        title: t("toast.add-points-fail.title"),
        description: t("toast.add-points-fail.description"),
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
  });
}
