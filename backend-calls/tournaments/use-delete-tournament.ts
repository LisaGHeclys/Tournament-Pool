import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { toast } from "@/hooks/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useTranslations } from "next-intl";

interface Props {
  router: AppRouterInstance;
  closeModal: () => void;
  locale: string;
}

export function useDeleteTournament({ router, closeModal, locale }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const deleteTournamentFn = async (id: string) => {
    return await apiClient.delete(`/tournaments/${id}`);
  };

  return useMutation({
    mutationFn: deleteTournamentFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: tournamentsQueryKeys.all });
    },
    onSuccess: () => {
      toast({
        title: t("toast.delete-tournament-success.title"),
        description: t("toast.delete-tournament-success.description"),
      });
    },
    onError: () => {
      toast({
        title: t("toast.delete-tournament-fail.title"),
        description: t("toast.delete-tournament-fail.description"),
        variant: "destructive",
      });
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
      router.push(`/${locale}/user/`);
      closeModal();
    },
  });
}
