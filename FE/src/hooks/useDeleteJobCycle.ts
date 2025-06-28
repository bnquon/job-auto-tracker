import { deleteJobCycle } from "@/api/cycles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteJobCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobCycle"],
      });
      toast.success("Cycle deleted");
    },
  });
};
