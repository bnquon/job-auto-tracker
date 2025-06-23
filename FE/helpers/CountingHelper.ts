import {
  activeStatuses,
  type ReceivedJobApplicationInfo,
  responseRateStatuses,
} from "../types/JobApplication";

interface ICountingHelper {
  data: ReceivedJobApplicationInfo[];
}

export function countingHelper({ data }: ICountingHelper) {
  const numActive = data.filter((app) =>
    activeStatuses.includes(app.status)
  ).length;
  const numTotal = data.length;
  const numResponseRate = data.filter((app) =>
    responseRateStatuses.includes(app.status)
  ).length;

  return { numActive, numTotal, numResponseRate };
}

export function getStatusCounts({ data } : ICountingHelper) {
  const statusConfig = {
    'applied': '#3b82f6',
    'received_oa': '#f59e0b',
    'interviewing': '#10b981',
    'offered': '#22c55e',
    'rejected': '#ef4444',
    'ghosted': '#6b7280'
  };

  const statusCounts = data.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusConfig)
    .map(([status, color]) => ({
      name: status,
      value: statusCounts[status] || 0,
      color: color
    }))
    .filter(item => item.value > 0);

  return chartData;
}

export function getLast7DaysData({ data }: ICountingHelper) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const dayLabels = last7Days.map(date => 
    date.toLocaleDateString('en-US', { weekday: 'short' })
  );

  const applicationsByDay = last7Days.map(date => {
    const dateStr = date.toISOString().split('T')[0];
    
    const count = data.filter(app => {
      const appDate = new Date(app.applied_on).toISOString().split('T')[0];
      return appDate === dateStr;
    }).length;

    return count;
  });

  const chartData = dayLabels.map((day, index) => ({
    day,
    applications: applicationsByDay[index]
  }));

  return chartData;
}