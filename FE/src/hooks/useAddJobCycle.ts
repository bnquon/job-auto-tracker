import { addJobCycle } from "@/api/cycles";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useAddJobCycle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addJobCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobCycle"] });
    },
  });
};
