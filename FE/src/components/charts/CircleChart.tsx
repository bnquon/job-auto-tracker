import { MapApplicationStatusToString } from "../../../helpers/ApplicationStatusHelper";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    <div className="w-full h-fit relative rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Application Status Distribution
      </h3>
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
    </div>
  );
};

export default ApplicationStatusChart;
