import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { pb, isAdminAuthenticated, logoutAdmin } from '../config/pocketbase';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount and when auth store changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const authenticated = isAdminAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    // Check initial auth status
    checkAuthStatus();

    // Listen for auth store changes
    const unsubscribe = pb.authStore.onChange(() => {
      checkAuthStatus();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const authData = await pb.admins.authWithPassword(email, password);
      setIsAuthenticated(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: AdminAuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    error,
    clearError,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}; 