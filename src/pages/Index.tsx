import React from 'react';
import { Building, User, Gauge, BarChart, Power, Droplet } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import CityGrid from '../components/dashboard/CityGrid';
import StatusCard from '../components/dashboard/StatusCard';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import QuickActions from '../components/dashboard/QuickActions';

// Mock data for buildings
const mockBuildings = [
  { 
    id: '1', 
    name: 'Skyline Tower', 
    status: 'good', 
    type: 'residential',
    size: 'large',
    position: { x: 30, y: 40 }
  },
  { 
    id: '2', 
    name: 'Harbor Plaza', 
    status: 'warning', 
    type: 'commercial',
    size: 'medium',
    position: { x: 50, y: 60 }
  },
  { 
    id: '3', 
    name: 'Riverfront Lofts', 
    status: 'critical', 
    type: 'residential',
    size: 'small',
    position: { x: 75, y: 30 }
  },
  { 
    id: '4', 
    name: 'Industrial Park', 
    status: 'good', 
    type: 'industrial',
    size: 'large',
    position: { x: 20, y: 70 }
  },
  { 
    id: '5', 
    name: 'City Center', 
    status: 'good', 
    type: 'commercial',
    size: 'large',
    position: { x: 60, y: 20 }
  }
] as any[];

// Mock data for alerts
const mockAlerts = [
  {
    id: '1',
    title: 'HVAC System Failure',
    message: 'Skyline Tower unit 503 reporting HVAC malfunction. Temperature rising above threshold.',
    severity: 'high',
    time: '15 min ago'
  },
  {
    id: '2',
    title: 'Water Usage Spike',
    message: 'Unusual water consumption detected at Harbor Plaza, possible leak in main supply.',
    severity: 'medium',
    time: '1 hour ago'
  },
  {
    id: '3',
    title: 'Maintenance Request',
    message: 'Tenant in Riverfront Lofts unit 203 submitted a non-urgent repair request.',
    severity: 'low',
    time: '2 hours ago'
  }
] as any[];

// Mock data for quick actions
const mockActions = [
  { id: '1', title: 'Add Building', icon: Building, color: 'bg-simcity-blue' },
  { id: '2', title: 'Add Tenant', icon: User, color: 'bg-simcity-teal' },
  { id: '3', title: 'Energy Report', icon: Power, color: 'bg-simcity-green' },
  { id: '4', title: 'Water Usage', icon: Droplet, color: 'bg-simcity-orange' }
] as any[];

const Index = () => {
  const handleSelectBuilding = (building: any) => {
    console.log('Selected building:', building);
    // In a real app, this would navigate to the building detail page or open a modal
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-glow mb-2">SimCity Reality OS</h1>
        <p className="text-gray-400">Real-time property management dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <StatusCard 
          title="Total Buildings" 
          value={42} 
          icon={Building} 
          status="good"
          trend={3}
        />
        <StatusCard 
          title="Active Tenants" 
          value={286} 
          icon={User} 
          status="good"
          trend={5}
        />
        <StatusCard 
          title="Energy Efficiency" 
          value="87%" 
          icon={Gauge} 
          status="warning"
          trend={-2}
        />
        <StatusCard 
          title="Maintenance Requests" 
          value={12} 
          icon={BarChart} 
          status="critical"
          trend={8}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="glass-card rounded-lg p-4 mb-6">
            <h2 className="font-medium mb-4">Property Overview</h2>
            <CityGrid 
              buildings={mockBuildings} 
              onSelectBuilding={handleSelectBuilding} 
            />
          </div>
          
          <QuickActions actions={mockActions} />
        </div>
        
        <div>
          <AlertsPanel alerts={mockAlerts} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
