import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@design-system/components';
import { Users, Search, Filter, Plus, Edit, Trash2, Mail, Shield, User } from 'lucide-react';

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const roles = [
    { id: 'all', name: 'All Roles' },
    { id: 'student', name: 'Students' },
    { id: 'faculty', name: 'Faculty' },
    { id: 'admin', name: 'Administrators' }
  ];

  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.j@email.com',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2 hours ago',
      courses: 4
    },
    {
      id: 2,
      name: 'Dr. Sarah Wilson',
      email: 'sarah.w@email.com',
      role: 'faculty',
      status: 'active',
      joinDate: '2023-08-20',
      lastLogin: '1 day ago',
      courses: 6
    },
    {
      id: 3,
      name: 'Bob Smith',
      email: 'bob.smith@email.com',
      role: 'student',
      status: 'inactive',
      joinDate: '2024-02-10',
      lastLogin: '2 weeks ago',
      courses: 2
    },
    {
      id: 4,
      name: 'Prof. Michael Chen',
      email: 'michael.c@email.com',
      role: 'faculty',
      status: 'active',
      joinDate: '2023-05-12',
      lastLogin: '3 hours ago',
      courses: 8
    },
    {
      id: 5,
      name: 'Admin User',
      email: 'admin@email.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-01-01',
      lastLogin: '30 minutes ago',
      courses: 0
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-role-student-100 text-role-student-700';
      case 'faculty': return 'bg-role-faculty-100 text-role-faculty-700';
      case 'admin': return 'bg-role-admin-100 text-role-admin-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return User;
      case 'faculty': return Users;
      case 'admin': return Shield;
      default: return User;
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
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
        </div>
        <Button variant="primary" role="admin">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </motion.div>

      {/* User Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-role-student-100 rounded-lg w-fit mx-auto mb-3">
                <User className="h-6 w-6 text-role-student-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'student').length}
              </p>
              <p className="text-sm text-gray-600">Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-role-faculty-100 rounded-lg w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-role-faculty-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'faculty').length}
              </p>
              <p className="text-sm text-gray-600">Faculty</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Users</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-role-admin-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-64">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-role-admin-500 focus:border-transparent"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* User List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Courses</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => {
                    const RoleIcon = getRoleIcon(user.role);
                    return (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <RoleIcon className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{user.joinDate}</td>
                        <td className="py-4 px-4 text-gray-600">{user.lastLogin}</td>
                        <td className="py-4 px-4 text-gray-600">{user.courses}</td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UsersPage;