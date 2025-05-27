
import React from 'react';
import { TrendingUp, TrendingDown, Bell } from 'lucide-react';
import StatCard from '../StatCard';

interface OverviewCardsProps {
  isLoading?: boolean;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ isLoading = false }) => {
  const overviewStats = [
    {
      title: "Total Balance",
      value: "$24,580.32",
      change: "+12.3%",
      trend: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Monthly Spending",
      value: "$3,247.89",
      change: "-8.1%",
      trend: "positive" as const,
      icon: TrendingDown
    },
    {
      title: "Bills Due",
      value: "5",
      change: "This week",
      trend: "neutral" as const,
      icon: Bell
    },
    {
      title: "Savings Goal",
      value: "67%",
      change: "+5% this month",
      trend: "positive" as const,
      icon: TrendingUp
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewStats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default OverviewCards;
