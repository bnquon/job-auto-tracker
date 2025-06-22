import type { ApplicationStatus } from "../types/JobApplication"

interface IMapApplicationStatusToString {
  status: ApplicationStatus
}

export function MapApplicationStatusToString({ status }: IMapApplicationStatusToString): string {
  switch(status) {
    case "received_oa":
      return "Received OA"
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}