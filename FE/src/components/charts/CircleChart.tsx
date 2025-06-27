import { MapApplicationStatusToString } from "../../../helpers/ApplicationStatusHelper";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { EmptyState } from "../shared/EmptyState";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ApplicationStatusChartProps {
  data: ChartData[];
}

const ApplicationStatusChart = ({ data }: ApplicationStatusChartProps) => {
  return (
    <div className="w-full p-6 rounded-4xl bg-[#1e1e1e] h-fit relative shadow-sm">
      <h3 className="text-2xl text-[#00d4ff] font-bold mb-4">
        Application Status Distribution
      </h3>

      {data.length === 0 ? (
        <div className="w-full h-[250px]">
          <EmptyState
            mainText="No data to display"
            subText="Add some job applications to see your status distribution"
          />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => {
                const displayName = MapApplicationStatusToString(name);
                return `${displayName} ${(percent * 100).toFixed(0)}%`;
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ApplicationStatusChart;
