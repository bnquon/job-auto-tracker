import { extractInfo } from "@/api/applications";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useExtractInfo() {
  return useMutation({
    mutationFn: extractInfo,
    onError: () => {
      toast.error("Failed to extract info, please try again");
    }
  });
}
