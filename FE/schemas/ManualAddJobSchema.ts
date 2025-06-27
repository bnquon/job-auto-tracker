import { z } from "zod";

export const manualAddJobApplicationSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  title: z.string().min(1, "Job title is required"),
  link: z.string().nullable(),
  status: z.enum(["applied", "received_oa", "rejected", "interviewing", "offered", "ghosted"]),
  notes: z.string().nullable()
});