
import React, { useState } from 'react';
import { Settings, BarChart, Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

// Mock maintenance issues
const mockIssues = [
  {
    id: 'M001',
    building: 'Skyline Tower',
    unit: '503',
    issue: 'HVAC System Failure',
    status: 'critical',
    reportedBy: 'Tenant',
    reportedDate: '2025-05-10',
    estimatedCompletion: '2025-05-12',
    assignedTo: 'John Technician',
    priority: 'High',
    details: 'AC not cooling, temperature rising above threshold.',
    predictedCost: '$650-$800'
  },
  {
    id: 'M002',
    building: 'Harbor Plaza',
    unit: 'Common Area',
    issue: 'Water Leak',
    status: 'warning',
    reportedBy: 'System',
    reportedDate: '2025-05-09',
    estimatedCompletion: '2025-05-11',
    assignedTo: 'Mike Plumber',
    priority: 'Medium',
    details: 'Water leak detected in main lobby ceiling.',
    predictedCost: '$300-$500'
  },
  {
    id: 'M003',
    building: 'Riverfront Lofts',
    unit: '203',
    issue: 'Dishwasher Not Draining',
    status: 'normal',
    reportedBy: 'Tenant',
    reportedDate: '2025-05-08',
    estimatedCompletion: '2025-05-13',
    assignedTo: 'Unassigned',
    priority: 'Low',
    details: 'Dishwasher not draining properly after cycle completes.',
    predictedCost: '$150-$250'
  },
  {
    id: 'M004',
    building: 'Skyline Tower',
    unit: '410',
    issue: 'Ceiling Fan Noise',
    status: 'normal',
    reportedBy: 'Tenant',
    reportedDate: '2025-05-07',
    estimatedCompletion: '2025-05-14',
    assignedTo: 'Sarah Electrician',
    priority: 'Low',
    details: 'Ceiling fan making unusual noise when operating at high speed.',
    predictedCost: '$100-$200'
  },
  {
    id: 'M005',
    building: 'Harbor Plaza',
    unit: '512',
    issue: 'Multiple Issues',
    status: 'critical',
    reportedBy: 'System',
    reportedDate: '2025-05-06',
    estimatedCompletion: '2025-05-16',
    assignedTo: 'Renovation Team',
    priority: 'High',
    details: 'Unit requires full renovation: plumbing issues, electrical problems, and wall damage.',
    predictedCost: '$5,000-$7,500'
  }
];

// Mock AI predictions
const mockPredictions = [
  {
    id: 'P001',
    building: 'Skyline Tower',
    system: 'HVAC',
    prediction: 'Maintenance required within 30 days',
    confidence: 87,
    estimatedCost: '$1,200',
    details: 'Performance metrics indicate air handler approaching end of service interval.'
  },
  {
    id: 'P002',
    building: 'Harbor Plaza', 
    system: 'Plumbing',
    prediction: 'Potential water pressure issues',
    confidence: 73,
    estimatedCost: '$500-$800',
    details: 'Gradual pressure decrease detected over past 14 days.'
  },
  {
    id: 'P003',
    building: 'Riverfront Lofts',
    system: 'Electrical Panel',
    prediction: 'Inspection recommended',
    confidence: 65,
    estimatedCost: '$350',
    details: 'Unusual power fluctuations detected in common areas.'
  }
];

// Status badge colors
const statusColors = {
  'critical': 'bg-red-500',
  'warning': 'bg-yellow-500',
  'normal': 'bg-green-500'
};

const MaintenanceAI = () => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [threshold, setThreshold] = useState([70]);
  const [selectedPriority, setSelectedPriority] = useState('All');

  // Filter issues based on priority
  const filteredIssues = selectedPriority === 'All' 
    ? mockIssues
    : mockIssues.filter(issue => issue.priority === selectedPriority);

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-glow mb-2">Maintenance AI</h1>
        <p className="text-gray-400">Predictive analytics for property maintenance</p>
      </div>
      
      {/* AI Control Panel */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI Maintenance Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Switch 
                checked={aiEnabled} 
                onCheckedChange={setAiEnabled} 
                className="data-[state=checked]:bg-simcity-blue"
              />
              <span>{aiEnabled ? 'AI Assistant Enabled' : 'AI Assistant Disabled'}</span>
            </div>
            
            <div className="flex-grow max-w-md">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Prediction Threshold</span>
                <span className="text-sm">{threshold}% confidence</span>
              </div>
              <Slider
                defaultValue={[70]}
                max={100}
                step={5}
                value={threshold}
                onValueChange={setThreshold}
              />
            </div>
            
            <div className="flex gap-2">
              {['All', 'High', 'Medium', 'Low'].map(priority => (
                <button
                  key={priority}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedPriority === priority 
                      ? 'bg-simcity-blue text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                  onClick={() => setSelectedPriority(priority)}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Issues */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Maintenance Issues</span>
                <Badge variant="outline" className="bg-gray-800">
                  {filteredIssues.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredIssues.map(issue => (
                  <div 
                    key={issue.id}
                    className="p-4 border border-gray-800 rounded-lg hover:border-simcity-blue transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-lg font-medium flex items-center gap-2">
                          <Badge className={(statusColors as any)[issue.status]}>
                            {issue.status === 'critical' ? 'Critical' : issue.status === 'warning' ? 'Warning' : 'Normal'}
                          </Badge>
                          {issue.issue}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {issue.building} - Unit {issue.unit}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-gray-800">
                        {issue.id}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>Reported: {issue.reportedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>Due: {issue.estimatedCompletion}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings size={16} className="text-gray-400" />
                        <span>Assigned: {issue.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart size={16} className="text-gray-400" />
                        <span>Est. Cost: {issue.predictedCost}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-300 border-t border-gray-800 pt-3">
                      {issue.details}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* AI Predictions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>AI Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiEnabled ? (
                  mockPredictions.filter(pred => pred.confidence >= threshold[0]).map(prediction => (
                    <div
                      key={prediction.id}
                      className="p-4 border border-gray-800 rounded-lg bg-gray-900 bg-opacity-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-simcity-blue font-medium">{prediction.system}</span>
                        <Badge variant="outline" className="bg-gray-800">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                      
                      <div className="text-sm font-medium mb-1">{prediction.prediction}</div>
                      <div className="text-xs text-gray-400 mb-3">{prediction.building}</div>
                      
                      <div className="text-sm mb-2">
                        Estimated cost: <span className="text-simcity-teal">{prediction.estimatedCost}</span>
                      </div>
                      
                      <div className="text-xs text-gray-300">
                        {prediction.details}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertTriangle size={40} className="text-gray-500 mb-4" />
                    <p className="text-gray-400">AI predictions are disabled</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Enable the AI Assistant to see maintenance predictions
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default MaintenanceAI;
