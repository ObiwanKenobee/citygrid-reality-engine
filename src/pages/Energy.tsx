
import React, { useState } from 'react';
import { Power, Droplet, Gauge, TrendingDown, TrendingUp, BarChart } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock energy data
const mockEnergyData = {
  electricity: {
    current: '12,450 kWh',
    previous: '13,200 kWh',
    trend: -5.7,
    cost: '$1,743.00',
    prevCost: '$1,848.00',
    breakdown: {
      'HVAC': 42,
      'Lighting': 28,
      'Water Heating': 15,
      'Appliances': 10,
      'Other': 5
    }
  },
  water: {
    current: '325,600 gal',
    previous: '342,800 gal',
    trend: -5.0,
    cost: '$2,931.20',
    prevCost: '$3,085.20',
    breakdown: {
      'Residential Usage': 68,
      'Landscaping': 20,
      'Common Areas': 7,
      'Leakage': 5
    }
  },
  gas: {
    current: '2,130 therms',
    previous: '2,450 therms',
    trend: -13.1,
    cost: '$2,556.00',
    prevCost: '$2,940.00',
    breakdown: {
      'Heating': 75,
      'Water Heating': 20,
      'Cooking': 5
    }
  }
};

// Mock buildings energy efficiency
const mockBuildingEfficiency = [
  { 
    name: 'Skyline Tower',
    efficiency: 87,
    status: 'good',
    trend: 3,
    recommendations: [
      'Replace hallway lighting with LED fixtures',
      'Upgrade to smart thermostats in all units'
    ]
  },
  { 
    name: 'Harbor Plaza',
    efficiency: 72,
    status: 'warning',
    trend: -2,
    recommendations: [
      'HVAC system maintenance required',
      'Inspect window seals on south-facing units',
      'Install low-flow shower heads in all units'
    ]
  },
  { 
    name: 'Riverfront Lofts',
    efficiency: 94,
    status: 'good',
    trend: 5,
    recommendations: [
      'Continue monitoring solar panel performance'
    ]
  },
  { 
    name: 'City Center',
    efficiency: 65,
    status: 'critical',
    trend: -8,
    recommendations: [
      'Replace outdated HVAC system',
      'Upgrade insulation in attic areas',
      'Switch to energy efficient appliances',
      'Install building automation system'
    ]
  },
  { 
    name: 'Industrial Park',
    efficiency: 79,
    status: 'warning',
    trend: 0,
    recommendations: [
      'Schedule HVAC maintenance',
      'Implement motion sensors for warehouse lighting'
    ]
  }
];

// Status colors
const statusColor = {
  'good': 'bg-green-500',
  'warning': 'bg-yellow-500',
  'critical': 'bg-red-500'
};

