import React from 'react';
import { ChevronLeft, ChevronRight, Check, Loader2, Home } from 'lucide-react';

interface MobileWizardNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
  canGoBack: boolean;
  canProceed: boolean;
  isNavigating: boolean;
  isLastStep: boolean;
}

export function MobileWizardNavigation({
  onPrevious,
  onNext,
  onExit,
  canGoBack,
  canProceed,
  isNavigating,
  isLastStep,
}: MobileWizardNavigationProps) {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 shadow-lg safe-area-inset-bottom">
      <div className="flex items-center justify-between gap-3">
        {/* Back Button */}
        <button
          onClick={onPrevious}
          disabled={!canGoBack || isNavigating}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 min-w-0 flex-1 ${
            canGoBack && !isNavigating
              ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300'
              : 'text-gray-400 bg-gray-50 border border-gray-200 cursor-not-allowed'
          }`}
        >
          {isNavigating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
          <span className="text-sm">Back</span>
        </button>

        {/* Exit Button */}
        <button
          onClick={onExit}
          disabled={isNavigating}
          className="flex items-center justify-center p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Save & Exit"
        >
          <Home className="w-5 h-5" />
        </button>

        {/* Next/Complete Button */}
        <button
          onClick={onNext}
          disabled={!canProceed || isNavigating}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 min-w-0 flex-1 ${
            canProceed && !isNavigating
              ? isLastStep
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isNavigating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">{isLastStep ? 'Completing...' : 'Processing...'}</span>
            </>
          ) : isLastStep ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">Complete</span>
            </>
          ) : (
            <>
              <span className="text-sm">Continue</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
} 