
import React from 'react';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="glass-card rounded-lg p-4">
      <h2 className="font-medium mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-800 bg-opacity-50 hover:bg-gray-700 transition-colors"
          >
            <div className={`mb-2 p-2 rounded-full ${action.color}`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
