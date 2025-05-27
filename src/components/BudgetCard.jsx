
import PropTypes from 'prop-types';

const BudgetCard = ({ budget }) => {
  const { category, spent, limit, color = 'blue' } = budget;
  const percentage = Math.min((spent / limit) * 100, 100);
  
  const getProgressColor = () => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return `bg-${color}-500`;
  };

  const getTextColor = () => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return `text-${color}-600`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
        <span className={`text-sm font-medium ${getTextColor()}`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>${spent.toLocaleString()}</span>
          <span>${limit.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        ${(limit - spent).toLocaleString()} remaining
      </p>
    </div>
  );
};

BudgetCard.propTypes = {
  budget: PropTypes.shape({
    category: PropTypes.string.isRequired,
    spent: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    color: PropTypes.string
  }).isRequired
};

export default BudgetCard;
