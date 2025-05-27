
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import ChartCard from '../ChartCard';
import ButtonGroup from '../ButtonGroup';

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

  const spendData = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 1398 },
    { month: 'Mar', amount: 9800 },
    { month: 'Apr', amount: 3908 },
    { month: 'May', amount: 4800 },
    { month: 'Jun', amount: 3800 },
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  };

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
      <ChartContainer config={chartConfig} className="h-64">
        <BarChart data={spendData}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
};

export default SpendTrendChart;
