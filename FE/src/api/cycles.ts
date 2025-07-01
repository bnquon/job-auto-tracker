import { api } from "@/utils/axios";
import type {
  CreateJobCycle,
  JobCycleResponse,
  UpdateJobCycle,
} from "types/JobCycle";

export async function getAllJobCycles(): Promise<JobCycleResponse[]> {
  const { data } = await api.get("job_cycles/");
  console.log("api get all cycles", data);
  return data;
}

export async function editJobCycle(
  jobCycleId: number,
  updatedData: UpdateJobCycle
) {
  const { data } = await api.put(`job_cycles/${jobCycleId}`, updatedData);
  return data;
}

export async function deleteJobCycle(jobCycleId: number) {
  const { data } = await api.delete(`job_cycles/${jobCycleId}`);
  return data;
}

export async function addJobCycle(newJobCycle: CreateJobCycle) {
  const { data } = await api.post("job_cycles", newJobCycle);
  return data;
}
