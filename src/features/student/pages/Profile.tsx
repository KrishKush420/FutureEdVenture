import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { User, Mail, Calendar, MapPin, Edit, Settings, Trophy, BookOpen } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthProvider';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    { label: 'Courses Completed', value: '12', icon: BookOpen },
    { label: 'Total Points', value: '1,250', icon: Trophy },
    { label: 'Study Streak', value: '7 days', icon: Calendar },
    { label: 'Rank', value: '#42', icon: Trophy }
  ];

  const recentActivity = [
    { type: 'course', title: 'Completed "Advanced React Patterns"', time: '2 hours ago' },
    { type: 'quest', title: 'Started "TypeScript Explorer" quest', time: '1 day ago' },
    { type: 'achievement', title: 'Earned "Code Warrior" badge', time: '3 days ago' },
    { type: 'course', title: 'Enrolled in "Node.js Backend Development"', time: '5 days ago' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
        <Button variant="primary" role="student">
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <div className="h-20 w-20 bg-role-student-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-role-student-600" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <p className="text-gray-900">{user.firstName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <p className="text-gray-900">{user.lastName}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <span className="inline-block px-3 py-1 bg-role-student-100 text-role-student-700 rounded-full text-sm font-medium capitalize">
                        {user.role}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-gray-900">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'course' ? 'bg-blue-100' :
                        activity.type === 'quest' ? 'bg-role-student-100' :
                        'bg-yellow-100'
                      }`}>
                        {activity.type === 'course' && <BookOpen className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'quest' && <Trophy className="h-4 w-4 text-role-student-600" />}
                        {activity.type === 'achievement' && <Trophy className="h-4 w-4 text-yellow-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Learning Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-role-student-100 rounded-lg">
                            <Icon className="h-4 w-4 text-role-student-600" />
                          </div>
                          <span className="text-gray-700 text-sm">{stat.label}</span>
                        </div>
                        <span className="font-bold text-gray-900">{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Quests
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;