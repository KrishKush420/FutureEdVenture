import React, { useEffect, useState } from 'react';
import { Check, Edit, AlertTriangle, Rocket, Building2, User, Users, Shield, Calendar, Database, ChevronRight, ExternalLink, CheckCircle, Clock, Info } from 'lucide-react';
import { useWizardContext } from '../contexts/WizardContext';
import { ReviewLaunchData } from '@/types/schoolSetup';

interface ReviewLaunchStepProps {
  onValidationChange: (isValid: boolean) => void;
}

export function ReviewLaunchStep({ onValidationChange }: ReviewLaunchStepProps) {
  const { state, steps, goToStep, getStepStatus } = useWizardContext();
  const [isLaunchReady, setIsLaunchReady] = useState(false);
  const [missingSteps, setMissingSteps] = useState<number[]>([]);

  // Check if all required steps are completed
  useEffect(() => {
    const requiredSteps = [1, 2]; // Core required steps
    const missing = requiredSteps.filter(stepId => !state.completedSteps.has(stepId));
    setMissingSteps(missing);
    const allRequiredComplete = missing.length === 0;
    setIsLaunchReady(allRequiredComplete);
    onValidationChange(allRequiredComplete);
  }, [state.completedSteps, onValidationChange]);

  const handleEditStep = async (stepId: number) => {
    await goToStep(stepId);
  };

  const getStepCompletionIcon = (stepId: number) => {
    const status = getStepStatus(stepId);
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <Clock className="w-5 h-5 text-indigo-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const formatStepData = (stepId: number) => {
    const stepData = state.stepData[stepId] || {};
    const setupData = state.setupData;
    
    switch (stepId) {
      case 1: // Admin Access
        return {
          title: 'Admin Access',
          icon: Shield,
          data: [
            { label: 'Operational Admins', value: setupData.adminAccess?.operationalAdmins?.length || 0 },
            { label: 'Admin Roles', value: setupData.adminAccess?.adminRoles?.length || 0 },
            { label: 'Total Users', value: (setupData.adminAccess?.operationalAdmins?.length || 0) + (setupData.adminAccess?.adminRoles?.length || 0) },
          ],
        };
      case 2: // School Identity
        return {
          title: 'School Identity',
          icon: Building2,
          data: [
            { label: 'School Name', value: setupData.schoolIdentity?.name || 'Not set' },
            { label: 'Academic Year', value: setupData.schoolIdentity?.academicYear?.startDate && setupData.schoolIdentity?.academicYear?.endDate ? `${new Date(setupData.schoolIdentity.academicYear.startDate).getFullYear()} - ${new Date(setupData.schoolIdentity.academicYear.endDate).getFullYear()}` : 'Not set' },
            { label: 'Timezone', value: setupData.schoolIdentity?.timezone || 'Not set' },
            { label: 'Logo Uploaded', value: setupData.schoolIdentity?.logo ? 'Yes' : 'No' },
          ],
        };
      default:
        return {
          title: `Step ${stepId}`,
          icon: Info,
          data: [{ label: 'Status', value: 'Configured' }],
        };
    }
  };

  const getSystemReadinessChecks = () => {
    const checks = [
      {
        id: 'admin-access',
        label: 'Admin Access Configured',
        status: state.completedSteps.has(1),
        description: 'Operational administrators and access roles',
      },
      {
        id: 'school-identity',
        label: 'School Identity Complete',
        status: state.completedSteps.has(2),
        description: 'School name, logo, academic year, and timezone',
      },
    ];
    return checks;
  };

  const readinessChecks = getSystemReadinessChecks();
  const completedChecks = readinessChecks.filter(check => check.status).length;
  const totalChecks = readinessChecks.length;
  const readinessPercentage = Math.round((completedChecks / totalChecks) * 100);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Review & Launch</h2>
        <p className="text-gray-600 text-base lg:text-lg">Review your configuration and launch your school management system</p>
      </div>

      {/* System Readiness Overview */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900">System Readiness</h3>
            <p className="text-gray-600 text-sm lg:text-base">Overall configuration status</p>
          </div>
          <div className="text-right">
            <div className="text-2xl lg:text-3xl font-bold text-indigo-600">{readinessPercentage}%</div>
            <div className="text-xs lg:text-sm text-gray-500">{completedChecks} of {totalChecks} complete</div>
          </div>
        </div>
        <div className="w-full bg-white rounded-full h-2 lg:h-3 shadow-inner mb-4">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 lg:h-3 rounded-full transition-all duration-700"
            style={{ width: `${readinessPercentage}%` }}
          />
        </div>
        {/* Readiness Checks */}
        <div className="grid grid-cols-1 gap-3">
          {readinessChecks.map((check) => (
            <div
              key={check.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                check.status
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-yellow-50 border border-yellow-200'
              }`}
            >
              {check.status ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <div
                  className={`font-medium text-sm lg:text-base ${
                    check.status ? 'text-green-900' : 'text-yellow-900'
                  }`}
                >
                  {check.label}
                </div>
                <div
                  className={`text-xs lg:text-sm ${
                    check.status ? 'text-green-700' : 'text-yellow-700'
                  }`}
                >
                  {check.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Steps Warning */}
      {missingSteps.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 lg:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-yellow-900 mb-2">Complete Required Steps</h3>
              <p className="text-yellow-800 mb-4 text-sm lg:text-base">
                The following steps must be completed before you can launch the system:
              </p>
              <div className="space-y-2">
                {missingSteps.map((stepId) => {
                  const step = steps.find(s => s.id === stepId);
                  return (
                    <button
                      key={stepId}
                      onClick={() => handleEditStep(stepId)}
                      className="flex items-center gap-2 text-yellow-800 hover:text-yellow-900 font-medium text-sm lg:text-base"
                    >
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Step {stepId}: {step?.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Summary */}
      <div className="space-y-4 lg:space-y-6">
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Configuration Summary</h3>
        <div className="space-y-4 lg:space-y-6">
          {[1, 2].map((stepId) => {
            const stepInfo = formatStepData(stepId);
            const isCompleted = state.completedSteps.has(stepId);
            const IconComponent = stepInfo.icon;
            
            return (
              <div
                key={stepId}
                className={`bg-white border rounded-xl p-4 lg:p-6 transition-all duration-200 ${
                  isCompleted
                    ? 'border-green-200 shadow-sm hover:shadow-md'
                    : 'border-yellow-200 bg-yellow-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? 'bg-green-100' : 'bg-yellow-100'
                      }`}
                    >
                      <IconComponent
                        className={`w-4 h-4 lg:w-5 lg:h-5 ${
                          isCompleted ? 'text-green-600' : 'text-yellow-600'
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{stepInfo.title}</h4>
                      <div className="flex items-center gap-2">
                        {getStepCompletionIcon(stepId)}
                        <span
                          className={`text-xs lg:text-sm ${
                            isCompleted ? 'text-green-600' : 'text-yellow-600'
                          }`}
                        >
                          {isCompleted ? 'Completed' : 'Incomplete'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditStep(stepId)}
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-xs lg:text-sm font-medium transition-colors flex-shrink-0 ml-2"
                  >
                    <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {stepInfo.data.map((item, index) => (
                    <div key={index} className="flex justify-between items-start gap-4">
                      <span className="text-xs lg:text-sm text-gray-600 font-medium flex-shrink-0">{item.label}:</span>
                      <span
                        className="text-xs lg:text-sm text-gray-900 text-right truncate min-w-0"
                        title={item.value.toString()}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Launch Readiness */}
      <div
        className={`rounded-xl p-4 lg:p-6 border-2 ${
          isLaunchReady
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
            : 'bg-gray-50 border-gray-300'
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          {isLaunchReady ? (
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
          ) : (
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3
              className={`text-lg lg:text-xl font-semibold ${
                isLaunchReady ? 'text-green-900' : 'text-gray-700'
              }`}
            >
              {isLaunchReady ? 'Ready to Launch!' : 'Almost Ready'}
            </h3>
            <p
              className={`text-sm lg:text-base ${
                isLaunchReady ? 'text-green-700' : 'text-gray-600'
              }`}
            >
              {isLaunchReady
                ? 'Your school management system is fully configured and ready to use.'
                : `Complete ${missingSteps.length} more step${missingSteps.length > 1 ? 's' : ''} to launch your system.`}
            </p>
          </div>
        </div>
        {isLaunchReady && (
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2 text-sm lg:text-base">What happens when you launch?</h4>
            <ul className="text-xs lg:text-sm text-green-800 space-y-1">
              <li>• Your school management system will be activated</li>
              <li>• Administrator accounts will be created and activated</li>
              <li>• Faculty members will receive welcome emails with login instructions</li>
              <li>• Academic calendar and schedules will be initialized</li>
              <li>• You'll be redirected to the main dashboard</li>
            </ul>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 lg:p-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-blue-900 mb-2 text-sm lg:text-base">After Launch</h4>
            <div className="text-xs lg:text-sm text-blue-800 space-y-1">
              <p>• You can always modify these settings later through the admin panel</p>
              <p>• Additional configuration options will be available in the main application</p>
              <p>• Support documentation and tutorials will be accessible from the help menu</p>
              <p>• Your setup data will be preserved and can be exported if needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 