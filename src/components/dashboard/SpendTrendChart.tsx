
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from '../ChartCard';
import ButtonGroup from '../ButtonGroup';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { format, subDays, subMonths, parseISO, isWithinInterval, eachMonthOfInterval, eachDayOfInterval, getDay } from 'date-fns';

interface SpendTrendChartProps {
  activeTimeframe: number;
  onTimeframeChange: (index: number) => void;
}

const SpendTrendChart: React.FC<SpendTrendChartProps> = ({ 
  activeTimeframe, 
  onTimeframeChange 
}) => {
  const timeframeButtons = [
    { label: "Last 30 days" },
    { label: "Last 3 months" },
    { label: "Spending by Day of Week" }
  ];

  const { data, isLoading } = useSupabaseData();
  const bills = data?.bills || [];

  // Prepare chart data based on selected timeframe
  const chartData = useMemo(() => {
    const today = new Date();
    let startDate: Date;
    let groupingFormat = 'MMM d';
    
    // Set date range based on active timeframe
    if (activeTimeframe === 0) {
      // Last 30 days
      startDate = subDays(today, 30);
      groupingFormat = 'MMM d';
    } else if (activeTimeframe === 1) {
      // Last 3 months
      startDate = subMonths(today, 3);
      groupingFormat = 'MMM yyyy';
    } else if (activeTimeframe === 2) {
      // Spending by Day of Week
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayTotals = Array(7).fill(0);
      
      // Calculate spending by day of week
      bills.forEach(bill => {
        const dueDate = parseISO(bill.due_date);
        const dayOfWeek = getDay(dueDate);
        dayTotals[dayOfWeek] += Number(bill.amount);
      });
      
      return dayNames.map((day, index) => ({
        date: day,
        amount: Math.round(dayTotals[index] * 100) / 100
      }));
    }

    // Filter bills within the time range
    const filteredBills = bills.filter(bill => {
      const dueDate = parseISO(bill.due_date);
      return isWithinInterval(dueDate, { start: startDate!, end: today });
    });

    // Group by period based on timeframe
    const groupedData: Record<string, number> = {};
    
    if (activeTimeframe === 0) {
      // Daily grouping for last 30 days
      const days = eachDayOfInterval({ start: startDate!, end: today });
      days.forEach(day => {
        const key = format(day, groupingFormat);
        groupedData[key] = 0;
      });
    } else {
      // Monthly grouping
      const months = eachMonthOfInterval({ start: startDate!, end: today });
      months.forEach(month => {
        const key = format(month, groupingFormat);
        groupedData[key] = 0;
      });
    }
    
    // Sum amounts for each group
    filteredBills.forEach(bill => {
      const dueDate = parseISO(bill.due_date);
      const key = format(dueDate, groupingFormat);
      if (groupedData[key] !== undefined) {
        groupedData[key] += Number(bill.amount);
      }
    });
    
    // Convert to chart format
    return Object.keys(groupedData)
      .map(date => ({
        date,
        amount: Math.round(groupedData[date] * 100) / 100
      }))
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
  }, [bills, activeTimeframe]);

  if (isLoading) {
    return (
      <ChartCard
        title="Spend Trend"
        actions={
          <ButtonGroup
            buttons={timeframeButtons}
            activeIndex={activeTimeframe}
            onButtonClick={onTimeframeChange}
            variant="pills"
          />
        }
      >
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </ChartCard>
    );
  }

  const chartTitle = activeTimeframe === 2 ? "Spending by Day of Week" : "Spend Trend";

  return (
    <ChartCard
      title={chartTitle}
      actions={
        <ButtonGroup
          buttons={timeframeButtons}
          activeIndex={activeTimeframe}
          onButtonClick={onTimeframeChange}
          variant="pills"
        />
      }
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              angle={activeTimeframe === 2 ? -45 : 0}
              textAnchor={activeTimeframe === 2 ? "end" : "middle"}
              height={activeTimeframe === 2 ? 60 : 30}
              fontSize={12}
            />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Amount']}
              labelFormatter={(label) => activeTimeframe === 2 ? `${label}` : `Date: ${label}`}
            />
            <Legend />
            <Bar dataKey="amount" fill="#3b82f6" radius={4} name="Spending Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default SpendTrendChart;
