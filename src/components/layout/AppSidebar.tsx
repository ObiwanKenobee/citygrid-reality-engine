
import React from 'react';
import { Home, Building, Power, User, Settings, BarChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, href }) => {
  return (
    <Link
      to={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-sidebar-accent text-white' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
      {active && (
        <div className="ml-auto w-2 h-2 rounded-full bg-simcity-blue"></div>
      )}
    </Link>
  );
};

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <aside className="w-64 bg-sidebar flex flex-col border-r border-gray-800">
      <div className="p-4">
        <div className="flex items-center justify-center p-4">
          <span className="text-xl font-bold text-simcity-blue">SCROS</span>
        </div>
      </div>
      
      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Main
      </div>
      
      <nav className="space-y-1 px-3 py-2">
        <NavItem icon={Home} label="Dashboard" active={currentPath === '/'} href="/" />
        <NavItem icon={Building} label="Unit Manager" active={currentPath === '/units'} href="/units" />
        <NavItem icon={BarChart} label="Maintenance AI" active={currentPath === '/maintenance'} href="/maintenance" />
        <NavItem icon={Power} label="Energy & Utilities" active={currentPath === '/energy'} href="/energy" />
        <NavItem icon={User} label="Tenant Portal" active={currentPath === '/tenants'} href="/tenants" />
      </nav>
      
      <div className="px-3 py-2 mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        System
      </div>
      
      <nav className="space-y-1 px-3 py-2">
        <NavItem icon={Settings} label="Admin Dashboard" active={currentPath === '/admin'} href="/admin" />
        <NavItem icon={BarChart} label="Simulation Engine" active={currentPath === '/simulation'} href="/simulation" />
      </nav>
      
      <div className="mt-auto p-4">
        <div className="glass-card p-4 rounded-lg space-y-3">
          <div className="flex items-center space-x-2">
            <div className="status-good"></div>
            <span className="text-xs font-medium">System Online</span>
          </div>
          <div className="text-xs text-gray-400">
            Version 1.0.0
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
