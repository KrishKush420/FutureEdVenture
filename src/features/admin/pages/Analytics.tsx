import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { BarChart3, TrendingUp, Users, BookOpen, DollarSign, Download, Calendar } from 'lucide-react';

const Analytics: React.FC = () => {
  const metrics = [
    { label: 'Total Revenue', value: '$125,430', change: '+23%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Active Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Course Completions', value: '1,234', change: '+18%', icon: BookOpen, color: 'text-purple-600' },
    { label: 'Avg. Session Time', value: '24m 32s', change: '+8%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const topCourses = [
    { title: 'JavaScript Fundamentals', students: 234, revenue: '$18,670', completion: 85 },
    { title: 'Advanced React Patterns', students: 145, revenue: '$12,450', completion: 78 },
    { title: 'Python for Data Science', students: 89, revenue: '$8,900', completion: 72 },
    { title: 'Web Development Bootcamp', students: 67, revenue: '$6,700', completion: 92 }
  ];

  const userGrowth = [
    { month: 'Jan', students: 120, faculty: 8, revenue: 12000 },
    { month: 'Feb', students: 180, faculty: 12, revenue: 18000 },
    { month: 'Mar', students: 240, faculty: 15, revenue: 24000 },
    { month: 'Apr', students: 320, faculty: 18, revenue: 32000 },
    { month: 'May', students: 420, faculty: 22, revenue: 42000 },
    { month: 'Jun', students: 520, faculty: 25, revenue: 52000 }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track performance and growth metrics</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="primary" role="admin">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      <p className="text-sm text-green-600 mt-1">{metric.change} from last month</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-role-admin-600" />
                User Growth Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userGrowth.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-900 w-8">{data.month}</span>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-blue-600">{data.students}</p>
                          <p className="text-xs text-gray-500">Students</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-purple-600">{data.faculty}</p>
                          <p className="text-xs text-gray-500">Faculty</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">${data.revenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Performing Courses */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Top Performing Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <span className="text-sm font-medium text-green-600">{course.revenue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{course.students} students</span>
                      <span>{course.completion}% completion</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-role-admin-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="p-6 bg-blue-50 rounded-lg mb-4">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">94.2%</p>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">User Satisfaction</h3>
                <p className="text-sm text-gray-600">Based on course ratings and feedback</p>
              </div>
              
              <div className="text-center">
                <div className="p-6 bg-green-50 rounded-lg mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">78.5%</p>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Course Completion</h3>
                <p className="text-sm text-gray-600">Average completion rate across all courses</p>
              </div>
              
              <div className="text-center">
                <div className="p-6 bg-purple-50 rounded-lg mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">156</p>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Active Courses</h3>
                <p className="text-sm text-gray-600">Currently available for enrollment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;