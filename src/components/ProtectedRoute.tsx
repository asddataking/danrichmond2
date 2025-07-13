import React from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900">
        <AdminLogin
          onLoginSuccess={() => {
            // Authentication successful, component will re-render
          }}
          onCancel={() => {
            // Handle cancel - could redirect to home page
            window.location.href = '/';
          }}
        />
      </div>
    );
  }

  // If authenticated, show the admin dashboard or children
  return <>{children || <AdminDashboard />}</>;
};

export default ProtectedRoute; 