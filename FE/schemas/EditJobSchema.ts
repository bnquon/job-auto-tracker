import { z } from "zod"

export const editJobApplicationSchema = z.object({
  company_name: z.string().nullable(),
  title: z.string().nullable(),
  link: z.string().nullable(),
  status: z.enum(["applied", "received_oa", "rejected", "interviewing", "offered", "ghosted"]),
  notes: z.string().nullable()
});