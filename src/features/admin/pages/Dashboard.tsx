import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { Users, BookOpen, TrendingUp, DollarSign, Plus, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Courses', value: '156', change: '+8%', icon: BookOpen, color: 'text-green-600' },
    { label: 'Revenue', value: '$45,230', change: '+23%', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Completion Rate', value: '78%', change: '+5%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const recentActivity = [
    { type: 'user', message: '15 new users registered today', time: '2 hours ago', status: 'success' },
    { type: 'course', message: 'New course "Python for Data Science" published', time: '4 hours ago', status: 'success' },
    { type: 'alert', message: 'Server maintenance scheduled for tonight', time: '6 hours ago', status: 'warning' },
    { type: 'revenue', message: 'Monthly revenue target achieved', time: '1 day ago', status: 'success' }
  ];

  const systemHealth = [
    { service: 'API Server', status: 'healthy', uptime: '99.9%' },
    { service: 'Database', status: 'healthy', uptime: '99.8%' },
    { service: 'CDN', status: 'warning', uptime: '98.5%' },
    { service: 'Authentication', status: 'healthy', uptime: '100%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'course': return BookOpen;
      case 'alert': return AlertTriangle;
      case 'revenue': return DollarSign;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your platform</p>
        </div>
        <Button variant="primary" role="admin" className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Quick Actions
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-role-admin-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'success' ? 'bg-green-100' :
                        activity.status === 'warning' ? 'bg-yellow-100' :
                        'bg-gray-100'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          activity.status === 'success' ? 'text-green-600' :
                          activity.status === 'warning' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'healthy' ? 'bg-green-500' :
                        service.status === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      <span className="font-medium text-gray-900">{service.service}</span>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{service.uptime} uptime</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View System Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BookOpen className="h-6 w-6 mb-2" />
                Course Management
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <AlertTriangle className="h-6 w-6 mb-2" />
                System Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;