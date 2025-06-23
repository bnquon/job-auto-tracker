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
    <div className="w-full p-6 rounded-4xl bg-[#1e1e1e] h-fit relative shadow-sm">
      <h3 className="text-2xl text-[#00d4ff] font-bold mb-4">
        Applications Last 7 Days
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14, fill: '#fff' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14, fill: '#fff' }}
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
            stroke="#00d4ff" 
            strokeWidth={3}
            dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#00d4ff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationsLineChart;