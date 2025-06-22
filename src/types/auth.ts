export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'faculty' | 'admin';
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: 'student' | 'faculty' | 'admin';
}