import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface LineChartData {
  day: string;
  applications: number;
}

interface ApplicationsLineChartProps {
  data: LineChartData[];
}

const ApplicationsLineChart = ({ data }: ApplicationsLineChartProps) => {
  return (
    <div className="w-full h-fit relative rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Applications Last 7 Days
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="linear" 
            dataKey="applications" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationsLineChart;