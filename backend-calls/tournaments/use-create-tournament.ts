import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tournamentBody } from "@/types/types";
import { toast } from "@/hooks/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { useTranslations } from "next-intl";

interface Props {
  router: AppRouterInstance;
  closeModal: () => void;
  locale: string;
}

export function useCreateTournament({ router, closeModal, locale }: Props) {
  const queryClient = useQueryClient();
  const t = useTranslations();

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
        title: t("toast.create-tournament-success.title"),
        description: t("toast.create-tournament-success.description"),
      });
    },
    onError: (newTournament) => {
      toast({
        title: t("toast.create-tournament-fail.title"),
        description: t("toast.create-tournament-fail.description"),
        variant: "destructive",
      });
      queryClient.setQueryData(tournamentsQueryKeys.all, newTournament);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: tournamentsQueryKeys.all });
      closeModal();
      router.push(`/${locale}/user/tournament/` + data.id);
    },
  });
}
