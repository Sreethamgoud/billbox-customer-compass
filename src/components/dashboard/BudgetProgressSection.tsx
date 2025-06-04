
import React from 'react';
import ChartCard from '../ChartCard';
import BudgetCard from '../BudgetCard';

interface Budget {
  id: string;
  category: string;
  spent: number;
  budget_limit: number;
  color: string;
}

interface BudgetProgressSectionProps {
  budgets: Budget[];
  isLoading: boolean;
}

const BudgetProgressSection: React.FC<BudgetProgressSectionProps> = ({ budgets, isLoading }) => {
  // Transform budget data to match BudgetCard expectations
  const transformedBudgets = budgets.map(budget => ({
    id: budget.id,
    category: budget.category,
    spent: budget.spent || 0,
    limit: budget.budget_limit,
    color: budget.color || 'blue',
  }));

  return (
    <ChartCard title="Budget Progress" className="mb-8">
      {isLoading ? (
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Loading budgets...</span>
        </div>
      ) : budgets.length === 0 ? (
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">No budgets found</p>
            <p className="text-sm text-gray-400">Create your first budget to start tracking spending</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {transformedBudgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      )}
    </ChartCard>
  );
};

export default BudgetProgressSection;
