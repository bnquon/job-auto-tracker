import { updateApplication } from "@/api/applications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { EditJobApplication } from "types/EditJobApplication";

interface UpdateApplicationInput {
  jobId: number;
  updatedData: EditJobApplication;
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
