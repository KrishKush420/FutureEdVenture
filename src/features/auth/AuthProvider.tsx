import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { User, AuthState, LoginCredentials, SignupData } from '@/types/auth';

// Mock Cognito configuration - replace with actual values
const poolData = {
  UserPoolId: 'us-east-1_example',
  ClientId: 'example-client-id'
};

const userPool = new CognitoUserPool(poolData);

// Test users for development
const TEST_USERS = {
  'student@test.com': {
    password: 'TestPass123!',
    user: {
      id: 'student-001',
      email: 'student@test.com',
      firstName: 'Alice',
      lastName: 'Johnson',
      role: 'student' as const,
      createdAt: '2024-01-15T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    }
  },
  'faculty@test.com': {
    password: 'TestPass123!',
    user: {
      id: 'faculty-001',
      email: 'faculty@test.com',
      firstName: 'Dr. Sarah',
      lastName: 'Wilson',
      role: 'faculty' as const,
      createdAt: '2023-08-20T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    }
  },
  'admin@test.com': {
    password: 'TestPass123!',
    user: {
      id: 'admin-001',
      email: 'admin@test.com',
      firstName: 'Michael',
      lastName: 'Chen',
      role: 'admin' as const,
      createdAt: '2023-01-01T00:00:00Z',
      lastLoginAt: new Date().toISOString()
    }
  }
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_LOADING' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getCurrentUser = async (): Promise<User | null> => {
    // Check for stored test user session
    const storedUser = localStorage.getItem('testUser');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem('testUser');
      }
    }

    return new Promise((resolve) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (!cognitoUser) {
        resolve(null);
        return;
      }

      cognitoUser.getSession((err: any, session: any) => {
        if (err || !session?.isValid()) {
          resolve(null);
          return;
        }

        cognitoUser.getUserAttributes((err, attributes) => {
          if (err || !attributes) {
            resolve(null);
            return;
          }

          const attributeMap = attributes.reduce((acc, attr) => {
            acc[attr.getName()] = attr.getValue();
            return acc;
          }, {} as Record<string, string>);

          const user: User = {
            id: cognitoUser.getUsername(),
            email: attributeMap.email || '',
            firstName: attributeMap.given_name || '',
            lastName: attributeMap.family_name || '',
            role: (attributeMap['custom:role'] as any) || 'student',
            avatar: attributeMap.picture,
            createdAt: attributeMap.created_at || new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          };

          resolve(user);
        });
      });
    });
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_LOADING' });

    try {
      // Check if it's a test user
      const testUser = TEST_USERS[credentials.email as keyof typeof TEST_USERS];
      if (testUser && testUser.password === credentials.password) {
        // Store test user session
        localStorage.setItem('testUser', JSON.stringify(testUser.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: testUser.user });
        return;
      }

      // Fall back to Cognito authentication
      const cognitoUser = new CognitoUser({
        Username: credentials.email,
        Pool: userPool
      });

      const authDetails = new AuthenticationDetails({
        Username: credentials.email,
        Password: credentials.password
      });

      return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
          onSuccess: async () => {
            const user = await getCurrentUser();
            if (user) {
              dispatch({ type: 'AUTH_SUCCESS', payload: user });
              resolve();
            } else {
              reject(new Error('Failed to get user details'));
            }
          },
          onFailure: (err) => {
            dispatch({ type: 'AUTH_ERROR', payload: err.message });
            reject(err);
          }
        });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    dispatch({ type: 'AUTH_LOADING' });

    try {
      const attributes = [
        new CognitoUserAttribute({ Name: 'email', Value: data.email }),
        new CognitoUserAttribute({ Name: 'given_name', Value: data.firstName }),
        new CognitoUserAttribute({ Name: 'family_name', Value: data.lastName }),
        new CognitoUserAttribute({ Name: 'custom:role', Value: data.role })
      ];

      return new Promise((resolve, reject) => {
        userPool.signUp(data.email, data.password, attributes, [], (err, result) => {
          if (err) {
            dispatch({ type: 'AUTH_ERROR', payload: err.message });
            reject(err);
            return;
          }

          // Auto-confirm for demo purposes
          resolve();
        });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  };

  const logout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    // Clear test user session
    localStorage.removeItem('testUser');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    getCurrentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};