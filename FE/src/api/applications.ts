import { api } from "@/utils/axios";
import type {
  ReceivedExtractedJobInfo,
  ReceivedJobApplicationInfo,
} from "types/JobApplication";
import type { EditJobApplication } from "types/EditJobApplication";
import type { ManualJobApplicationObject } from "types/ManualJobApplication";

export async function getJobApplicationsByCycle(
  jobCycleId: number
): Promise<ReceivedJobApplicationInfo[]> {
  const { data } = await api.get(`/job_applications/by_cycle/${jobCycleId}`);
  return data;
}

export async function updateApplication(
  jobId: number,
  updatedData: EditJobApplication
) {
  const { data } = await api.put(`/job_applications/${jobId}`, updatedData);
  return data;
}

export async function deleteApplication(jobId: number) {
  const { data } = await api.delete(`/job_applications/${jobId}`);
  return data;
}

export async function extractInfo(
  applicationImage: File
): Promise<ReceivedExtractedJobInfo> {
  const formData = new FormData();
  formData.append("job_application_image", applicationImage);

  // Remove the explicit Content-Type header - let browser set it
  const { data } = await api.post("/job_applications/extract", formData);
  return data;
}

export async function addApplication(newJobInfo: ManualJobApplicationObject) {
  const { data } = await api.post("/job_applications", newJobInfo);
  return data;
}
