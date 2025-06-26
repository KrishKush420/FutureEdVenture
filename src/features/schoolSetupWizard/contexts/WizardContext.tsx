import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { SchoolSetupDraft, WizardState, WizardStep, WizardContextType } from '@/types/schoolSetup';

const STORAGE_KEY = 'schoolSetupDraft';
const AUTO_SAVE_INTERVAL = 5000; // 5 seconds

const wizardSteps: WizardStep[] = [
  {
    id: 1,
    title: 'Admin & Access',
    description: 'Create operational administrators and define access roles',
    category: 'Foundation',
    path: '/school-setup/admin-access',
    isImplemented: true,
  },
  {
    id: 2,
    title: 'School Identity',
    description: 'Set up school name, logo, academic year, and timezone',
    category: 'Foundation',
    path: '/school-setup/school-identity',
    isImplemented: true,
    dependencies: [1],
  },
  {
    id: 3,
    title: 'Review & Launch',
    description: 'Review your configuration and launch your school management system',
    category: 'Launch',
    path: '/school-setup/review-launch',
    isImplemented: true,
    dependencies: [1, 2],
  },
];

const initialState: WizardState = {
  currentStep: 1,
  completedSteps: new Set(),
  visitedSteps: new Set([1]),
  stepValidation: {},
  stepData: {},
  setupData: {
    adminAccess: {
      operationalAdmins: [],
      adminRoles: [],
    },
    schoolIdentity: {
      name: '',
      academicYear: {
        startDate: '',
        endDate: '',
      },
      timezone: '',
    },
    reviewLaunch: {
      isLaunchReady: false,
      missingSteps: [],
      launchConfirmed: false,
    },
  },
  lastSaved: null,
  isNavigating: false,
  isAutoSaving: false,
  lastError: null,
};

