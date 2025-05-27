
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ChartCard from '../ChartCard';

const CategoryBreakdownChart: React.FC = () => {
  const categoryData = [
    { category: 'Groceries', amount: 450, color: '#3b82f6' },
    { category: 'Entertainment', amount: 280, color: '#ef4444' },
    { category: 'Transportation', amount: 120, color: '#10b981' },
    { category: 'Utilities', amount: 180, color: '#f59e0b' },
    { category: 'Dining Out', amount: 340, color: '#8b5cf6' },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
    },
  };

  return (
    <ChartCard title="Category Breakdown">
      <ChartContainer config={chartConfig} className="h-64">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="amount"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
};

export default CategoryBreakdownChart;
