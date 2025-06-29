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
import { useEffect, useMemo, useState } from "react";
import AppSidebar from "@/AppSidebar";
import { useJobCycle } from "@/hooks/useJobCycle";
import Loading from "@/components/Loading";

export const JobDashboard = () => {
  const { data: cycles = [], isLoading: cyclesLoading } = useJobCycle();
  const [activeCycleId, setActiveCycleId] = useState<number>(cycles[0]?.id);

  useEffect(() => {
    setActiveCycleId(cycles[0]?.id);
  }, [cycles]);

  const { data, isLoading } = useJobApplicationsByCycle(activeCycleId);
  const { numActive, numTotal, numResponseRate } = useMemo(
    () => countingHelper({ data }),
    [data]
  );
  const pieChartData = useMemo(() => getStatusCounts({ data }), [data]);
  const lineChartData = useMemo(() => getLast7DaysData({ data }), [data]);

  if (cyclesLoading || isLoading) {
    return (
      <div className="w-full h-screen bg-gray-950">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-gray-950">
      {/* Sidebar */}
      <div className="flex-shrink-0 relative">
        <AppSidebar
          cycles={cycles}
          activeCycleId={activeCycleId}
          setActiveCycleId={(id: number) => setActiveCycleId(id)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative">
        <div className="2xl:w-3/4 lg:w-4/5 mx-auto min-h-full p-6 space-y-6">
          {/* Overview blocks - full width of container */}
          <div className="w-full">
            <OverviewWrapper
              total={numTotal}
              active={numActive}
              responseRate={numResponseRate}
            />
          </div>

          {/* Fixed grid layout */}
          <div className="flex gap-6 w-full 2xl:flex-row lg:flex-col">
            <div className="2xl:w-3/4 w-full">
              <TableWrapper data={data} />
            </div>
            <div className="flex 2xl:flex-col gap-6 w-full">
              <ManualUploadWrapper currentCycleId={activeCycleId} />
              <UploadWrapper currentCycleId={activeCycleId} />
            </div>
          </div>

          <div className="grid 2xl:grid-cols-2 gap-6 w-full">
            <ApplicationStatusChart data={pieChartData} />
            <ApplicationsLineChart data={lineChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};
