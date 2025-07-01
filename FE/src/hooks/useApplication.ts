import { useQuery } from "@tanstack/react-query";
import { getJobApplicationsByCycle } from "@/api/applications";

export function useJobApplicationsByCycle(jobCycleId: number | undefined) {
  return useQuery({
    enabled: !!jobCycleId,
    queryKey: ["applications", jobCycleId],
    queryFn: () => getJobApplicationsByCycle(jobCycleId),
  });
}
