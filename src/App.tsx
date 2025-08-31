import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiYoutube, FiGithub, FiLinkedin, FiInstagram, FiMail, FiExternalLink } from 'react-icons/fi';
import YouTubeIntegration from './components/YouTubeIntegration';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const links = [
    {
      name: "YouTube Channel",
      url: "https://youtube.com/@danrichmond",
      icon: FiYoutube,
      color: "bg-red-600 hover:bg-red-700"
    },
    {
      name: "GitHub",
      url: "https://github.com/danrichmond2",
      icon: FiGithub,
      color: "bg-gray-800 hover:bg-gray-900"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/danrichmond",
      icon: FiLinkedin,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/danrichmond",
      icon: FiInstagram,
      color: "bg-pink-600 hover:bg-pink-700"
    },
    {
      name: "Email",
      url: "mailto:dan@danrichmond.com",
      icon: FiMail,
      color: "bg-green-600 hover:bg-green-700"
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
        {/* Dark Mode Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-32 h-32 rounded-full mb-6 shadow-2xl overflow-hidden"
            >
              <motion.img 
                src="/profile.svg" 
                alt="Dan Richmond" 
                className="w-full h-full object-cover"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Name and Bio */}
            <h1 className="text-4xl font-bold mb-4">Dan Richmond</h1>
            <p className="text-lg text-gray-300 mb-2">
              Building bold tools and stories at the intersection of AI, video, and tech
            </p>
            <p className="text-gray-400">
              Technologist, creator, and problem-solver
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-4 mb-12"
          >
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full p-4 rounded-xl ${link.color} text-white font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-between`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </div>
                <FiExternalLink className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* YouTube Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Latest Video</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <YouTubeIntegration />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center text-gray-400 text-sm"
          >
            <p>© 2024 Dan Richmond. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App; 