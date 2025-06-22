import { extractInfo } from "@/api/applications";
import { useMutation } from "@tanstack/react-query";

export function useExtractInfo() {
  return useMutation({
    mutationFn: extractInfo,
  });
}
