import { addApplication } from "@/api/applications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAddApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      toast.success("Application added");
    },
    onError: () => {
      toast.error("Failed to add application");
    },
  });
}
