import React from 'react';

export function SimpleTestWizard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">School Setup Wizard</h1>
        <p className="text-gray-600 mb-6">
          This is a test component to verify the routing is working correctly.
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900">Test Status</h3>
            <p className="text-blue-700 text-sm">✅ Routing is working!</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900">User Role</h3>
            <p className="text-green-700 text-sm">SCHOOL_SETUP_ADMIN</p>
          </div>
        </div>
      </div>
    </div>
  );
} 