
import React from 'react';
import ChartCard from '../ChartCard';

interface Alert {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  time: string;
  read: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  isLoading: boolean;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, isLoading }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✕';
      default: return 'ℹ';
    }
  };

  return (
    <ChartCard 
      title="Alerts"
      actions={
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Mark all read
        </button>
      }
    >
      {isLoading ? (
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Loading alerts...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
              <span className="text-lg">{getAlertIcon(alert.type)}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </ChartCard>
  );
};

export default AlertsPanel;
