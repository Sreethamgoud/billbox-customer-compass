
import React from 'react';
import ChartCard from '../ChartCard';
import { useAlertMutations } from '@/hooks/useAlertMutations';

interface Alert {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  created_at: string;
  read: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  isLoading: boolean;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, isLoading }) => {
  const { markAllAsRead } = useAlertMutations();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✕';
      default: return 'ℹ';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return '1d ago';
    return date.toLocaleDateString();
  };

  return (
    <ChartCard 
      title="Alerts"
      actions={
        <button 
          onClick={() => markAllAsRead.mutate()}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          disabled={markAllAsRead.isPending}
        >
          {markAllAsRead.isPending ? 'Marking...' : 'Mark all read'}
        </button>
      }
    >
      {isLoading ? (
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Loading alerts...</span>
        </div>
      ) : alerts.length === 0 ? (
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">No alerts</p>
            <p className="text-sm text-gray-400">You're all caught up!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.slice(0, 5).map((alert) => (
            <div 
              key={alert.id} 
              className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <span className="text-lg">{getAlertIcon(alert.type)}</span>
              <div className="flex-1">
                <p className={`text-sm ${alert.read ? 'text-gray-600' : 'text-gray-900'}`}>
                  {alert.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(alert.created_at)}
                </p>
              </div>
              {!alert.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </ChartCard>
  );
};

export default AlertsPanel;
