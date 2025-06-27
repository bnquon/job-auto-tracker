export interface JobCycleResponse {
  id: number;
  user_id: number;
  date_created: string;
}

export interface CreateJobCycle {
  name: string;
}

export interface UpdateJobCycle {
  name: string;
}