import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { User, Mail, Calendar, BookOpen, Users, Trophy, Edit, Settings } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthProvider';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    { label: 'Courses Created', value: '12', icon: BookOpen },
    { label: 'Total Students', value: '234', icon: Users },
    { label: 'Avg. Rating', value: '4.8', icon: Trophy },
    { label: 'Years Teaching', value: '5', icon: Calendar }
  ];

  const achievements = [
    { title: 'Course Creator', description: 'Created your first course', earned: true },
    { title: 'Student Mentor', description: 'Helped 100+ students', earned: true },
    { title: 'Top Rated', description: 'Maintained 4.5+ rating', earned: true },
    { title: 'Innovation Award', description: 'Created innovative content', earned: false }
  ];

  const recentActivity = [
    { type: 'course', title: 'Updated "Advanced React Patterns" curriculum', time: '2 hours ago' },
    { type: 'grade', title: 'Graded 15 assignments in JavaScript Fundamentals', time: '5 hours ago' },
    { type: 'student', title: 'Responded to 8 student questions', time: '1 day ago' },
    { type: 'course', title: 'Published new lesson in Web Development Bootcamp', time: '2 days ago' }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Profile</h1>
          <p className="text-gray-600 mt-1">Manage your teaching profile and preferences</p>
        </div>
        <Button variant="primary" role="faculty">
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
                  <div className="h-20 w-20 bg-role-faculty-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-role-faculty-600" />
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
                      <span className="inline-block px-3 py-1 bg-role-faculty-100 text-role-faculty-700 rounded-full text-sm font-medium capitalize">
                        {user.role}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Since</label>
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

          {/* Teaching Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Teaching Bio</CardTitle>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Passionate educator with over 5 years of experience in web development and computer science. 
                  Specializes in modern JavaScript frameworks, particularly React and Node.js. Committed to 
                  creating engaging, hands-on learning experiences that prepare students for real-world challenges 
                  in software development.
                </p>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'JavaScript', 'Node.js', 'TypeScript', 'Web Development'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-role-faculty-100 text-role-faculty-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
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
                        activity.type === 'grade' ? 'bg-green-100' :
                        'bg-role-faculty-100'
                      }`}>
                        {activity.type === 'course' && <BookOpen className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'grade' && <Trophy className="h-4 w-4 text-green-600" />}
                        {activity.type === 'student' && <Users className="h-4 w-4 text-role-faculty-600" />}
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

        {/* Stats and Achievements Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Teaching Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-role-faculty-100 rounded-lg">
                            <Icon className="h-4 w-4 text-role-faculty-600" />
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

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-3 rounded-lg ${achievement.earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                          <Trophy className={`h-4 w-4 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
                          <span className="text-yellow-600 text-xs font-bold">✨</span>
                        )}
                      </div>
                    </div>
                  ))}
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
                    Create Course
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View Students
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="h-4 w-4 mr-2" />
                    Grade Assignments
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