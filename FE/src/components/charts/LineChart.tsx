import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const ApplicationsLineChart = () => {
  // Default data for past 7 days
  const defaultData = [
    { day: 'Mon', applications: 2 },
    { day: 'Tue', applications: 5 },
    { day: 'Wed', applications: 1 },
    { day: 'Thu', applications: 8 },
    { day: 'Fri', applications: 3 },
    { day: 'Sat', applications: 0 },
    { day: 'Sun', applications: 4 }
  ];

  return (
    <div className="w-full h-80 bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Applications Last 7 Days
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={defaultData}>
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