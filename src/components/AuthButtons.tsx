import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiUser, FiLogOut, FiWifi, FiWifiOff, FiAlertCircle } from 'react-icons/fi';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { testPocketBaseConnection } from '../config/pocketbase';

interface AuthButtonsProps {
  onShowAdmin: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onShowAdmin }) => {
  const { isAuthenticated, logout } = useAdminAuth();
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [showStatus, setShowStatus] = useState(false);

  // Check connection status on mount and periodically
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await testPocketBaseConnection();
        setConnectionStatus(result.success ? 'connected' : 'disconnected');
      } catch (error) {
        setConnectionStatus('disconnected');
      }
    };

    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAdminClick = () => {
    if (connectionStatus === 'disconnected') {
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
      return;
    }
    onShowAdmin();
  };

  const handleLogout = () => {
    logout();
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <FiWifi className="w-3 h-3 text-green-400" />;
      case 'disconnected':
        return <FiWifiOff className="w-3 h-3 text-red-400" />;
      default:
        return <div className="w-3 h-3 border border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />;
    }
  };

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'border-green-500/30 bg-green-500/10';
      case 'disconnected':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return 'border-yellow-500/30 bg-yellow-500/10';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Connection Status Indicator */}
      <div className="relative">
        <button
          onClick={() => setShowStatus(!showStatus)}
          className={`p-2 rounded-lg border ${getConnectionColor()} transition-all duration-200 hover:scale-105`}
          title={`Connection: ${connectionStatus}`}
        >
          {getConnectionIcon()}
        </button>

        {/* Status Tooltip */}
        {showStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-2 p-3 bg-dark-700 border border-dark-600 rounded-lg shadow-lg z-50 min-w-[200px]"
          >
            <div className="flex items-center gap-2 mb-2">
              {getConnectionIcon()}
              <span className="text-sm font-medium text-white">
                {connectionStatus === 'connected' ? 'Connected' : 
                 connectionStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {connectionStatus === 'connected' 
                ? 'PocketBase server is accessible'
                : connectionStatus === 'disconnected'
                ? 'Cannot connect to PocketBase server'
                : 'Checking server connection...'}
            </p>
            {connectionStatus === 'disconnected' && (
              <div className="mt-2 text-xs text-red-400">
                <p>Please ensure PocketBase is running at:</p>
                <p className="font-mono">http://127.0.0.1:8090</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Admin/User Button */}
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleAdminClick}
            disabled={connectionStatus === 'disconnected'}
            className="flex items-center gap-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
            title={connectionStatus === 'disconnected' ? 'Cannot connect to server' : 'Admin Dashboard'}
          >
            <FiUser className="w-4 h-4" />
            Admin
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition-colors duration-200 text-sm"
            title="Logout"
          >
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdminClick}
          disabled={connectionStatus === 'disconnected'}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 text-sm ${
            connectionStatus === 'disconnected'
              ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
          }`}
          title={connectionStatus === 'disconnected' ? 'Cannot connect to server' : 'Admin Login'}
        >
          <FiSettings className="w-4 h-4" />
          Admin
        </button>
      )}

      {/* Connection Warning */}
      {connectionStatus === 'disconnected' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1 text-xs text-red-400"
        >
          <FiAlertCircle className="w-3 h-3" />
          <span>Server Offline</span>
        </motion.div>
      )}
    </div>
  );
};

export default AuthButtons; 