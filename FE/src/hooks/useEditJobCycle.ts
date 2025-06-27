import { editJobCycle } from "@/api/cycles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateJobCycle } from "types/JobCycle";

interface UpdateJobCycleInput {
  jobCycleId: number;
  updatedData: UpdateJobCycle;
}

export const useEditJobCycle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobCycleId, updatedData }: UpdateJobCycleInput) =>
      editJobCycle(jobCycleId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobCycle"],
      });
    },
  });
};
