"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const data = [
  { name: 'Jan', income: 30000, expenses: 20000, investments: 10000, savings: 5000 },
  { name: 'Feb', income: 40000, expenses: 25000, investments: 15000, savings: 10000 },
  { name: 'Mar', income: 45000, expenses: 30000, investments: 20000, savings: 12000 },
  { name: 'Apr', income: 38000, expenses: 28000, investments: 18000, savings: 9000 },
  { name: 'May', income: 42000, expenses: 26000, investments: 22000, savings: 11000 },
  { name: 'Jun', income: 50000, expenses: 32000, investments: 25000, savings: 15000 },
  { name: 'Jul', income: 47000, expenses: 30000, investments: 23000, savings: 13000 },
  { name: 'Aug', income: 55000, expenses: 35000, investments: 28000, savings: 17000 },
  { name: 'Sep', income: 52000, expenses: 33000, investments: 26000, savings: 16000 },
  { name: 'Oct', income: 60000, expenses: 38000, investments: 30000, savings: 20000 },
  { name: 'Nov', income: 57000, expenses: 36000, investments: 28000, savings: 18000 },
  { name: 'Dec', income: 65000, expenses: 40000, investments: 32000, savings: 22000 },
];

const DashboardChart = () => {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
              if (value === 25000) return '25k';
              if (value === 50000) return '50k';
              if (value === 75000) return '75k';
              if (value === 100000) return '100k';
              if (value === 125000) return '125k';
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
              <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="income"
            stroke="hsl(var(--chart-5))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorIncome)"
            name="Total Income"
          />

          <Bar
            dataKey="expenses"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
            name="Total Expenses"
            barSize={10}
          />

          <Area
            type="monotone"
            dataKey="investments"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
            dot={false}
            fillOpacity={0}
            name="Investments"
          />

          <Area
            type="monotone"
            dataKey="savings"
            stroke="hsl(var(--chart-4))"
            strokeWidth={2}
            dot={false}
            fillOpacity={0}
            name="Savings"
            strokeDasharray="5 5"
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-xs">{value}</span>}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
