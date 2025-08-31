import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff, FiLogIn, FiAlertCircle, FiCheckCircle, FiWifi, FiWifiOff } from 'react-icons/fi';
import { authenticateAdmin, testPocketBaseConnection } from '../config/pocketbase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  // Test connection on component mount
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
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authenticateAdmin(formData.email, formData.password);
      onLoginSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const retryConnection = async () => {
    setConnectionStatus('checking');
    try {
      const result = await testPocketBaseConnection();
      setConnectionStatus(result.success ? 'connected' : 'disconnected');
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-dark-800 rounded-2xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-400">Enter your admin credentials to continue</p>
        </div>

        {/* Connection Status */}
        <div className="mb-6">
          <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
            connectionStatus === 'connected' 
              ? 'bg-green-500/20 border border-green-500/30 text-green-300'
              : connectionStatus === 'disconnected'
              ? 'bg-red-500/20 border border-red-500/30 text-red-300'
              : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300'
          }`}>
            {connectionStatus === 'checking' && (
              <>
                <div className="w-4 h-4 border-2 border-yellow-300/30 border-t-yellow-300 rounded-full animate-spin" />
                <span>Checking connection...</span>
              </>
            )}
            {connectionStatus === 'connected' && (
              <>
                <FiWifi className="w-4 h-4" />
                <span>Connected to PocketBase</span>
              </>
            )}
            {connectionStatus === 'disconnected' && (
              <>
                <FiWifiOff className="w-4 h-4" />
                <span>Cannot connect to PocketBase</span>
                <button
                  onClick={retryConnection}
                  className="ml-2 text-xs underline hover:no-underline"
                >
                  Retry
                </button>
              </>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                placeholder="admin@example.com"
                required
                disabled={connectionStatus === 'disconnected'}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                placeholder="Enter your password"
                required
                disabled={connectionStatus === 'disconnected'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                disabled={connectionStatus === 'disconnected'}
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-300 text-sm font-medium mb-2">Authentication Error</p>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || connectionStatus === 'disconnected'}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FiLogIn className="w-5 h-5" />
              )}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-gray-300 font-semibold rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Need help? Check the admin panel at{' '}
              <a 
                href="http://127.0.0.1:8090/_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                http://127.0.0.1:8090/_/
              </a>
            </p>
          </div>

          {connectionStatus === 'disconnected' && (
            <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-yellow-300 text-sm font-medium mb-2">Connection Issue</p>
                  <p className="text-yellow-400 text-sm">
                    PocketBase server is not accessible. Please ensure:
                  </p>
                  <ul className="text-yellow-400 text-sm mt-2 space-y-1">
                    <li>• PocketBase is running at http://127.0.0.1:8090</li>
                    <li>• No firewall is blocking the connection</li>
                    <li>• The server is not already in use by another process</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin; 