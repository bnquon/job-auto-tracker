export type ApplicationStatus =
  | "applied"
  | "received_oa"
  | "rejected"
  | "interviewing"
  | "offered"
  | "ghosted";

export const activeStatuses: ApplicationStatus[] = [
  "applied",
  "received_oa",
  "interviewing",
];

export const responseRateStatuses: ApplicationStatus[] = [
  "interviewing",
  "received_oa",
]

export interface UpdateJobApplicationInfo {
  company_name: string | null;
  title: string | null;
  status: ApplicationStatus | null;
  link: string | null;
  notes: string | null;
}

export interface ReceivedExtractedJobInfo {
  company_name: string | null;
  title: string | null;
  link: string | null;
}

export interface ReceivedJobApplicationInfo {
  id: number;
  company_name: string;
  title: string;
  notes: string | null;
  updated_at: string;
  applied_on: string;
  status: ApplicationStatus;
}
