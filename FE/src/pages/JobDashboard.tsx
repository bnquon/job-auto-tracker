import ApplicationStatusChart from "@/components/charts/CircleChart";
import ApplicationsLineChart from "@/components/charts/LineChart";
import { OverviewWrapper } from "@/components/wrappers/OverviewWrapper";
import { TableWrapper } from "@/components/wrappers/TableWrapper";
import { useJobApplicationsByCycle } from "@/hooks/useApplication";
import {
  countingHelper,
  getLast7DaysData,
  getStatusCounts,
} from "../../helpers/CountingHelper";
import { UploadWrapper } from "@/components/wrappers/UploadWrapper";
import { ManualUploadWrapper } from "@/components/wrappers/ManualUploadWrapper";
import { useMemo } from "react";
import AppSidebar from "@/AppSidebar";
import { useJobCycle } from "@/hooks/useJobCycle";
import Loading from "@/components/Loading";

export const JobDashboard = () => {
  const { data: cycles = [], isLoading: cyclesLoading } = useJobCycle();

  const activeCycle = cycles[0] ?? {};

  const { data, isLoading } = useJobApplicationsByCycle(activeCycle.id);

  const { numActive, numTotal, numResponseRate } = useMemo(
    () => countingHelper({ data }),
    [data]
  );
  const pieChartData = useMemo(() => getStatusCounts({ data }), [data]);
  const lineChartData = useMemo(() => getLast7DaysData({ data }), [data]);

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar - NOT fixed positioned */}
      <div className="flex-shrink-0">
        <AppSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {isLoading || cyclesLoading ? (
          <Loading />
        ) : (
          <div className="w-3/4 mx-auto min-h-full p-6 space-y-6">
            {/* Overview blocks - full width of container */}
            <div className="w-full">
              <OverviewWrapper
                total={numTotal}
                active={numActive}
                responseRate={numResponseRate}
              />
            </div>

            {/* Table and Upload sections */}
            <div className="grid grid-cols-[3fr_1fr] gap-6 w-full">
              <TableWrapper data={data} />
              <div className="flex flex-col gap-6">
                <ManualUploadWrapper />
                <UploadWrapper />
              </div>
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-2 gap-6 w-full">
              <ApplicationStatusChart data={pieChartData} />
              <ApplicationsLineChart data={lineChartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
