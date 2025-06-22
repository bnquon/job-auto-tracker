type ApplicationStatus =
  | "applied"
  | "received_oa"
  | "rejected"
  | "interviewing"
  | "offered"
  | "ghosted";

export interface UpdateJobApplicationInfo {
  company_name: string | null
  title: string | null
  status: ApplicationStatus | null
  link: string | null
  notes: string | null
}