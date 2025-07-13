import React from 'react';
import { FiX } from 'react-icons/fi';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onClose }) => {
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
      <div className="min-h-screen bg-dark-900 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
        <AdminLogin
          onLoginSuccess={() => {
            // Authentication successful, component will re-render
          }}
          onCancel={() => {
            // Handle cancel - could redirect to home page
            if (onClose) {
              onClose();
            } else {
              window.location.href = '/';
            }
          }}
        />
      </div>
    );
  }

  // If authenticated, show the admin dashboard or children
  return (
    <div className="relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
      {children || <AdminDashboard />}
    </div>
  );
};

export default ProtectedRoute; 