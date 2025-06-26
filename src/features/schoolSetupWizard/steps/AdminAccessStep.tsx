import React, { useEffect, useState } from 'react';
import { Users, Plus, Trash2, Shield, Mail, CheckCircle } from 'lucide-react';
import { useWizardContext } from '../contexts/WizardContext';
import { AdminAccessData, OperationalAdmin, AdminRole } from '@/types/schoolSetup';

// Available permissions for admin roles
const availablePermissions = [
  { id: 'user_management', name: 'User Management', description: 'Create, edit, and manage user accounts' },
  { id: 'student_records', name: 'Student Records', description: 'Access and modify student information' },
  { id: 'faculty_management', name: 'Faculty Management', description: 'Manage faculty profiles and assignments' },
  { id: 'course_management', name: 'Course Management', description: 'Create and manage courses and curricula' },
  { id: 'grade_management', name: 'Grade Management', description: 'Input and manage student grades' },
];

interface AdminAccessStepProps {
  data: AdminAccessData;
  onUpdate: (data: AdminAccessData) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function AdminAccessStep({ data, onUpdate, onValidationChange }: AdminAccessStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'admins' | 'roles'>('admins');
  const [newAdmin, setNewAdmin] = useState<OperationalAdmin>({
    name: '',
    email: '',
    role: 'OPERATIONAL_ADMIN',
  });
  const [newRole, setNewRole] = useState<AdminRole>({
    name: '',
    permissions: [],
    description: '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (data.operationalAdmins.length === 0) {
      newErrors.admins = 'At least one operational admin is required';
    }
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [data]);

  const addAdmin = () => {
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) return;
    
    const adminWithId = {
      ...newAdmin,
      id: `admin_${Date.now()}`,
      status: 'pending' as const,
    };
    
    onUpdate({
      ...data,
      operationalAdmins: [...data.operationalAdmins, adminWithId],
    });
    
    setNewAdmin({ name: '', email: '', role: 'OPERATIONAL_ADMIN' });
  };

  const removeAdmin = (index: number) => {
    const updatedAdmins = data.operationalAdmins.filter((_, i) => i !== index);
    onUpdate({ ...data, operationalAdmins: updatedAdmins });
  };

  const addRole = () => {
    if (!newRole.name.trim() || newRole.permissions.length === 0) return;
    
    const roleWithId = {
      ...newRole,
      id: `role_${Date.now()}`,
    };
    
    onUpdate({
      ...data,
      adminRoles: [...data.adminRoles, roleWithId],
    });
    
    setNewRole({ name: '', permissions: [], description: '' });
  };

  const removeRole = (index: number) => {
    const updatedRoles = data.adminRoles.filter((_, i) => i !== index);
    onUpdate({ ...data, adminRoles: updatedRoles });
  };

  const togglePermission = (permission: string) => {
    const updatedPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter(p => p !== permission)
      : [...newRole.permissions, permission];
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin & Access</h2>
        <p className="text-gray-600">Set up operational administrators and define access roles</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setActiveTab('admins')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'admins'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Operational Admins
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'roles'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Admin Roles
          </button>
        </div>
      </div>

      {/* Operational Admins Tab */}
      {activeTab === 'admins' && (
        <div className="space-y-6">
          {/* Add New Admin Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              Add Operational Admin
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="admin@school.edu"
                />
              </div>
            </div>
            <button
              onClick={addAdmin}
              disabled={!newAdmin.name.trim() || !newAdmin.email.trim()}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Admin
            </button>
          </div>

          {/* Admins List */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Operational Administrators</h3>
                <span className="text-sm text-gray-500">
                  {data.operationalAdmins.length} admin{data.operationalAdmins.length !== 1 ? 's' : ''}
                </span>
              </div>
              {errors.admins && <p className="text-red-600 text-sm mt-2">{errors.admins}</p>}
            </div>
            {data.operationalAdmins.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">Admin</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">Email</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.operationalAdmins.map((admin, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                              <p className="text-xs text-gray-500">Operational Admin</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{admin.email}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => removeAdmin(index)}
                            className="text-red-600 hover:text-red-800 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Operational Admins</h3>
                <p className="text-gray-500 mb-4">Add at least one operational administrator to continue.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Roles Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          {/* Add New Role Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              Create Admin Role
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Name *</label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Student Records Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Brief description of role responsibilities"
                  />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions * (Select at least one)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {availablePermissions.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{permission.name}</div>
                        <div className="text-xs text-gray-500">{permission.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {newRole.permissions.length} permission{newRole.permissions.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={addRole}
                disabled={!newRole.name.trim() || newRole.permissions.length === 0}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Role
              </button>
            </div>
          </div>

          {/* Roles List */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Admin Roles</h3>
                <span className="text-sm text-gray-500">
                  {data.adminRoles.length} role{data.adminRoles.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            {data.adminRoles.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {data.adminRoles.map((role, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-gray-900">{role.name}</h4>
                          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                            {role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {role.description && <p className="text-sm text-gray-600 mb-3">{role.description}</p>}
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permissionId) => {
                            const permission = availablePermissions.find(p => p.id === permissionId);
                            return permission ? (
                              <span
                                key={permissionId}
                                className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                              >
                                {permission.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                      <button
                        onClick={() => removeRole(index)}
                        className="text-red-600 hover:text-red-800 p-1 rounded ml-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Admin Roles</h3>
                <p className="text-gray-500">Create custom admin roles to organize permissions.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <h4 className="font-semibold text-purple-900 mb-3">Admin & Access Setup Progress</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                data.operationalAdmins.length > 0 ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              {data.operationalAdmins.length > 0 ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <Users className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">Operational Admins</p>
              <p className="text-sm text-gray-600">
                {data.operationalAdmins.length > 0
                  ? `${data.operationalAdmins.length} admin${data.operationalAdmins.length !== 1 ? 's' : ''} configured`
                  : 'No admins added yet'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                data.adminRoles.length > 0 ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              {data.adminRoles.length > 0 ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <Shield className="w-5 h-5 text-gray-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">Admin Roles</p>
              <p className="text-sm text-gray-600">
                {data.adminRoles.length > 0
                  ? `${data.adminRoles.length} role${data.adminRoles.length !== 1 ? 's' : ''} defined`
                  : 'No custom roles created'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 