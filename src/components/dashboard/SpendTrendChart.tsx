
import React, { useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../ChartCard';
import ButtonGroup from '../ButtonGroup';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { format, subDays, subMonths, startOfMonth, endOfMonth, parseISO, isWithinInterval, eachMonthOfInterval } from 'date-fns';

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
    { label: "Last 6 months" }
  ];

  const { data, isLoading } = useSupabaseData();
  const bills = data?.bills || [];

  // Prepare chart data based on selected timeframe
  const chartData = useMemo(() => {
    const today = new Date();
    let startDate: Date;
    let dateFormat = 'MMM d';
    let groupingFormat = 'MMM d';
    
    // Set date range based on active timeframe
    if (activeTimeframe === 0) {
      // Last 30 days
      startDate = subDays(today, 30);
      dateFormat = 'MMM d';
      groupingFormat = 'MMM d';
    } else if (activeTimeframe === 1) {
      // Last 3 months
      startDate = subMonths(today, 3);
      dateFormat = 'MMM';
      groupingFormat = 'MMM yyyy';
    } else {
      // Last 6 months
      startDate = subMonths(today, 6);
      dateFormat = 'MMM';
      groupingFormat = 'MMM yyyy';
    }

    // Filter bills within the time range
    const filteredBills = bills.filter(bill => {
      const dueDate = parseISO(bill.due_date);
      return isWithinInterval(dueDate, { start: startDate, end: today });
    });

    // Group by period based on timeframe
    const groupedData: Record<string, number> = {};
    
    if (activeTimeframe === 0) {
      // Daily grouping for last 30 days
      for (let i = 0; i <= 30; i++) {
        const date = subDays(today, i);
        const key = format(date, groupingFormat);
        groupedData[key] = 0;
      }
    } else {
      // Monthly grouping
      const months = eachMonthOfInterval({ start: startDate, end: today });
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
        amount: groupedData[date]
      }))
      .sort((a, b) => {
        // Sort dates
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
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            <Bar dataKey="amount" fill="#3b82f6" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default SpendTrendChart;
