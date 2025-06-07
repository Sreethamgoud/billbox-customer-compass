
import React, { useMemo, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bell } from 'lucide-react';
import StatCard from '../StatCard';
import { useSupabaseData, Bill } from '@/hooks/useSupabaseData';
import { useQueryClient } from '@tanstack/react-query';

interface OverviewCardsProps {
  isLoading?: boolean;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ isLoading = false }) => {
  const { data, error, refetch } = useSupabaseData();
  const bills = data?.bills || [];
  const queryClient = useQueryClient();

  // Listen for bill changes and refresh
  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.query?.queryKey?.includes('bills') || event?.query?.queryKey?.includes('dashboard-data')) {
        refetch();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [refetch, queryClient]);

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
    
    // Calculate savings goal (percentage based on paid vs unpaid bills)
    const paidBills = bills.filter(bill => bill.status === 'paid');
    const paidAmount = paidBills.reduce((sum, bill) => sum + Number(bill.amount), 0);
    const savingsGoal = totalBillAmount > 0 ? Math.round((paidAmount / totalBillAmount) * 100) : 0;
    
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
      title: "Payment Progress",
      value: `${stats.savingsGoal}%`,
      change: "+5% this month",
      trend: "positive" as const,
      icon: TrendingUp
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
