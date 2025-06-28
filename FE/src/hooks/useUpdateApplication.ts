import { updateApplication } from "@/api/applications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { UpdateJobApplicationInfo } from "types/JobApplication";

interface UpdateApplicationInput {
  jobId: number;
  updatedData: UpdateJobApplicationInfo;
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, updatedData }: UpdateApplicationInput) =>
      updateApplication(jobId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      toast.success("Application updated");
    },
  });
}
