import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ApplicationStatusChart = () => {
  // Placeholder
  const defaultData = [
    { name: 'Applied', value: 45, color: '#3b82f6' },
    { name: 'Received OA', value: 12, color: '#f59e0b' },
    { name: 'Interviewing', value: 8, color: '#10b981' },
    { name: 'Offered', value: 3, color: '#22c55e' },
    { name: 'Rejected', value: 25, color: '#ef4444' },
    { name: 'Ghosted', value: 7, color: '#6b7280' }
  ];

  return (
    <div className="w-full h-fit bg-white rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Application Status Distribution
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={defaultData} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={80}
            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {defaultData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationStatusChart;