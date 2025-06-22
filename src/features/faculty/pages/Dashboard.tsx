import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { BookOpen, Users, TrendingUp, Calendar, Plus, Eye, MessageSquare } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Courses', value: '6', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Total Students', value: '234', icon: Users, color: 'text-green-600' },
    { label: 'Avg. Course Rating', value: '4.8', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Pending Reviews', value: '12', icon: Calendar, color: 'text-orange-600' }
  ];

  const recentCourses = [
    { id: 1, title: 'Advanced React Patterns', students: 45, completion: 78, lastUpdated: '2 hours ago' },
    { id: 2, title: 'JavaScript Fundamentals', students: 67, completion: 65, lastUpdated: '1 day ago' },
    { id: 3, title: 'Web Development Bootcamp', students: 89, completion: 82, lastUpdated: '3 days ago' }
  ];

  const pendingTasks = [
    { id: 1, task: 'Grade React assignments', course: 'Advanced React', count: 8, urgent: true },
    { id: 2, task: 'Review discussion posts', course: 'JavaScript Fundamentals', count: 15, urgent: false },
    { id: 3, task: 'Update course materials', course: 'Web Development', count: 3, urgent: false }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your courses and students</p>
        </div>
        <Button variant="primary" role="faculty" className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
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
        {/* Course Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-role-faculty-600" />
                Recent Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{course.title}</h4>
                      <span className="text-sm text-gray-500">{course.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>{course.students} students</span>
                      <span>{course.completion}% avg completion</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Discuss
                      </Button>
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

        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full ${task.urgent ? 'bg-error-100' : 'bg-gray-100'}`}>
                      <Calendar className={`h-4 w-4 ${task.urgent ? 'text-error-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{task.task}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{task.course}</p>
                        <span className={`text-sm font-medium ${task.urgent ? 'text-error-600' : 'text-gray-600'}`}>
                          {task.count} items
                        </span>
                      </div>
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