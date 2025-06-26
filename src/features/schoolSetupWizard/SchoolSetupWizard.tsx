import React, { useEffect } from 'react';
import { WizardLayout } from './components/WizardLayout';
import { AdminAccessStep } from './steps/AdminAccessStep';
import { SchoolIdentityStep } from './steps/SchoolIdentityStep';
import { ReviewLaunchStep } from './steps/ReviewLaunchStep';
import { useWizardContext } from './contexts/WizardContext';

export function SchoolSetupWizard() {
  const { state, handleStepDataUpdate, updateStepValidation } = useWizardContext();

  // Handle step data updates
  const handleStepUpdate = (stepId: number, data: any) => {
    handleStepDataUpdate(stepId, data);
  };

  // Handle step validation updates
  const handleValidationChange = (stepId: number, isValid: boolean) => {
    updateStepValidation(stepId, isValid);
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <AdminAccessStep
            data={state.setupData.adminAccess}
            onUpdate={(data) => handleStepUpdate(1, { adminAccess: data })}
            onValidationChange={(isValid) => handleValidationChange(1, isValid)}
          />
        );
      case 2:
        return (
          <SchoolIdentityStep
            data={state.setupData.schoolIdentity}
            onUpdate={(data) => handleStepUpdate(2, { schoolIdentity: data })}
            onValidationChange={(isValid) => handleValidationChange(2, isValid)}
          />
        );
      case 3:
        return (
          <ReviewLaunchStep
            onValidationChange={(isValid) => handleValidationChange(3, isValid)}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step Not Found</h2>
            <p className="text-gray-600">The requested step could not be found.</p>
          </div>
        );
    }
  };

  return (
    <WizardLayout>
      {renderCurrentStep()}
    </WizardLayout>
  );
} 