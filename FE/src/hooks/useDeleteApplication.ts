import { deleteApplication } from "@/api/applications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['applications']
      });
      toast.success("Application deleted");
    },
  });
}
