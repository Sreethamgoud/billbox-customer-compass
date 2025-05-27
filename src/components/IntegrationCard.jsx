
import PropTypes from 'prop-types';

const IntegrationCard = ({ integration }) => {
  const { name, icon: Icon, status, description, actionLabel = 'Connect' } = integration;
  
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getButtonStyle = () => {
    switch (status) {
      case 'connected':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
      case 'error':
        return 'bg-red-600 text-white hover:bg-red-700';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getActionLabel = () => {
    switch (status) {
      case 'connected':
        return 'Manage';
      case 'error':
        return 'Retry';
      default:
        return actionLabel;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon size={24} className="text-gray-600" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {status}
          </span>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${getButtonStyle()}`}
          >
            {getActionLabel()}
          </button>
        </div>
      </div>
    </div>
  );
};

IntegrationCard.propTypes = {
  integration: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    status: PropTypes.oneOf(['connected', 'disconnected', 'error', 'pending']).isRequired,
    description: PropTypes.string,
    actionLabel: PropTypes.string
  }).isRequired
};

export default IntegrationCard;
