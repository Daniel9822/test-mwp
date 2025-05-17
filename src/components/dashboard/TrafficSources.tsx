"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'Direct', value: 965 },
  { name: 'Marketing', value: 1024 },
  { name: 'Social', value: 750 },
  { name: 'Affiliates', value: 960 },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))'
];

const TrafficSources = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
            ))}
          </Pie>

          <Legend
            verticalAlign="bottom"
            layout="horizontal"
            align="center"
            iconType="circle"
            formatter={(value, entry, index) => {
              return (
                <span className="text-xs flex items-center gap-2">
                  {value}
                  <span className="text-muted-foreground ml-1">{data[index].value}</span>
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficSources;
