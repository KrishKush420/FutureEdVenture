import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { Button } from '@design-system/components';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  Settings,
  Bell,
  LogOut,
  User,
  ChevronDown,
  GraduationCap,
  UserCheck,
  Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

const roleConfig = {
  student: {
    color: 'role-student',
    icon: GraduationCap,
    routes: [
      { path: '/student', icon: Home, label: 'Dashboard' },
      { path: '/student/courses', icon: BookOpen, label: 'My Courses' },
      { path: '/student/quests', icon: Users, label: 'Quest Hub' },
      { path: '/student/profile', icon: User, label: 'Profile' }
    ]
  },
  faculty: {
    color: 'role-faculty',
    icon: UserCheck,
    routes: [
      { path: '/faculty', icon: Home, label: 'Dashboard' },
      { path: '/faculty/courses', icon: BookOpen, label: 'My Courses' },
      { path: '/faculty/students', icon: Users, label: 'Students' },
      { path: '/faculty/gradebook', icon: Settings, label: 'Gradebook' },
      { path: '/faculty/profile', icon: User, label: 'Profile' }
    ]
  },
  admin: {
    color: 'role-admin',
    icon: Shield,
    routes: [
      { path: '/admin', icon: Home, label: 'Dashboard' },
      { path: '/admin/users', icon: Users, label: 'User Management' },
      { path: '/admin/courses', icon: BookOpen, label: 'Course Management' },
      { path: '/admin/analytics', icon: Settings, label: 'Analytics' },
      { path: '/admin/settings', icon: Settings, label: 'Settings' }
    ]
  },
  SCHOOL_SETUP_ADMIN: {
    color: 'role-admin',
    icon: Settings,
    routes: [
      { path: '/school-setup', icon: Settings, label: 'School Setup' }
    ]
  }
};

export const SidebarLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) return null;

  const config = roleConfig[user.role];
  const RoleIcon = config.icon;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-${config.color}-100`}>
              <RoleIcon className={`h-6 w-6 text-${config.color}-600`} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">HindAcademy</h1>
              <p className={`text-sm text-${config.color}-600 capitalize`}>{user.role} Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {config.routes.map((route) => {
              const Icon = route.icon;
              const isActive = isActiveRoute(route.path);
              
              return (
                <li key={route.path}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate(route.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      isActive
                        ? `bg-${config.color}-100 text-${config.color}-700 border-r-2 border-${config.color}-600`
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {route.label}
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <button
                    onClick={() => navigate(`/${user.role}/profile`)}
                    className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 rounded-t-lg"
                  >
                    <User className="h-4 w-4 mr-3 text-gray-500" />
                    <span className="text-sm text-gray-700">Profile Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 rounded-b-lg text-error-600"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-error-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};