import { getAllJobCycles } from "@/api/cycles";
import { useQuery } from "@tanstack/react-query";

export const useJobCycle = () => {
  return useQuery({
    queryKey: ["jobCycle"],
    queryFn: getAllJobCycles,
  });
};