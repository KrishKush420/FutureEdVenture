import React from 'react';
import { Check, Circle, Lock, ChevronRight } from 'lucide-react';
import { useWizardContext } from '../contexts/WizardContext';

export function WizardProgressSidebar() {
  const { state, steps, goToStep, getStepStatus, getProgressPercentage, canNavigateToStep } = useWizardContext();

  const progressPercentage = getProgressPercentage();

  const handleStepClick = (stepId: number) => {
    if (canNavigateToStep(stepId)) {
      goToStep(stepId);
    }
  };

  const getStepIcon = (stepId: number, status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'current':
        return <Circle className="w-3 h-3 fill-current" />;
      case 'locked':
        return <Lock className="w-4 h-4" />;
      default:
        return <span className="text-xs font-semibold">{stepId}</span>;
    }
  };

  const getStepStyles = (status: string, isClickable: boolean) => {
    const baseStyles = "w-full text-left p-3 rounded-lg transition-all duration-200 group";
    switch (status) {
      case 'completed':
        return `${baseStyles} bg-green-50 border border-green-200 hover:bg-green-100 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`;
      case 'current':
        return `${baseStyles} bg-purple-50 border-2 border-purple-300 shadow-md ring-2 ring-purple-100`;
      case 'available':
        return `${baseStyles} bg-gray-50 border border-gray-200 hover:bg-gray-100 cursor-pointer`;
      case 'locked':
        return `${baseStyles} bg-gray-25 border border-gray-100 opacity-60 cursor-not-allowed`;
      default:
        return baseStyles;
    }
  };

  const getIconStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 text-white shadow-sm';
      case 'current':
        return 'bg-purple-600 text-white shadow-md ring-2 ring-purple-200';
      case 'available':
        return 'bg-gray-300 text-gray-700 group-hover:bg-gray-400';
      case 'locked':
        return 'bg-gray-200 text-gray-400';
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="mb-4">
          <h1 className="text-lg font-bold text-gray-900">School Setup Wizard</h1>
          <p className="text-sm text-gray-600">Configuration & Launch</p>
        </div>
        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-800">Overall Progress</span>
            <span className="text-lg font-bold text-purple-600">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-2 shadow-inner">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-gray-600">
              {state.completedSteps.size} of {steps.length} completed
            </span>
            <span className="text-purple-600 font-medium">
              {steps.length - state.completedSteps.size} remaining
            </span>
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isClickable = canNavigateToStep(step.id);

            return (
              <div key={step.id}>
                {/* Category Header */}
                {index === 0 || steps[index - 1].category !== step.category ? (
                  <div className="pt-3 pb-2 first:pt-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {step.category}
                      </h3>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                  </div>
                ) : null}
                <button
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isClickable}
                  className={getStepStyles(status, isClickable)}
                  title={!isClickable ? 'Complete previous steps to unlock' : undefined}
                >
                  <div className="flex items-start gap-3">
                    {/* Step Number/Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${getIconStyles(
                        status
                      )}`}
                    >
                      {getStepIcon(step.id, status)}
                    </div>
                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate pr-2">
                          {step.title}
                        </h4>
                        {(status === 'available' || status === 'completed') && isClickable && (
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-gray-600 line-clamp-2">
                        {step.description}
                      </p>
                      {/* Step Status Indicators */}
                      <div className="flex items-center gap-2 mt-2">
                        {status === 'current' && (
                          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                            Current
                          </span>
                        )}
                        {status === 'completed' && (
                          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            ✓ Done
                          </span>
                        )}
                        {status === 'locked' && (
                          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            🔒 Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer with Quick Stats */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-bold text-green-600">{state.completedSteps.size}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-bold text-purple-600">1</div>
            <div className="text-xs text-gray-600">Current</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-bold text-gray-600">
              {steps.length - state.completedSteps.size - 1}
            </div>
            <div className="text-xs text-gray-600">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
} 