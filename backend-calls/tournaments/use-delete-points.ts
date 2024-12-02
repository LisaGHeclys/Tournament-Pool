import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { toast } from "@/hooks/use-toast";
import { tournamentBody } from "@/types/types";
import { useTranslations } from "next-intl";

interface Props {
  id: string;
}

export function useDeletePoints({ id }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations();

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
        title: t("toast.delete-points-success.title"),
        description: t("toast.delete-points-success.description"),
      });
    },
    onError: () => {
      toast({
        title: t("toast.delete-points-fail.title"),
        description: t("toast.delete-points-fail.description"),
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
  });
}