const Energy = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [selectedUtility, setSelectedUtility] = useState('electricity');
  
  // Get current utility data
  const utilityData = mockEnergyData[selectedUtility as keyof typeof mockEnergyData];
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-glow mb-2">Energy & Utilities</h1>
        <p className="text-gray-400">Monitor and optimize energy usage across properties</p>
      </div>
      
      {/* Time Period Selector */}
      <div className="mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          {['day', 'week', 'month', 'quarter', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 text-sm first:rounded-l-md last:rounded-r-md ${
                timeframe === period 
                  ? 'bg-simcity-blue text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              } border-r border-gray-700 last:border-r-0`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Utility Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card 
          className={`cursor-pointer transition-colors ${selectedUtility === 'electricity' ? 'border-simcity-blue' : 'border-gray-800'}`}
          onClick={() => setSelectedUtility('electricity')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
              <Power className="text-blue-500" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-medium">Electricity</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{mockEnergyData.electricity.current}</span>
                {mockEnergyData.electricity.trend < 0 ? (
                  <Badge className="bg-green-500 flex items-center gap-1">
                    <TrendingDown size={14} /> {Math.abs(mockEnergyData.electricity.trend)}%
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 flex items-center gap-1">
                    <TrendingUp size={14} /> {mockEnergyData.electricity.trend}%
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-colors ${selectedUtility === 'water' ? 'border-simcity-blue' : 'border-gray-800'}`}
          onClick={() => setSelectedUtility('water')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-teal-500 bg-opacity-20 p-3 rounded-full">
              <Droplet className="text-teal-500" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-medium">Water</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{mockEnergyData.water.current}</span>
                {mockEnergyData.water.trend < 0 ? (
                  <Badge className="bg-green-500 flex items-center gap-1">
                    <TrendingDown size={14} /> {Math.abs(mockEnergyData.water.trend)}%
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 flex items-center gap-1">
                    <TrendingUp size={14} /> {mockEnergyData.water.trend}%
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer transition-colors ${selectedUtility === 'gas' ? 'border-simcity-blue' : 'border-gray-800'}`}
          onClick={() => setSelectedUtility('gas')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-orange-500 bg-opacity-20 p-3 rounded-full">
              <Gauge className="text-orange-500" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-medium">Natural Gas</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{mockEnergyData.gas.current}</span>
                {mockEnergyData.gas.trend < 0 ? (
                  <Badge className="bg-green-500 flex items-center gap-1">
                    <TrendingDown size={14} /> {Math.abs(mockEnergyData.gas.trend)}%
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 flex items-center gap-1">
                    <TrendingUp size={14} /> {mockEnergyData.gas.trend}%
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Utility Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{selectedUtility.charAt(0).toUpperCase() + selectedUtility.slice(1)} Usage Details</CardTitle>
              <CardDescription>
                Usage data for {timeframe === 'month' ? 'May 2025' : timeframe === 'week' ? 'May 5 - May 11, 2025' : timeframe === 'day' ? 'May 11, 2025' : timeframe === 'quarter' ? 'Q2 2025' : '2025'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Current {timeframe}:</span>
                  <span className="font-bold">{utilityData.current}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Previous {timeframe}:</span>
                  <span>{utilityData.previous}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Change:</span>
                  <span className={utilityData.trend < 0 ? 'text-green-500' : 'text-red-500'}>
                    {utilityData.trend < 0 ? '↓' : '↑'} {Math.abs(utilityData.trend)}%
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Current cost:</span>
                  <span className="text-simcity-blue font-bold">{utilityData.cost}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Previous cost:</span>
                  <span>{utilityData.prevCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Savings:</span>
                  <span className="text-green-500 font-bold">
                    ${(parseFloat(utilityData.prevCost.replace(/[$,]/g, '')) - parseFloat(utilityData.cost.replace(/[$,]/g, ''))).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <h4 className="font-medium mb-3">Usage Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(utilityData.breakdown).map(([category, percentage]) => (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-simcity-blue h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Building Efficiency */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Building Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBuildingEfficiency.map(building => (
                  <div
                    key={building.name}
                    className="p-4 border border-gray-800 rounded-lg hover:border-simcity-blue transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{building.name}</span>
                      <Badge className={(statusColor as any)[building.status]}>
                        {building.efficiency}%
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full ${
                          building.status === 'good' ? 'bg-green-500' : 
                          building.status === 'warning' ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${building.efficiency}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center text-sm mb-2">
                      <span className="text-gray-400 mr-2">Trend:</span>
                      {building.trend > 0 ? (
                        <span className="text-green-500 flex items-center">
                          <TrendingUp size={16} className="mr-1" /> +{building.trend}%
                        </span>
                      ) : building.trend < 0 ? (
                        <span className="text-red-500 flex items-center">
                          <TrendingDown size={16} className="mr-1" /> {building.trend}%
                        </span>
                      ) : (
                        <span className="text-gray-400 flex items-center">
                          <BarChart size={16} className="mr-1" /> {building.trend}%
                        </span>
                      )}
                    </div>
                    
                    {building.recommendations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        <span className="text-xs text-gray-400">Recommendations:</span>
                        <ul className="mt-1 text-xs text-gray-300">
                          {building.recommendations.map((rec, i) => (
                            <li key={i} className="ml-4 list-disc">{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Energy;
