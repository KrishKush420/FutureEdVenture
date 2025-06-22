import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { BookOpen, Clock, Trophy, TrendingUp, Play, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Courses', value: '4', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Hours Learned', value: '24.5', icon: Clock, color: 'text-green-600' },
    { label: 'Quests Completed', value: '12', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Overall Progress', value: '78%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const recentCourses = [
    { id: 1, title: 'Advanced React Patterns', progress: 75, lastAccessed: '2 hours ago' },
    { id: 2, title: 'TypeScript Fundamentals', progress: 60, lastAccessed: '1 day ago' },
    { id: 3, title: 'Node.js Backend Development', progress: 45, lastAccessed: '3 days ago' }
  ];

  const upcomingDeadlines = [
    { id: 1, task: 'React Project Submission', course: 'Advanced React', due: '2 days', urgent: true },
    { id: 2, task: 'TypeScript Quiz', course: 'TypeScript Fundamentals', due: '5 days', urgent: false },
    { id: 3, task: 'API Design Assignment', course: 'Node.js Backend', due: '1 week', urgent: false }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Ready to continue learning?</p>
        </div>
        <Button variant="primary" role="student" className="mt-4 sm:mt-0">
          <Play className="h-4 w-4 mr-2" />
          Continue Learning
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
                <CardContent className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-role-student-600" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <span className="text-sm text-gray-500">{course.lastAccessed}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-role-student-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-warning-600" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full ${deadline.urgent ? 'bg-error-100' : 'bg-gray-100'}`}>
                      <CheckCircle className={`h-4 w-4 ${deadline.urgent ? 'text-error-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{deadline.task}</p>
                      <p className="text-sm text-gray-500">{deadline.course}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${deadline.urgent ? 'text-error-600' : 'text-gray-600'}`}>
                        Due in {deadline.due}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;