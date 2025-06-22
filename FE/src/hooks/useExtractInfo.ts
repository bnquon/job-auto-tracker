import { extractInfo } from "@/api/applications";
import { useMutation } from "@tanstack/react-query";

interface ExtractInfoInput {
  file: File;
}

export function useExtractInfo() {
  return useMutation({
    mutationFn: ({ file }: ExtractInfoInput) => extractInfo(file),
  });
}
