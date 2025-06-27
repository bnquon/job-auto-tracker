import { deleteJobCycle } from "@/api/cycles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteJobCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobCycle"],
      });
    },
  })
};