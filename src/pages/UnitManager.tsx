
import React, { useState } from 'react';
import { Search, Building, ChevronDown, Users, Filter, CheckCircle } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Mock units data
const mockUnits = [
  { 
    id: '101', 
    building: 'Skyline Tower',
    floorplan: 'Studio',
    status: 'Occupied',
    tenant: 'Emma Johnson',
    rent: '$1,200/mo',
    nextPayment: '05/15/2025',
    sqft: 550,
    amenities: ['AC', 'Dishwasher', 'Walk-in Closet'],
    maintenanceRequests: 0
  },
  { 
    id: '203', 
    building: 'Harbor Plaza',
    floorplan: '1 Bedroom',
    status: 'Occupied',
    tenant: 'Mark Davis',
    rent: '$1,750/mo',
    nextPayment: '05/01/2025',
    sqft: 750,
    amenities: ['AC', 'Dishwasher', 'Balcony', 'In-unit Laundry'],
    maintenanceRequests: 2
  },
  { 
    id: '305', 
    building: 'Riverfront Lofts',
    floorplan: '2 Bedroom',
    status: 'Vacant',
    tenant: null,
    rent: '$2,300/mo',
    nextPayment: null,
    sqft: 1100,
    amenities: ['AC', 'Dishwasher', 'Balcony', 'In-unit Laundry', 'Fireplace'],
    maintenanceRequests: 0
  },
  { 
    id: '410', 
    building: 'Skyline Tower',
    floorplan: '2 Bedroom Deluxe',
    status: 'Occupied',
    tenant: 'Sarah & Michael Wong',
    rent: '$2,800/mo',
    nextPayment: '05/10/2025',
    sqft: 1250,
    amenities: ['AC', 'Dishwasher', 'Balcony', 'In-unit Laundry', 'Fireplace', 'Walk-in Closet'],
    maintenanceRequests: 1
  },
  { 
    id: '512', 
    building: 'Harbor Plaza',
    floorplan: '3 Bedroom',
    status: 'Maintenance',
    tenant: null,
    rent: '$3,200/mo',
    nextPayment: null,
    sqft: 1500,
    amenities: ['AC', 'Dishwasher', 'Balcony', 'In-unit Laundry', '2 Bathrooms'],
    maintenanceRequests: 3
  }
];

// Unit status colors mapping
const statusColors = {
  'Occupied': 'bg-green-500',
  'Vacant': 'bg-yellow-500',
  'Maintenance': 'bg-red-500',
  'Reserved': 'bg-blue-500'
};

const UnitManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Filter units based on search term, building, and status
  const filteredUnits = mockUnits.filter(unit => {
    const matchesSearch = 
      unit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (unit.tenant && unit.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesBuilding = selectedBuilding === 'All' || unit.building === selectedBuilding;
    const matchesStatus = selectedStatus === 'All' || unit.status === selectedStatus;
    
    return matchesSearch && matchesBuilding && matchesStatus;
  });
  
  // Get unique buildings and statuses for filters
  const buildings = ['All', ...new Set(mockUnits.map(unit => unit.building))];
  const statuses = ['All', ...new Set(mockUnits.map(unit => unit.status))];

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-glow mb-2">Unit Manager</h1>
        <p className="text-gray-400">Manage property units, tenants and maintenance</p>
      </div>
      
      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search units, tenants..."
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
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
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
      
      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.map(unit => (
          <Card key={unit.id} className="overflow-hidden hover:border-simcity-blue transition-colors cursor-pointer">
            <div className="relative">
              <AspectRatio ratio={16/9} className="bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building size={48} className="text-gray-600" />
                </div>
              </AspectRatio>
              <div className="absolute top-2 left-2">
                <Badge className={`${(statusColors as any)[unit.status]}`}>
                  {unit.status}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-gray-800 bg-opacity-75">
                  {unit.id}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{unit.floorplan}</span>
                <span className="text-simcity-blue">{unit.rent}</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Building:</span>
                  <span>{unit.building}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Size:</span>
                  <span>{unit.sqft} sqft</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Tenant:</span>
                  <span>{unit.tenant || 'None'}</span>
                </div>
                
                {unit.maintenanceRequests > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-400">Maintenance Requests:</span>
                    <span className="text-red-400">{unit.maintenanceRequests}</span>
                  </div>
                )}
                
                <div className="pt-2 flex flex-wrap gap-2">
                  {unit.amenities.slice(0, 3).map(amenity => (
                    <Badge key={amenity} variant="outline" className="bg-gray-800">
                      {amenity}
                    </Badge>
                  ))}
                  {unit.amenities.length > 3 && (
                    <Badge variant="outline" className="bg-gray-800">
                      +{unit.amenities.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default UnitManager;
