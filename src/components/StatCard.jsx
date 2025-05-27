
import PropTypes from 'prop-types';

const StatCard = ({ title, value, change, icon: Icon, trend = 'neutral' }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${getTrendColor()} mt-1`}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="ml-4">
            <Icon size={24} className="text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string,
  icon: PropTypes.elementType,
  trend: PropTypes.oneOf(['positive', 'negative', 'neutral'])
};

export default StatCard;
