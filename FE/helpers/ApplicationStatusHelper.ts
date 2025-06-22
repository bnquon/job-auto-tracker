import type { ApplicationStatus } from "../types/JobApplication";

export function MapApplicationStatusToString(status: ApplicationStatus): string {
  switch (status) {
    case "received_oa":
      return "Received OA";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}