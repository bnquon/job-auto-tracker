import { addJobCycle } from "@/api/cycles";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddJobCycle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addJobCycle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobCycle"] });
      toast.success("Cycle added");
    },
  });
};
