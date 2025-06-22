import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { BookOpen, Download, Upload, Filter, BarChart3 } from 'lucide-react';

const Gradebook: React.FC = () => {
  const assignments = [
    { id: 1, name: 'React Hooks Assignment', course: 'Advanced React', dueDate: '2024-01-15', submissions: 42, total: 45 },
    { id: 2, name: 'JavaScript Quiz #3', course: 'JavaScript Fundamentals', dueDate: '2024-01-12', submissions: 65, total: 67 },
    { id: 3, name: 'Final Project', course: 'Web Development', dueDate: '2024-01-20', submissions: 78, total: 89 }
  ];

  const recentGrades = [
    { student: 'Alice Johnson', assignment: 'React Hooks Assignment', grade: 95, submittedAt: '2024-01-14' },
    { student: 'Bob Smith', assignment: 'JavaScript Quiz #3', grade: 87, submittedAt: '2024-01-12' },
    { student: 'Carol Davis', assignment: 'Final Project', grade: 98, submittedAt: '2024-01-19' },
    { student: 'David Wilson', assignment: 'React Hooks Assignment', grade: 72, submittedAt: '2024-01-15' }
  ];

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 bg-green-100';
    if (grade >= 80) return 'text-blue-600 bg-blue-100';
    if (grade >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gradebook</h1>
          <p className="text-gray-600 mt-1">Manage grades and track student performance</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Grades
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" role="faculty">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </motion.div>

      {/* Assignment Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-role-faculty-600" />
                Recent Assignments
              </CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Assignment</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Submissions</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment, index) => (
                    <motion.tr
                      key={assignment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{assignment.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{assignment.course}</td>
                      <td className="py-4 px-4 text-gray-600">{assignment.dueDate}</td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900 font-medium">
                          {assignment.submissions}/{assignment.total}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-role-faculty-600 h-2 rounded-full"
                              style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {Math.round((assignment.submissions / assignment.total) * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Grade
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Grades */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recently Graded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{grade.student}</p>
                    <p className="text-sm text-gray-600">{grade.assignment}</p>
                    <p className="text-xs text-gray-500">Submitted: {grade.submittedAt}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.grade)}`}>
                      {grade.grade}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Grades
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grade Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-lg mb-2">
                  <p className="text-2xl font-bold text-green-600">24</p>
                </div>
                <p className="text-sm text-gray-600">A Grades (90-100%)</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-blue-100 rounded-lg mb-2">
                  <p className="text-2xl font-bold text-blue-600">18</p>
                </div>
                <p className="text-sm text-gray-600">B Grades (80-89%)</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-yellow-100 rounded-lg mb-2">
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                </div>
                <p className="text-sm text-gray-600">C Grades (70-79%)</p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-red-100 rounded-lg mb-2">
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <p className="text-sm text-gray-600">Below 70%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Gradebook;