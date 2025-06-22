import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { BookOpen, Clock, Users, Star, Play } from 'lucide-react';

const Courses: React.FC = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      rating: 4.8,
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      nextLesson: 'Custom Hooks Deep Dive'
    },
    {
      id: 2,
      title: 'TypeScript Fundamentals',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      rating: 4.9,
      thumbnail: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=800',
      nextLesson: 'Generic Types'
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      instructor: 'Dr. Emily Rodriguez',
      progress: 45,
      totalLessons: 30,
      completedLessons: 14,
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      nextLesson: 'Database Integration'
    }
  ];

  const availableCourses = [
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'Dr. Alex Kumar',
      duration: '8 weeks',
      students: 1250,
      rating: 4.6,
      price: 'Free',
      thumbnail: 'https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      instructor: 'Prof. Lisa Wang',
      duration: '12 weeks',
      students: 890,
      rating: 4.8,
      price: '$99',
      thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">Continue your learning journey</p>
        </div>
        <Button variant="outline">
          <BookOpen className="h-4 w-4 mr-2" />
          Browse All Courses
        </Button>
      </motion.div>

      {/* Enrolled Courses */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course, index) => (
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
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
                    <span className="text-sm font-medium text-role-student-600">
                      {course.progress}% Complete
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{course.instructor}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-role-student-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-role-student-50 rounded-lg">
                    <p className="text-sm text-role-student-700">
                      <span className="font-medium">Next:</span> {course.nextLesson}
                    </p>
                  </div>

                  <Button variant="primary" role="student" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Available Courses */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Discover New Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Card hover className="h-full">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-lg">
                    <span className="text-sm font-bold text-role-student-600">
                      {course.price}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{course.instructor}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()} students
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;