import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { Users, Search, Filter, Mail, MessageSquare, BarChart3, User } from 'lucide-react';

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 1, name: 'Advanced React Patterns' },
    { id: 2, name: 'JavaScript Fundamentals' },
    { id: 3, name: 'Web Development Bootcamp' }
  ];

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.j@email.com',
      course: 'Advanced React Patterns',
      progress: 85,
      lastActive: '2 hours ago',
      status: 'Active',
      assignments: { completed: 8, total: 10 },
      grade: 'A'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@email.com',
      course: 'JavaScript Fundamentals',
      progress: 72,
      lastActive: '1 day ago',
      status: 'Active',
      assignments: { completed: 6, total: 8 },
      grade: 'B+'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol.d@email.com',
      course: 'Web Development Bootcamp',
      progress: 92,
      lastActive: '4 hours ago',
      status: 'Active',
      assignments: { completed: 12, total: 12 },
      grade: 'A+'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.w@email.com',
      course: 'Advanced React Patterns',
      progress: 45,
      lastActive: '5 days ago',
      status: 'At Risk',
      assignments: { completed: 3, total: 10 },
      grade: 'C'
    },
    {
      id: 5,
      name: 'Eva Brown',
      email: 'eva.brown@email.com',
      course: 'JavaScript Fundamentals',
      progress: 88,
      lastActive: '1 hour ago',
      status: 'Active',
      assignments: { completed: 7, total: 8 },
      grade: 'A-'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.course === courses.find(c => c.id === selectedCourse)?.name;
    return matchesSearch && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'At Risk': return 'bg-red-100 text-red-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">Monitor student progress and engagement</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Send Announcement
          </Button>
          <Button variant="primary" role="faculty">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-role-faculty-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-64">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-role-faculty-500 focus:border-transparent"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{filteredStudents.length}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(filteredStudents.reduce((sum, s) => sum + s.progress, 0) / filteredStudents.length) || 0}%
              </p>
              <p className="text-sm text-gray-600">Avg Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {filteredStudents.filter(s => s.status === 'At Risk').length}
              </p>
              <p className="text-sm text-gray-600">At Risk</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((filteredStudents.reduce((sum, s) => sum + s.assignments.completed, 0) / 
                  filteredStudents.reduce((sum, s) => sum + s.assignments.total, 0)) * 100) || 0}%
              </p>
              <p className="text-sm text-gray-600">Assignment Completion</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Student List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <p className="text-sm text-gray-500">{student.course}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{student.progress}%</p>
                        <p className="text-xs text-gray-500">Progress</p>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-role-faculty-600 h-1.5 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className={`text-sm font-medium ${getGradeColor(student.grade)}`}>
                          {student.grade}
                        </p>
                        <p className="text-xs text-gray-500">Grade</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">
                          {student.assignments.completed}/{student.assignments.total}
                        </p>
                        <p className="text-xs text-gray-500">Assignments</p>
                      </div>
                      
                      <div className="text-center">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{student.lastActive}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Students;