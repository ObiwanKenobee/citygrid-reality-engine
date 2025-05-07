
import React from 'react';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon?: React.ElementType;
  status?: 'good' | 'warning' | 'critical';
  trend?: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon: Icon, status = 'good', trend }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'text-status-success';
      case 'warning': return 'text-status-warning';
      case 'critical': return 'text-status-danger';
      default: return 'text-blue-500';
    }
  };
  
  const getTrendIcon = () => {
    if (trend === undefined) return null;
    
    if (trend > 0) {
      return <span className="text-status-success flex items-center">↑ {trend}%</span>;
    } else if (trend < 0) {
      return <span className="text-status-danger flex items-center">↓ {Math.abs(trend)}%</span>;
    } else {
      return <span className="text-gray-400 flex items-center">→ {trend}%</span>;
    }
  };

  return (
    <div className="glass-card rounded-lg p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
      </div>
      
      <div className="flex items-end justify-between">
        <div className={`text-2xl font-bold ${getStatusColor()}`}>{value}</div>
        <div className="text-xs">{getTrendIcon()}</div>
      </div>
    </div>
  );
};

export default StatusCard;
