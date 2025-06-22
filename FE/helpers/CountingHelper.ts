import {
  activeStatuses,
  type ReceivedJobApplicationInfo,
  responseRateStatuses,
} from "../types/JobApplication";

interface ICountingHelper {
  data: ReceivedJobApplicationInfo[];
}

export function CountingHelper({ data }: ICountingHelper) {
  const numActive = data.filter((app) =>
    activeStatuses.includes(app.status)
  ).length;
  const numTotal = data.length;
  const numResponseRate = data.filter((app) =>
    responseRateStatuses.includes(app.status)
  ).length;

  return { numActive, numTotal, numResponseRate };
}
