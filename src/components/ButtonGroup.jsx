
import PropTypes from 'prop-types';

const ButtonGroup = ({ buttons, activeIndex, onButtonClick, variant = 'default' }) => {
  const getButtonClasses = (index, isActive) => {
    const baseClasses = 'px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
    
    let variantClasses = '';
    let activeClasses = '';
    
    switch (variant) {
      case 'pills':
        variantClasses = 'rounded-full';
        activeClasses = isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        break;
      case 'tabs':
        variantClasses = 'border-b-2';
        activeClasses = isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
        break;
      default:
        // Grouped buttons
        let positionClasses = '';
        if (buttons.length === 1) {
          positionClasses = 'rounded-md';
        } else if (index === 0) {
          positionClasses = 'rounded-l-md border-r-0';
        } else if (index === buttons.length - 1) {
          positionClasses = 'rounded-r-md';
        } else {
          positionClasses = 'border-r-0';
        }
        variantClasses = `border border-gray-300 ${positionClasses}`;
        activeClasses = isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50';
    }
    
    return `${baseClasses} ${variantClasses} ${activeClasses} transition-colors`;
  };

  return (
    <div className={`flex ${variant === 'pills' ? 'space-x-2' : ''}`}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(index)}
          className={getButtonClasses(index, activeIndex === index)}
          disabled={button.disabled}
        >
          {button.icon && <button.icon size={16} className="mr-2" />}
          {button.label}
        </button>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    disabled: PropTypes.bool
  })).isRequired,
  activeIndex: PropTypes.number,
  onButtonClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'pills', 'tabs'])
};

export default ButtonGroup;
