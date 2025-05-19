"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';

const data = [
  { name: 'Jan', income: 80000, expenses: 2000, profit: 40000 },
  { name: 'Feb', income: 95000, expenses: 4000, profit: 50000 },
  { name: 'Mar', income: 65000, expenses: 8000, profit: 32000 },
  { name: 'Apr', income: 70000, expenses: 10000, profit: 35000 },
  { name: 'May', income: 85000, expenses: 15000, profit: 42000 },
  { name: 'Jun', income: 76000, expenses: 20000, profit: 38000 },
  { name: 'Jul', income: 80000, expenses: 5000, profit: 40000 },
  { name: 'Aug', income: 45000, expenses: 18000, profit: 22500 },
  { name: 'Sep', income: 90000, expenses: 22000, profit: 45000 },
  { name: 'Oct', income: 85000, expenses: 25000, profit: 42500 },
  { name: 'Nov', income: 40000, expenses: 30000, profit: 20000 },
  { name: 'Dec', income: 35000, expenses: 32000, profit: 17500 },
];

const PaymentsOverview = () => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => {
              if (value === 0) return '0k';
              if (value === 20000) return '20k';
              if (value === 40000) return '40k';
              if (value === 60000) return '60k';
              if (value === 80000) return '80k';
              if (value === 100000) return '100k';
              return value;
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.5rem',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value: number) => [`$${(value / 1000).toFixed(1)}k`, '']}
          />

          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="profit"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorIncome)"
          />

          <Bar
            dataKey="income"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
            barSize={10}
          />

          <Bar
            dataKey="expenses"
            fill="hsl(var(--chart-4))"
            radius={[4, 4, 0, 0]}
            barSize={10}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentsOverview;
