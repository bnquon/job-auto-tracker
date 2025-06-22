import { deleteApplication } from "@/api/applications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['applications']
      });
    },
  });
}
