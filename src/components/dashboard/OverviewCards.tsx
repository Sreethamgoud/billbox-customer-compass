
import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, Bell } from 'lucide-react';
import StatCard from '../StatCard';
import { useSupabaseData, Bill } from '@/hooks/useSupabaseData';

interface OverviewCardsProps {
  isLoading?: boolean;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ isLoading = false }) => {
  const { data, error } = useSupabaseData();
  const bills = data?.bills || [];

  const stats = useMemo(() => {
    // Calculate total balance (sum of all bill amounts)
    const totalBillAmount = bills.reduce((sum, bill) => sum + Number(bill.amount), 0);
    
    // Calculate monthly spending (bills due this month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const thisMonthBills = bills.filter(bill => {
      const dueDate = new Date(bill.due_date);
      return dueDate.getMonth() === currentMonth && dueDate.getFullYear() === currentYear;
    });
    
    const monthlySpending = thisMonthBills.reduce((sum, bill) => sum + Number(bill.amount), 0);
    
    // Calculate bills due (count of upcoming bills)
    const billsDue = bills.filter(bill => bill.status === 'upcoming' || bill.status === 'due').length;
    
    // Calculate savings goal (dummy calculation - 70% of total)
    const savingsGoal = Math.round((1 - (monthlySpending / (totalBillAmount || 1))) * 100);
    
    return {
      totalBalance: totalBillAmount.toFixed(2),
      monthlySpending: monthlySpending.toFixed(2),
      billsDue,
      savingsGoal: Math.min(Math.max(savingsGoal, 0), 100), // Clamp between 0-100
    };
  }, [bills]);

  const overviewStats = [
    {
      title: "Total Balance",
      value: `$${stats.totalBalance}`,
      change: "+12.3%",
      trend: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Monthly Spending",
      value: `$${stats.monthlySpending}`,
      change: "-8.1%",
      trend: "positive" as const,
      icon: TrendingDown
    },
    {
      title: "Bills Due",
      value: `${stats.billsDue}`,
      change: "This week",
      trend: "neutral" as const,
      icon: Bell
    },
    {
      title: "Savings Goal",
      value: `${stats.savingsGoal}%`,
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
