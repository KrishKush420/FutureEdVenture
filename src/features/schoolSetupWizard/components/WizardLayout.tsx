import React, { ReactNode, useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, AlertCircle, Loader2, Save, Clock, Menu, Home } from 'lucide-react';
import { useWizardContext } from '../contexts/WizardContext';
import { WizardProgressSidebar } from './WizardProgressSidebar';
import { MobileWizardNavigation } from './MobileWizardNavigation';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface WizardLayoutProps {
  children: ReactNode;
}

export function WizardLayout({ children }: WizardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const {
    state,
    steps,
    nextStep,
    previousStep,
    getProgressPercentage,
    isFirstStep,
    isLastStep,
    canProceed,
    canGoBack,
    completeWizard,
    exitWizard,
    clearError,
    saveProgressNow,
  } = useWizardContext();

  const currentStepData = steps.find(step => step.id === state.currentStep);
  const progressPercentage = getProgressPercentage();

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when step changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [state.currentStep]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isMobile]);

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit the setup wizard? Your progress will be saved automatically.')) {
      exitWizard();
    }
  };

  const handleNext = async () => {
    if (state.isNavigating) return;
    if (isLastStep() && canProceed()) {
      await completeWizard();
      toast.success('School live!');
      navigate('/dashboard');
    } else {
      await nextStep();
    }
  };

  const handlePrevious = async () => {
    if (state.isNavigating) return;
    await previousStep();
  };

  const handleDismissError = () => {
    clearError();
  };

  const handleManualSave = () => {
    const saved = saveProgressNow();
    if (saved) {
      console.log('✅ Progress saved manually');
    }
  };

  const formatLastSaved = (date: Date | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 10) return 'Just now';
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {state.currentStep}/{steps.length}
                  </span>
                  {state.isNavigating && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Processing
                    </span>
                  )}
                </div>
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                  {currentStepData?.title}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs text-gray-500">Progress</div>
                <div className="text-sm font-bold text-purple-600">{progressPercentage}%</div>
              </div>
              <button
                onClick={handleExit}
                disabled={state.isNavigating}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Mobile Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar / Mobile Drawer */}
      {isMobile ? (
        <>
          {/* Mobile Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          {/* Mobile Drawer */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out lg:hidden ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="h-full bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Setup Progress</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <WizardProgressSidebar />
            </div>
          </div>
        </>
      ) : (
        <WizardProgressSidebar />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Desktop Top Bar */}
        {!isMobile && (
          <div className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Step {state.currentStep} of {steps.length}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600 font-medium">{currentStepData?.category}</span>
                  {state.isNavigating && (
                    <>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Processing
                      </span>
                    </>
                  )}
                  {state.isAutoSaving && (
                    <>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Auto-saving
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Auto-save Status */}
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Auto-save Status</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">
                        Last saved: {formatLastSaved(state.lastSaved)}
                      </span>
                    </div>
                    <button
                      onClick={handleManualSave}
                      disabled={state.isAutoSaving || state.isNavigating}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                      title="Save progress now"
                    >
                      <Save className="w-3 h-3" />
                      Save Now
                    </button>
                  </div>
                </div>
                {/* Progress Overview */}
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-xl font-bold text-purple-600">{progressPercentage}%</span>
                  </div>
                </div>
                <button
                  onClick={handleExit}
                  disabled={state.isNavigating}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Save & Exit"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {state.lastError && (
          <div className="bg-red-50 border-b border-red-200 px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-red-800">Navigation Error</h3>
                  <p className="text-sm text-red-700">{state.lastError}</p>
                </div>
              </div>
              <button
                onClick={handleDismissError}
                className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step Content Slot */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-5xl mx-auto p-4 lg:p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-8">
              {children}
            </div>
          </div>
        </div>

        {/* Desktop Footer Navigation */}
        {!isMobile && (
          <div className="bg-white border-t border-gray-200 px-8 py-6 shadow-lg">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={!canGoBack() || state.isNavigating}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  canGoBack() && !state.isNavigating
                    ? 'text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow'
                    : 'text-gray-400 cursor-not-allowed border border-gray-200 bg-gray-50'
                }`}
              >
                {state.isNavigating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
                Back
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleExit}
                  disabled={state.isNavigating}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors hover:bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save & Exit Later
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed() || state.isNavigating}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    canProceed() && !state.isNavigating
                      ? isLastStep()
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-sm'
                  }`}
                >
                  {state.isNavigating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isLastStep() ? 'Completing...' : 'Processing...'}
                    </>
                  ) : isLastStep() ? (
                    <>
                      <Check className="w-4 h-4" />
                      Complete Setup
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileWizardNavigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          onExit={handleExit}
          canGoBack={canGoBack()}
          canProceed={canProceed()}
          isNavigating={state.isNavigating}
          isLastStep={isLastStep()}
        />
      )}
    </div>
  );
} 