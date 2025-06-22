import { api } from "@/utils/axios";
import type {
  ReceivedExtractedJobInfo,
  ReceivedJobApplicationInfo,
  UpdateJobApplicationInfo,
} from "types/JobApplication";

export async function getAllApplications(): Promise<
  ReceivedJobApplicationInfo[]
> {
  const { data } = await api.get("/job_applications");
  return data;
}

export async function updateApplication(
  jobId: number,
  updatedData: UpdateJobApplicationInfo
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
  const { data } = await api.post("/job_applications/extract", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function addApplication(newJobInfo: UpdateJobApplicationInfo) {
  const { data } = await api.post("/job_applications", newJobInfo);
  return data;
}
