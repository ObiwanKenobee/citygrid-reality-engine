
import React from 'react';
import { Bell } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  time: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-status-danger';
      case 'medium': return 'text-status-warning';
      case 'low': return 'text-status-info';
      default: return 'text-gray-400';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-status-danger bg-opacity-20';
      case 'medium': return 'bg-status-warning bg-opacity-20';
      case 'low': return 'bg-status-info bg-opacity-20';
      default: return 'bg-gray-800';
    }
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="font-medium flex items-center">
          <Bell className="h-4 w-4 mr-2 text-simcity-blue" />
          Recent Alerts
        </h2>
        <span className="text-xs px-2 py-1 rounded-full bg-simcity-blue bg-opacity-20 text-simcity-blue">
          {alerts.length} New
        </span>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 border-b border-gray-800 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                {alert.title}
              </div>
              <div className="text-xs text-gray-500">{alert.time}</div>
            </div>
            <p className="text-sm text-gray-400">{alert.message}</p>
            
            <div className="mt-3 flex items-center justify-between">
              <div className={`text-xs px-2 py-0.5 rounded-full ${getSeverityBg(alert.severity)} ${getSeverityColor(alert.severity)}`}>
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Priority
              </div>
              
              <button className="text-xs text-simcity-blue hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
