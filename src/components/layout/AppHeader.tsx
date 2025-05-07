
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

const AppHeader: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-simcity-blue font-bold text-2xl">
            SimCity <span className="text-simcity-teal">Reality OS</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Bell className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="bg-simcity-blue rounded-full p-1">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-300">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
