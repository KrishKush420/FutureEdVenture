export interface SchoolSetupDraft {
  adminAccess: AdminAccessData;
  schoolIdentity: SchoolIdentityData;
  reviewLaunch: ReviewLaunchData;
}

export interface AdminAccessData {
  operationalAdmins: OperationalAdmin[];
  adminRoles: AdminRole[];
}

export interface OperationalAdmin {
  id?: string;
  name: string;
  email: string;
  role: 'OPERATIONAL_ADMIN';
  status?: 'pending' | 'invited' | 'active';
}

export interface AdminRole {
  id?: string;
  name: string;
  permissions: string[];
  description?: string;
}

export interface SchoolIdentityData {
  name: string;
  logo?: File;
  logoUrl?: string;
  academicYear: {
    startDate: string;
    endDate: string;
  };
  timezone: string;
}

export interface ReviewLaunchData {
  isLaunchReady: boolean;
  missingSteps: number[];
  launchConfirmed: boolean;
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  category: string;
  path: string;
  isImplemented: boolean;
  dependencies?: number[];
}

export interface WizardState {
  currentStep: number;
  completedSteps: Set<number>;
  visitedSteps: Set<number>;
  stepValidation: Record<number, boolean>;
  stepData: Record<number, any>;
  setupData: SchoolSetupDraft;
  lastSaved: Date | null;
  isNavigating: boolean;
  isAutoSaving: boolean;
  lastError: string | null;
}

export interface StepConfig {
  id: number;
  title: string;
  description: string;
  Component: React.ComponentType<any>;
  validationSchema?: any;
  summaryPreview?: (data: any) => React.ReactNode;
}

export interface WizardContextType {
  state: WizardState;
  steps: WizardStep[];
  currentStep: number;
  isStepCompleted: (stepId: number) => boolean;
  canAccessStep: (stepId: number) => boolean;
  goToStep: (stepId: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeStep: (stepId: number) => void;
  completedSteps: Set<number>;
  handleStepDataUpdate: (stepId: number, data: Partial<SchoolSetupDraft>) => void;
  updateStepValidation: (stepId: number, isValid: boolean) => void;
  getStepStatus: (stepId: number) => 'completed' | 'current' | 'available' | 'locked';
  getProgressPercentage: () => number;
  canNavigateToStep: (stepId: number) => boolean;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  canProceed: () => boolean;
  canGoBack: () => boolean;
  completeWizard: () => Promise<void>;
  exitWizard: () => void;
  clearError: () => void;
  saveProgressNow: () => boolean;
} 