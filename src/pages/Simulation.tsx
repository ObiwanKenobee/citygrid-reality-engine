
import React, { useState } from 'react';
import { BarChart, Settings, TrendingUp, Calculator } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Simulation types
type SimulationType = 'occupancy' | 'energy' | 'maintenance' | 'revenue';

// Mock simulation results
const mockSimulationResults = {
  occupancy: {
    currentRate: 87,
    projectedRate: 92,
    roi: 5.7,
    timeframe: '6 months',
    recommendation: 'Consider 3.5% rent increase in Q3'
  },
  energy: {
    currentUsage: '12.4 kWh/sqft',
    projectedSavings: '18%',
    roi: 11.2,
    timeframe: '12 months',
    recommendation: 'Upgrade HVAC systems in Buildings A and C'
  },
  maintenance: {
    currentExpense: '$32,450/mo',
    projectedSavings: '22%',
    roi: 15.6,
    timeframe: '24 months',
    recommendation: 'Implement predictive maintenance schedule'
  },
  revenue: {
    currentRevenue: '$145,300/mo',
    projectedIncrease: '8.5%',
    roi: 8.9,
    timeframe: '12 months',
    recommendation: 'Renovate units in Building B to premium tier'
  }
};

// Simulation parameters
type SimulationParams = {
  timeframe: number;
  intensity: number;
  optimizeFor: 'cost' | 'revenue' | 'sustainability';
};

const Simulation = () => {
  const [activeSimulation, setActiveSimulation] = useState<SimulationType>('occupancy');
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [simulationParams, setSimulationParams] = useState<SimulationParams>({
    timeframe: 12,
    intensity: 50,
    optimizeFor: 'revenue'
  });

  const handleRunSimulation = () => {
    setIsRunning(true);
    // In a real app, this would call an API
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
    }, 2000);
  };

  const handleChangeSimulation = (type: SimulationType) => {
    setActiveSimulation(type);
    setShowResults(false);
  };

  const handleParamChange = (param: keyof SimulationParams, value: any) => {
    setSimulationParams(prev => ({
      ...prev,
      [param]: value
    }));
    setShowResults(false);
  };

  const result = mockSimulationResults[activeSimulation];

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-glow mb-2">Simulation Engine</h1>
        <p className="text-gray-400">Run property simulations to optimize management decisions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <SimulationTypeCard
          title="Occupancy Optimization"
          description="Predict vacancy rates and optimize pricing"
          icon={<BarChart />}
          isActive={activeSimulation === 'occupancy'}
          onClick={() => handleChangeSimulation('occupancy')}
        />
        <SimulationTypeCard
          title="Energy Efficiency"
          description="Calculate potential energy savings with upgrades"
          icon={<TrendingUp />}
          isActive={activeSimulation === 'energy'}
          onClick={() => handleChangeSimulation('energy')}
        />
        <SimulationTypeCard
          title="Maintenance Planning"
          description="Predict maintenance costs and schedule optimizations"
          icon={<Settings />}
          isActive={activeSimulation === 'maintenance'}
          onClick={() => handleChangeSimulation('maintenance')}
        />
        <SimulationTypeCard
          title="Revenue Forecasting"
          description="Project revenue based on market conditions"
          icon={<Calculator />}
          isActive={activeSimulation === 'revenue'}
          onClick={() => handleChangeSimulation('revenue')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
              <CardDescription>Adjust parameters to fine-tune your simulation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Timeframe (months)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    value={simulationParams.timeframe}
                    onChange={(e) => handleParamChange('timeframe', parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>{simulationParams.timeframe}</span>
                    <span>36</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Simulation Intensity
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={simulationParams.intensity}
                    onChange={(e) => handleParamChange('intensity', parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Basic</span>
                    <span>Advanced</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Optimization Target
                  </label>
                  <div className="flex space-x-2">
                    {(['cost', 'revenue', 'sustainability'] as const).map(target => (
                      <button
                        key={target}
                        onClick={() => handleParamChange('optimizeFor', target)}
                        className={`px-4 py-2 rounded-lg ${
                          simulationParams.optimizeFor === target
                            ? 'bg-simcity-blue text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {target.charAt(0).toUpperCase() + target.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <button
                className="w-full py-2 rounded-lg bg-simcity-blue text-white hover:bg-simcity-teal transition-colors flex items-center justify-center"
                onClick={handleRunSimulation}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Running Simulation...
                  </>
                ) : (
                  'Run Simulation'
                )}
              </button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                {showResults 
                  ? `${activeSimulation.charAt(0).toUpperCase() + activeSimulation.slice(1)} simulation results` 
                  : 'Run a simulation to view results'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showResults ? (
                <div className="text-center py-12 text-gray-500">
                  <BarChart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Results will appear here after running a simulation</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Current</div>
                      <div className="text-xl font-bold">{result.currentRate || result.currentUsage || result.currentExpense || result.currentRevenue}</div>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Projected</div>
                      <div className="text-xl font-bold text-simcity-green">{result.projectedRate || result.projectedSavings || result.projectedIncrease}%</div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <div className="text-xs text-gray-400">ROI</div>
                      <div className="text-xs text-gray-400">Timeframe</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xl font-bold text-simcity-blue">{result.roi}x</div>
                      <div className="text-xl font-bold">{result.timeframe}</div>
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertTitle>AI Recommendation</AlertTitle>
                    <AlertDescription>{result.recommendation}</AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

// Simulation type selection card component
const SimulationTypeCard = ({
  title,
  description,
  icon,
  isActive,
  onClick
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`cursor-pointer glass-card p-4 rounded-lg border ${
        isActive ? 'border-simcity-blue' : 'border-gray-800'
      } hover:border-simcity-blue transition-colors`}
      onClick={onClick}
    >
      <div className={`${isActive ? 'text-simcity-blue' : 'text-gray-400'} mb-2`}>
        {icon}
      </div>
      <h3 className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
        {title}
      </h3>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
};

export default Simulation;
