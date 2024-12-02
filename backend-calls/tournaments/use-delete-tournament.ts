import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, tournamentsQueryKeys } from "@/backend-calls";
import { toast } from "@/hooks/use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  router: AppRouterInstance;
  closeModal: () => void;
  locale: string;
}

export function useDeleteTournament({ router, closeModal, locale }: Props) {
  const queryClient = useQueryClient();

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
        title: "Deleted successfully !",
        description: "You’ve successfully deleted the tournament.",
      });
    },
    onError: () => {
      toast({
        title: "Couldn't delete the tournaments",
        description:
          "An error occurred during the suppression of the tournaments.",
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
