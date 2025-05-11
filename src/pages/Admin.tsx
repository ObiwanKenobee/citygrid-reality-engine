import React, { useState } from 'react';
import { Settings, Users, Shield, Key, Bell, CreditCard, Database, HelpCircle, Save } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

// Mock admin users
const mockUsers = [
  {
    id: 'U001',
    name: 'John Smith',
    email: 'john.smith@simcity.com',
    role: 'Admin',
    lastActive: '2025-05-11T08:32:45Z',
    status: 'active'
  },
  {
    id: 'U002',
    name: 'Maria Garcia',
    email: 'maria.garcia@simcity.com',
    role: 'Property Manager',
    lastActive: '2025-05-10T16:45:22Z',
    status: 'active'
  },
  {
    id: 'U003',
    name: 'David Lee',
    email: 'david.lee@simcity.com',
    role: 'Maintenance',
    lastActive: '2025-05-09T12:18:05Z',
    status: 'inactive'
  },
  {
    id: 'U004',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@simcity.com',
    role: 'Finance',
    lastActive: '2025-05-11T09:05:37Z',
    status: 'active'
  }
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dataBackup: true,
    maintenanceMode: false,
    autoApproveRequests: false,
    twoFactorAuth: true,
    darkMode: true,
    analyticsTracking: true
  });
  
  const handleSettingChange = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof settings]
    }));
  };
  
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-glow mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">System settings and administration</p>
      </div>
      
      {/* Admin Tabs */}
      <div className="mb-6 border-b border-gray-800">
        <div className="flex space-x-4">
          {[
            { id: 'general', label: 'General Settings', icon: Settings },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'api', label: 'API Access', icon: Key },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'billing', label: 'Billing', icon: CreditCard }
          ].map(tab => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 pb-3 px-2 ${
                activeTab === tab.id
                  ? 'text-simcity-blue border-b-2 border-simcity-blue'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div>
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-400">Receive system notifications via email</p>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications} 
                      onCheckedChange={() => handleSettingChange('emailNotifications')} 
                      className="data-[state=checked]:bg-simcity-blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-400">Receive system notifications via SMS</p>
                    </div>
                    <Switch 
                      checked={settings.smsNotifications} 
                      onCheckedChange={() => handleSettingChange('smsNotifications')} 
                      className="data-[state=checked]:bg-simcity-blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Automated Data Backup</h4>
                      <p className="text-sm text-gray-400">Daily automated backups of all system data</p>
                    </div>
                    <Switch 
                      checked={settings.dataBackup} 
                      onCheckedChange={() => handleSettingChange('dataBackup')} 
                      className="data-[state=checked]:bg-simcity-blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Maintenance Mode</h4>
                      <p className="text-sm text-gray-400">Put the system in maintenance mode</p>
                    </div>
                    <Switch 
                      checked={settings.maintenanceMode} 
                      onCheckedChange={() => handleSettingChange('maintenanceMode')} 
                      className="data-[state=checked]:bg-simcity-blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-approve Maintenance Requests</h4>
                      <p className="text-sm text-gray-400">Automatically approve low-priority maintenance requests</p>
                    </div>
                    <Switch 
                      checked={settings.autoApproveRequests} 
                      onCheckedChange={() => handleSettingChange('autoApproveRequests')} 
                      className="data-[state=checked]:bg-simcity-blue"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-simcity-blue text-white rounded-md hover:bg-simcity-teal transition-colors">
                  <Save size={18} />
                  Save Settings
                </button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Configure application behavior and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Require two-factor authentication for all admin users</p>
                    </div>
                    <Switch 
                      checked={settings.twoFactorAuth} 
                      onCheckedChange={() => handleSettingChange('twoFactorAuth')} 
                      className="data-[state=checked]:bg-simcity-blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-gray-400">Use dark mode interface</p>
                    </div>
                    <Switch 
                      checked={settings.darkMode} 
                      onCheckedChange={() => handleSettingChange('darkMode')} 
                      className="data-[state=checked]:bg-simcity-blue"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Analytics Tracking</h4>
                      <p className="text-sm text-gray-400">Enable usage analytics tracking</p>
                    </div>
                    <Switch 
                      checked={settings.analyticsTracking} 
                      onCheckedChange={() => handleSettingChange('analyticsTracking')} 
                      className="data-[state=checked]:bg-simcity-blue"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-simcity-blue text-white rounded-md hover:bg-simcity-teal transition-colors">
                  <Save size={18} />
                  Save Settings
                </button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-400">System Version:</div>
                    <div>SimCity Reality OS 1.0.0</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-400">Last Updated:</div>
                    <div>May 10, 2025</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-400">Database Status:</div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Connected
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-400">API Status:</div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Online
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-400">Error Rate (24h):</div>
                    <div>0.02%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors w-full justify-center">
                  <Database size={18} className="text-gray-400" />
                  Run System Diagnostics
                </button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* User Management */}
        {activeTab === 'users' && (
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>System Users</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <button className="px-4 py-2 bg-simcity-blue text-white rounded-md hover:bg-simcity-teal transition-colors">
                  Add User
                </button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map(user => (
                    <div
                      key={user.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-800 rounded-lg hover:border-simcity-blue transition-colors"
                    >
                      <div className="mb-3 md:mb-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          <Badge variant="outline" className="bg-gray-800">
                            {user.role}
                          </Badge>
                          {user.status === 'active' ? (
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          )}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">{user.email}</div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                        <div className="text-sm text-gray-400">
                          Last active: {new Date(user.lastActive).toLocaleString()}
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-sm border border-gray-700 rounded hover:bg-gray-800 transition-colors">
                            Edit
                          </button>
                          {user.status === 'active' ? (
                            <button className="px-3 py-1 text-sm border border-red-800 text-red-400 rounded hover:bg-red-900 hover:bg-opacity-20 transition-colors">
                              Deactivate
                            </button>
                          ) : (
                            <button className="px-3 py-1 text-sm border border-green-800 text-green-400 rounded hover:bg-green-900 hover:bg-opacity-20 transition-colors">
                              Activate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors w-full justify-center">
                  <HelpCircle size={18} className="text-gray-400" />
                  View Activity Logs
                </button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* Other tabs would be implemented here */}
        {activeTab !== 'general' && activeTab !== 'users' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-800 rounded-full p-6 mb-4">
              <Settings className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-gray-400 text-center max-w-md">
              The {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section is under development and will be available in the next update.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Admin;
