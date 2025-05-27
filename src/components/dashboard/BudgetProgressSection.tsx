
import React from 'react';
import ChartCard from '../ChartCard';
import BudgetCard from '../BudgetCard';

interface Budget {
  id: number;
  category: string;
  spent: number;
  limit: number;
  color: string;
}

interface BudgetProgressSectionProps {
  budgets: Budget[];
  isLoading: boolean;
}

const BudgetProgressSection: React.FC<BudgetProgressSectionProps> = ({ budgets, isLoading }) => {
  return (
    <ChartCard title="Budget Progress" className="mb-8">
      {isLoading ? (
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Loading budgets...</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      )}
    </ChartCard>
  );
};

export default BudgetProgressSection;
