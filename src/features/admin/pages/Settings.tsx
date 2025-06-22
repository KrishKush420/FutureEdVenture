import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { Settings, Save, Shield, Bell, Mail, Database, Server, Globe } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const settingsCategories = [
    {
      title: 'General Settings',
      icon: Settings,
      settings: [
        { name: 'Platform Name', value: 'HindAcademy LMS', type: 'text' },
        { name: 'Default Language', value: 'English', type: 'select' },
        { name: 'Time Zone', value: 'UTC-5 (EST)', type: 'select' },
        { name: 'Maintenance Mode', value: false, type: 'toggle' }
      ]
    },
    {
      title: 'Security Settings',
      icon: Shield,
      settings: [
        { name: 'Two-Factor Authentication', value: true, type: 'toggle' },
        { name: 'Password Complexity', value: 'High', type: 'select' },
        { name: 'Session Timeout', value: '30 minutes', type: 'select' },
        { name: 'IP Whitelist', value: false, type: 'toggle' }
      ]
    },
    {
      title: 'Notification Settings',
      icon: Bell,
      settings: [
        { name: 'Email Notifications', value: true, type: 'toggle' },
        { name: 'Push Notifications', value: true, type: 'toggle' },
        { name: 'SMS Notifications', value: false, type: 'toggle' },
        { name: 'Notification Frequency', value: 'Immediate', type: 'select' }
      ]
    },
    {
      title: 'Email Configuration',
      icon: Mail,
      settings: [
        { name: 'SMTP Server', value: 'smtp.gmail.com', type: 'text' },
        { name: 'SMTP Port', value: '587', type: 'text' },
        { name: 'From Email', value: 'noreply@hindacademy.com', type: 'text' },
        { name: 'Email Templates', value: 'Default', type: 'select' }
      ]
    }
  ];

  const systemInfo = [
    { label: 'Platform Version', value: 'v1.0.0-rc', icon: Server },
    { label: 'Database Version', value: 'PostgreSQL 14.2', icon: Database },
    { label: 'Server Uptime', value: '99.9%', icon: Globe },
    { label: 'Last Backup', value: '2 hours ago', icon: Database }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform settings and preferences</p>
        </div>
        <Button variant="primary" role="admin">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </motion.div>

      {/* System Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="p-3 bg-role-admin-100 rounded-lg w-fit mx-auto mb-3">
                      <Icon className="h-6 w-6 text-role-admin-600" />
                    </div>
                    <p className="text-sm text-gray-600">{info.label}</p>
                    <p className="font-medium text-gray-900">{info.value}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingsCategories.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className="h-5 w-5 mr-2 text-role-admin-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.settings.map((setting, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-900">{setting.name}</p>
                        </div>
                        <div className="flex items-center">
                          {setting.type === 'toggle' ? (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked={setting.value as boolean}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-role-admin-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-role-admin-600"></div>
                            </label>
                          ) : setting.type === 'select' ? (
                            <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-role-admin-500 focus:border-transparent">
                              <option>{setting.value}</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              defaultValue={setting.value as string}
                              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-role-admin-500 focus:border-transparent"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Advanced Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Advanced Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">API Configuration</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">API Rate Limit</label>
                    <input
                      type="text"
                      defaultValue="1000 requests/hour"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-role-admin-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">API Version</label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-role-admin-500 focus:border-transparent">
                      <option>v1.0</option>
                      <option>v2.0 (Beta)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Storage Configuration</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File Upload Limit</label>
                    <input
                      type="text"
                      defaultValue="100 MB"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-role-admin-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Storage Provider</label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-role-admin-500 focus:border-transparent">
                      <option>AWS S3</option>
                      <option>Google Cloud Storage</option>
                      <option>Local Storage</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SettingsPage;