import { addApplication } from "@/api/applications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
}
