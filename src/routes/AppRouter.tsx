import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { LoginForm } from '@/components/LoginForm';
import { WizardProvider } from '@/features/schoolSetupWizard/contexts/WizardContext';

// Lazy load feature modules
const StudentDashboard = React.lazy(() => import('@/features/student').then(m => ({ default: m.StudentDashboard })));
const StudentCourses = React.lazy(() => import('@/features/student').then(m => ({ default: m.StudentCourses })));
const StudentQuests = React.lazy(() => import('@/features/student').then(m => ({ default: m.StudentQuests })));
const StudentProfile = React.lazy(() => import('@/features/student').then(m => ({ default: m.StudentProfile })));

const FacultyDashboard = React.lazy(() => import('@/features/faculty').then(m => ({ default: m.FacultyDashboard })));
const FacultyCourses = React.lazy(() => import('@/features/faculty').then(m => ({ default: m.FacultyCourses })));
const FacultyStudents = React.lazy(() => import('@/features/faculty').then(m => ({ default: m.FacultyStudents })));
const FacultyGradebook = React.lazy(() => import('@/features/faculty').then(m => ({ default: m.FacultyGradebook })));
const FacultyProfile = React.lazy(() => import('@/features/faculty').then(m => ({ default: m.FacultyProfile })));

const AdminDashboard = React.lazy(() => import('@/features/admin').then(m => ({ default: m.AdminDashboard })));
const AdminUsers = React.lazy(() => import('@/features/admin').then(m => ({ default: m.AdminUsers })));
const AdminCourses = React.lazy(() => import('@/features/admin').then(m => ({ default: m.AdminCourses })));
const AdminAnalytics = React.lazy(() => import('@/features/admin').then(m => ({ default: m.AdminAnalytics })));
const AdminSettings = React.lazy(() => import('@/features/admin').then(m => ({ default: m.AdminSettings })));

// School Setup Wizard - use the real wizard
const SchoolSetupWizard = React.lazy(() => import('@/features/schoolSetupWizard').then(m => ({ default: m.SchoolSetupWizard })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
};

const RoleBasedRedirect: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Special handling for SCHOOL_SETUP_ADMIN role
  if (user.role === 'SCHOOL_SETUP_ADMIN') {
    return <Navigate to="/school-setup" replace />;
  }

  return <Navigate to={`/${user.role}`} replace />;
};

export const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <RoleBasedRedirect /> : (
              <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <LoginForm />
              </div>
            )
          } 
        />

        {/* School Setup Wizard routes (standalone, no sidebar layout) */}
        <Route 
          path="/school-setup/*" 
          element={
            <ProtectedRoute allowedRoles={['SCHOOL_SETUP_ADMIN']}>
              <Suspense fallback={<LoadingSpinner />}>
                <WizardProvider>
                  <SchoolSetupWizard />
                </WizardProvider>
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Protected routes with layout */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          {/* Root redirect */}
          <Route index element={<RoleBasedRedirect />} />

          {/* Student routes */}
          <Route path="student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Suspense fallback={<LoadingSpinner />}>
                <StudentDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="student/courses" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Suspense fallback={<LoadingSpinner />}>
                <StudentCourses />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="student/quests" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Suspense fallback={<LoadingSpinner />}>
                <StudentQuests />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="student/profile" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Suspense fallback={<LoadingSpinner />}>
                <StudentProfile />
              </Suspense>
            </ProtectedRoute>
          } />

          {/* Faculty routes */}
          <Route path="faculty" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <Suspense fallback={<LoadingSpinner />}>
                <FacultyDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="faculty/courses" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <Suspense fallback={<LoadingSpinner />}>
                <FacultyCourses />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="faculty/students" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <Suspense fallback={<LoadingSpinner />}>
                <FacultyStudents />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="faculty/gradebook" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <Suspense fallback={<LoadingSpinner />}>
                <FacultyGradebook />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="faculty/profile" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <Suspense fallback={<LoadingSpinner />}>
                <FacultyProfile />
              </Suspense>
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminUsers />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="admin/courses" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminCourses />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="admin/analytics" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminAnalytics />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Suspense fallback={<LoadingSpinner />}>
                <AdminSettings />
              </Suspense>
            </ProtectedRoute>
          } />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};