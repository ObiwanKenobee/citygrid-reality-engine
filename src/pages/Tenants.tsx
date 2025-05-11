
import React, { useState } from 'react';
import { Search, User, Mail, Phone, Home, ChevronDown, Filter, BarChart } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

// Mock tenants data
const mockTenants = [
  { 
    id: 'T001',
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    phone: '(555) 123-4567',
    unit: '101',
    building: 'Skyline Tower',
    leaseStart: '2024-09-01',
    leaseEnd: '2025-08-31',
    rent: '$1,200/mo',
    status: 'good',
    paymentHistory: [
      { month: 'May 2025', status: 'paid', date: '2025-05-01' },
      { month: 'Apr 2025', status: 'paid', date: '2025-04-01' },
      { month: 'Mar 2025', status: 'paid', date: '2025-03-02' }
    ],
    maintenanceRequests: 0
  },
  { 
    id: 'T002',
    name: 'Mark Davis',
    email: 'mark.d@example.com',
    phone: '(555) 987-6543',
    unit: '203',
    building: 'Harbor Plaza',
    leaseStart: '2024-11-15',
    leaseEnd: '2025-11-14',
    rent: '$1,750/mo',
    status: 'warning',
    paymentHistory: [
      { month: 'May 2025', status: 'pending', date: '-' },
      { month: 'Apr 2025', status: 'late', date: '2025-04-08' },
      { month: 'Mar 2025', status: 'paid', date: '2025-03-01' }
    ],
    maintenanceRequests: 2
  },
  { 
    id: 'T003',
    name: 'Sarah & Michael Wong',
    email: 'wongs@example.com',
    phone: '(555) 333-9876',
    unit: '410',
    building: 'Skyline Tower',
    leaseStart: '2025-01-01',
    leaseEnd: '2025-12-31',
    rent: '$2,800/mo',
    status: 'good',
    paymentHistory: [
      { month: 'May 2025', status: 'paid', date: '2025-05-01' },
      { month: 'Apr 2025', status: 'paid', date: '2025-04-01' },
      { month: 'Mar 2025', status: 'paid', date: '2025-03-01' }
    ],
    maintenanceRequests: 1
  },
  { 
    id: 'T004',
    name: 'James Wilson',
    email: 'j.wilson@example.com',
    phone: '(555) 444-1122',
    unit: '205',
    building: 'Riverfront Lofts',
    leaseStart: '2024-07-15',
    leaseEnd: '2025-07-14',
    rent: '$1,950/mo',
    status: 'critical',
    paymentHistory: [
      { month: 'May 2025', status: 'unpaid', date: '-' },
      { month: 'Apr 2025', status: 'late', date: '2025-04-15' },
      { month: 'Mar 2025', status: 'late', date: '2025-03-17' }
    ],
    maintenanceRequests: 0
  },
  { 
    id: 'T005',
    name: 'Olivia Chen',
    email: 'olivia.c@example.com',
    phone: '(555) 777-8888',
    unit: '303',
    building: 'Harbor Plaza',
    leaseStart: '2024-10-01',
    leaseEnd: '2025-09-30',
    rent: '$1,850/mo',
    status: 'good',
    paymentHistory: [
      { month: 'May 2025', status: 'paid', date: '2025-05-01' },
      { month: 'Apr 2025', status: 'paid', date: '2025-04-01' },
      { month: 'Mar 2025', status: 'paid', date: '2025-03-01' }
    ],
    maintenanceRequests: 0
  }
];

// Status badge colors
const statusColors = {
  'good': 'bg-green-500',
  'warning': 'bg-yellow-500',
  'critical': 'bg-red-500'
};

// Payment status colors
const paymentColors = {
  'paid': 'bg-green-500',
  'pending': 'bg-yellow-500',
  'late': 'bg-orange-500',
  'unpaid': 'bg-red-500'
};

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showPaymentHistory, setShowPaymentHistory] = useState(true);

  // Get unique buildings for filter
  const buildings = ['All', ...new Set(mockTenants.map(tenant => tenant.building))];
  
  // Filter tenants based on search term and filters
  const filteredTenants = mockTenants.filter(tenant => {
    const matchesSearch = 
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesBuilding = selectedBuilding === 'All' || tenant.building === selectedBuilding;
    const matchesStatus = selectedStatus === 'All' || tenant.status === selectedStatus;
    
    return matchesSearch && matchesBuilding && matchesStatus;
  });
  
  // Get tenant initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-glow mb-2">Tenant Portal</h1>
        <p className="text-gray-400">Manage tenant information, lease details, and communications</p>
      </div>
      
      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tenants, emails, units..."
                className="pl-10 pr-4 py-2 w-full rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:border-simcity-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-row gap-3">
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:border-simcity-blue"
                  value={selectedBuilding}
                  onChange={(e) => setSelectedBuilding(e.target.value)}
                >
                  {buildings.map(building => (
                    <option key={building} value={building}>{building}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none pl-4 pr-10 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:border-simcity-blue"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="good">Good Standing</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700">
                <Filter size={18} className="text-gray-400" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Display Options */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-400">
          Showing {filteredTenants.length} {filteredTenants.length === 1 ? 'tenant' : 'tenants'}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Show Payment History</span>
          <Switch 
            checked={showPaymentHistory} 
            onCheckedChange={setShowPaymentHistory} 
            className="data-[state=checked]:bg-simcity-blue"
          />
        </div>
      </div>
      
      {/* Tenants List */}
      <div className="space-y-6">
        {filteredTenants.map(tenant => (
          <Card key={tenant.id} className="hover:border-simcity-blue transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Tenant Info */}
                <div className="lg:w-2/5 flex gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-simcity-blue">{getInitials(tenant.name)}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">{tenant.name}</h3>
                      <Badge className={(statusColors as any)[tenant.status]}>
                        {tenant.status === 'good' ? 'Good Standing' : 
                         tenant.status === 'warning' ? 'Warning' : 'Critical'}
                      </Badge>
                    </div>
                    
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail size={14} className="text-gray-400" />
                        {tenant.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone size={14} className="text-gray-400" />
                        {tenant.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Home size={14} className="text-gray-400" />
                        {tenant.unit} {tenant.building}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Lease Info */}
                <div className="lg:w-1/5">
                  <div className="text-sm text-gray-400 mb-1">Lease Period</div>
                  <div className="mb-3">{new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}</div>
                  
                  <div className="text-sm text-gray-400 mb-1">Monthly Rent</div>
                  <div className="text-simcity-blue font-bold">{tenant.rent}</div>
                </div>
                
                {/* Payment History */}
                {showPaymentHistory && (
                  <div className="lg:w-2/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-400">Payment History</div>
                      {tenant.maintenanceRequests > 0 && (
                        <Badge variant="outline" className="bg-gray-800">
                          {tenant.maintenanceRequests} maintenance {tenant.maintenanceRequests === 1 ? 'request' : 'requests'}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {tenant.paymentHistory.map((payment, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{payment.month}</span>
                          <div className="flex items-center gap-2">
                            <Badge className={(paymentColors as any)[payment.status]}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </Badge>
                            {payment.date !== '-' && (
                              <span className="text-gray-400">{payment.date}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default Tenants;