type WizardAction =
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'COMPLETE_STEP'; payload: number }
  | { type: 'VISIT_STEP'; payload: number }
  | { type: 'UPDATE_STEP_VALIDATION'; payload: { stepId: number; isValid: boolean } }
  | { type: 'UPDATE_STEP_DATA'; payload: { stepId: number; data: any } }
  | { type: 'UPDATE_SETUP_DATA'; payload: Partial<SchoolSetupDraft> }
  | { type: 'SET_NAVIGATING'; payload: boolean }
  | { type: 'SET_AUTO_SAVING'; payload: boolean }
  | { type: 'SET_LAST_SAVED'; payload: Date }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_STATE'; payload: WizardState }
  | { type: 'RESET_STATE' };

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
        visitedSteps: new Set([...state.visitedSteps, action.payload]),
      };
    case 'COMPLETE_STEP':
      return {
        ...state,
        completedSteps: new Set([...state.completedSteps, action.payload]),
      };
    case 'VISIT_STEP':
      return {
        ...state,
        visitedSteps: new Set([...state.visitedSteps, action.payload]),
      };
    case 'UPDATE_STEP_VALIDATION':
      return {
        ...state,
        stepValidation: {
          ...state.stepValidation,
          [action.payload.stepId]: action.payload.isValid,
        },
      };
    case 'UPDATE_STEP_DATA':
      return {
        ...state,
        stepData: {
          ...state.stepData,
          [action.payload.stepId]: action.payload.data,
        },
      };
    case 'UPDATE_SETUP_DATA':
      return {
        ...state,
        setupData: {
          ...state.setupData,
          ...action.payload,
        },
      };
    case 'SET_NAVIGATING':
      return {
        ...state,
        isNavigating: action.payload,
      };
    case 'SET_AUTO_SAVING':
      return {
        ...state,
        isAutoSaving: action.payload,
      };
    case 'SET_LAST_SAVED':
      return {
        ...state,
        lastSaved: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        lastError: action.payload,
      };
    case 'LOAD_STATE':
      return action.payload;
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Convert arrays back to Sets
        parsedState.completedSteps = new Set(parsedState.completedSteps);
        parsedState.visitedSteps = new Set(parsedState.visitedSteps);
        parsedState.lastSaved = parsedState.lastSaved ? new Date(parsedState.lastSaved) : null;
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load saved wizard state:', error);
      }
    }
  }, []);

  // Auto-save functionality
  const saveProgress = useCallback((force = false) => {
    try {
      const dataToSave = {
        ...state,
        completedSteps: Array.from(state.completedSteps),
        visitedSteps: Array.from(state.visitedSteps),
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      dispatch({ type: 'SET_LAST_SAVED', payload: new Date() });
      return true;
    } catch (error) {
      console.error('Failed to save wizard progress:', error);
      return false;
    }
  }, [state]);

  // Auto-save timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (state.visitedSteps.size > 0) {
        dispatch({ type: 'SET_AUTO_SAVING', payload: true });
        saveProgress();
        setTimeout(() => {
          dispatch({ type: 'SET_AUTO_SAVING', payload: false });
        }, 500);
      }
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [saveProgress, state.visitedSteps.size]);

  const isStepCompleted = useCallback((stepId: number): boolean => {
    return state.completedSteps.has(stepId);
  }, [state.completedSteps]);

  const canAccessStep = useCallback((stepId: number): boolean => {
    const step = wizardSteps.find(s => s.id === stepId);
    if (!step) return false;
    if (stepId === 1) return true;
    if (step.dependencies) {
      return step.dependencies.every(depId => state.completedSteps.has(depId));
    }
    return true;
  }, [state.completedSteps]);

  const goToStep = useCallback((stepId: number) => {
    if (canAccessStep(stepId)) {
      dispatch({ type: 'SET_NAVIGATING', payload: true });
      dispatch({ type: 'SET_CURRENT_STEP', payload: stepId });
      setTimeout(() => {
        dispatch({ type: 'SET_NAVIGATING', payload: false });
      }, 300);
    }
  }, [canAccessStep]);

  const nextStep = useCallback(() => {
    const nextStepId = state.currentStep + 1;
    if (nextStepId <= wizardSteps.length && canAccessStep(nextStepId)) {
      goToStep(nextStepId);
    }
  }, [state.currentStep, canAccessStep, goToStep]);

  const previousStep = useCallback(() => {
    const prevStepId = state.currentStep - 1;
    if (prevStepId >= 1) {
      goToStep(prevStepId);
    }
  }, [state.currentStep, goToStep]);

  const completeStep = useCallback((stepId: number) => {
    dispatch({ type: 'COMPLETE_STEP', payload: stepId });
  }, []);

  const handleStepDataUpdate = useCallback((stepId: number, data: Partial<SchoolSetupDraft>) => {
    dispatch({ type: 'UPDATE_SETUP_DATA', payload: data });
    dispatch({ type: 'UPDATE_STEP_DATA', payload: { stepId, data } });
  }, []);

  const updateStepValidation = useCallback((stepId: number, isValid: boolean) => {
    dispatch({ type: 'UPDATE_STEP_VALIDATION', payload: { stepId, isValid } });
    if (isValid && !state.completedSteps.has(stepId)) {
      completeStep(stepId);
    }
  }, [state.completedSteps, completeStep]);

  const getStepStatus = useCallback((stepId: number) => {
    if (state.completedSteps.has(stepId)) return 'completed';
    if (state.currentStep === stepId) return 'current';
    if (canAccessStep(stepId)) return 'available';
    return 'locked';
  }, [state.completedSteps, state.currentStep, canAccessStep]);

  const getProgressPercentage = useCallback(() => {
    return Math.round((state.completedSteps.size / wizardSteps.length) * 100);
  }, [state.completedSteps.size]);

  const canNavigateToStep = useCallback((stepId: number) => {
    return canAccessStep(stepId) && (state.completedSteps.has(stepId) || state.visitedSteps.has(stepId));
  }, [canAccessStep, state.completedSteps, state.visitedSteps]);

  const isFirstStep = useCallback(() => state.currentStep === 1, [state.currentStep]);
  const isLastStep = useCallback(() => state.currentStep === wizardSteps.length, [state.currentStep]);

  const canProceed = useCallback(() => {
    return state.stepValidation[state.currentStep] || false;
  }, [state.stepValidation, state.currentStep]);

  const canGoBack = useCallback(() => state.currentStep > 1, [state.currentStep]);

  const completeWizard = useCallback(async () => {
    dispatch({ type: 'SET_NAVIGATING', payload: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'SET_NAVIGATING', payload: false });
  }, []);

  const exitWizard = useCallback(() => {
    // Save progress before exit
    saveProgress(true);
  }, [saveProgress]);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const saveProgressNow = useCallback(() => {
    return saveProgress(true);
  }, [saveProgress]);

  const value: WizardContextType = {
    state,
    steps: wizardSteps,
    currentStep: state.currentStep,
    isStepCompleted,
    canAccessStep,
    goToStep,
    nextStep,
    previousStep,
    completeStep,
    completedSteps: state.completedSteps,
    handleStepDataUpdate,
    updateStepValidation,
    getStepStatus,
    getProgressPercentage,
    canNavigateToStep,
    isFirstStep,
    isLastStep,
    canProceed,
    canGoBack,
    completeWizard,
    exitWizard,
    clearError,
    saveProgressNow,
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizardContext() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
} 