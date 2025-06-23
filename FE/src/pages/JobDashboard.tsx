import ApplicationStatusChart from "@/components/charts/CircleChart";
import ApplicationsLineChart from "@/components/charts/LineChart";
import { OverviewWrapper } from "@/components/wrappers/OverviewWrapper";
import { PageWrapper } from "@/components/wrappers/PageWrapper";
import { TableWrapper } from "@/components/wrappers/TableWrapper";
import { useApplications } from "@/hooks/useApplication";
import {
  countingHelper,
  getLast7DaysData,
  getStatusCounts,
} from "../../helpers/CountingHelper";
import { UploadWrapper } from "@/components/wrappers/UploadWrapper";
import { ManualUploadWrapper } from "@/components/wrappers/ManualUploadWrapper";

export const JobDashboard = () => {
  const { data = [] } = useApplications();

  const { numActive, numTotal, numResponseRate } = countingHelper({ data });
  const pieChartData = getStatusCounts({ data });
  const lineChartData = getLast7DaysData({ data });

  return (
    <PageWrapper>
      <OverviewWrapper
        total={numTotal}
        active={numActive}
        responseRate={numResponseRate}
      />
      <div className="flex gap-4">
        <TableWrapper data={data} />
        <div className="flex flex-col w-1/4 gap-4">
          <ManualUploadWrapper />
          <UploadWrapper />
        </div>
      </div>
      <div className="flex gap-4 relative">
        <ApplicationStatusChart data={pieChartData} />
        <ApplicationsLineChart data={lineChartData} />
      </div>
    </PageWrapper>
  );
};
