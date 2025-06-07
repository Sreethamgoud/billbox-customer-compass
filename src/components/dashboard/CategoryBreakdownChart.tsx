
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
    return Object.keys(categories)
      .map((category, index) => ({
        category,
        amount: Math.round(categories[category] * 100) / 100, // Round to 2 decimals
        color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.amount - a.amount); // Sort by amount descending
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
          <div className="text-center">
            <p className="mb-2">No bill data available</p>
            <p className="text-sm">Add some bills to see category breakdown</p>
          </div>
        </div>
      </ChartCard>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{`${data.category}`}</p>
          <p className="text-blue-600">{`Amount: $${data.amount}`}</p>
          <p className="text-gray-600 text-sm">{`${((data.amount / categoryData.reduce((sum, item) => sum + item.amount, 0)) * 100).toFixed(1)}% of total`}</p>
        </div>
      );
    }
    return null;
  };

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
              label={({ name, percent }) => percent > 5 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value, entry) => `${value} ($${entry.payload.amount})`}
              wrapperStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default CategoryBreakdownChart;
