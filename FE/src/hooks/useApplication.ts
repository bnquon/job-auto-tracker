import { useQuery } from "@tanstack/react-query";
import { getAllApplications } from "@/api/applications";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getAllApplications,
  });
}