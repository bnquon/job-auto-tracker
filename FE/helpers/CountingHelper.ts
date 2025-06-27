import {
  activeStatuses,
  type ReceivedJobApplicationInfo,
  responseRateStatuses,
} from "../types/JobApplication";

interface ICountingHelper {
  data?: ReceivedJobApplicationInfo[];
}

export function countingHelper({ data }: ICountingHelper) {
  if (!data) return { numActive: 0, numTotal: 0, numResponseRate: 0 };

  const numActive = data.filter((app) =>
    activeStatuses.includes(app.status)
  ).length;
  const numTotal = data.length;
  const numResponseRate = data.filter((app) =>
    responseRateStatuses.includes(app.status)
  ).length;

  return { numActive, numTotal, numResponseRate };
}

export function getStatusCounts({ data }: ICountingHelper) {
  if (!data) return [];

  const statusConfig = {
    applied: "#1976d2", // MUI primary (blue)
    received_oa: "#0288d1", // MUI info (light blue)
    interviewing: "#ed6c02", // MUI warning (orange)
    offered: "#2e7d32", // MUI success (green)
    rejected: "#d32f2f", // MUI error (red)
    ghosted: "#757575", // MUI default (gray)
  };

  const statusCounts = data.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusConfig)
    .map(([status, color]) => ({
      name: status,
      value: statusCounts[status] || 0,
      color: color,
    }))
    .filter((item) => item.value > 0);

  return chartData;
}

export function getLast7DaysData({ data }: ICountingHelper) {
  console.log(data);
  if (!data) return [];

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const dayLabels = last7Days.map((date) =>
    date.toLocaleDateString("en-US", { weekday: "short" })
  );

  const applicationsByDay = last7Days.map((date) => {
    const dateStr = date.toISOString().split("T")[0];

    const count = data.filter((app) => {
      const appDate = new Date(app.applied_on).toISOString().split("T")[0];
      return appDate === dateStr;
    }).length;

    return count;
  });

  const chartData = dayLabels.map((day, index) => ({
    day,
    applications: applicationsByDay[index],
  }));

  return chartData;
}
