import { api } from "@/utils/axios";
import type { UpdateJobApplicationInfo } from "types/JobApplication";

export async function getAllApplications() {
  const { data } = await api.get("/job_applications")
  return data
}

export async function updateApplication(jobId: number, updatedData: UpdateJobApplicationInfo) {
  const { data } = await api.put(`/job_applications/${jobId}`, updatedData)
  return data
}

export async function deleteApplication(jobId: number) {
  const { data } = await api.delete(`/job_applications/${jobId}`)
  return data
}

export async function extractInfo(applicationImage: File) {
  const formData = new FormData();
  formData.append("applicationImage", applicationImage);
  const { data } = await api.post("/job_applications/extract", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}