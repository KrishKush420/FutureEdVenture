import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { Users, Plus, Eye, Edit } from 'lucide-react';

const Courses: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      students: 45,
      completion: 78,
      rating: 4.8,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      lastUpdated: '2 hours ago',
      totalLessons: 24,
      publishedLessons: 24
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      students: 67,
      completion: 65,
      rating: 4.7,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=800',
      lastUpdated: '1 day ago',
      totalLessons: 20,
      publishedLessons: 18
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      students: 89,
      completion: 82,
      rating: 4.9,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      lastUpdated: '3 days ago',
      totalLessons: 40,
      publishedLessons: 35
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      students: 0,
      completion: 0,
      rating: 0,
      status: 'Draft',
      thumbnail: 'https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=800',
      lastUpdated: '5 days ago',
      totalLessons: 30,
      publishedLessons: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      case 'Archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
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
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">Manage and create your courses</p>
        </div>
        <Button variant="primary" role="faculty">
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </motion.div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-lg text-sm font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
                {course.status === 'Active' && (
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
                    <span className="text-sm font-medium text-role-faculty-600">
                      {course.completion}% avg completion
                    </span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {course.title}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} students
                    </div>
                    {course.status === 'Active' && course.rating > 0 && (
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{course.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center justify-between mb-1">
                      <span>Content Progress</span>
                      <span>{course.publishedLessons}/{course.totalLessons} lessons</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-role-faculty-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(course.publishedLessons / course.totalLessons) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Last updated: {course.lastUpdated}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="primary" role="faculty" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-role-faculty-600">
                  {courses.filter(c => c.status === 'Active').length}
                </p>
                <p className="text-sm text-gray-600">Active Courses</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {courses.reduce((sum, c) => sum + c.students, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.completion, 0) / courses.filter(c => c.status === 'Active').length || 0}%
                </p>
                <p className="text-sm text-gray-600">Avg Completion</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {(courses.filter(c => c.rating > 0).reduce((sum, c) => sum + c.rating, 0) / courses.filter(c => c.rating > 0).length || 0).toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Courses;