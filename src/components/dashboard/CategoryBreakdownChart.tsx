
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ChartCard from '../ChartCard';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const CategoryBreakdownChart: React.FC = () => {
  const { data, isLoading } = useSupabaseData();
  const bills = data?.bills || [];
  
  // Group bills by category and calculate totals
  const categoryData = React.useMemo(() => {
    const categories: Record<string, number> = {};
    
    bills.forEach(bill => {
      const category = bill.category.trim();
      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += Number(bill.amount);
    });
    
    // Convert to array for chart
    return Object.keys(categories).map((category, index) => ({
      category,
      amount: categories[category],
      color: COLORS[index % COLORS.length]
    }));
  }, [bills]);

  if (isLoading) {
    return (
      <ChartCard title="Category Breakdown">
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </ChartCard>
    );
  }

  // If no data, show placeholder
  if (categoryData.length === 0) {
    return (
      <ChartCard title="Category Breakdown">
        <div className="h-64 flex items-center justify-center text-gray-500">
          No bill data available to generate breakdown
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Category Breakdown">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="amount"
              nameKey="category"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Amount']}
              labelFormatter={(label) => `Category: ${label}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default CategoryBreakdownChart;
