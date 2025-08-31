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
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 text-white min-h-screen">
        {/* Dark Mode Toggle */}
        <motion.div 
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-md mx-auto px-6 py-8 sm:py-12">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
              className="mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full mb-6 shadow-2xl overflow-hidden border-4 border-purple-500/20"
            >
              <motion.img 
                src="/profiledan.png" 
                alt="Dan Richmond" 
                className="w-full h-full object-cover"
                animate={{ 
                  y: [0, -3, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>

            {/* Name and Bio */}
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Dan Richmond
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-gray-300 mb-2 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Building bold tools and stories at the intersection of AI, video, and tech
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Technologist, creator, and problem-solver
            </motion.p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="space-y-3 mb-8"
          >
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full max-w-sm mx-auto p-4 rounded-xl ${link.color} text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 backdrop-blur-sm text-center`}
                whileHover={{ 
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 1 + index * 0.1, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <link.icon className="w-5 h-5" />
                </motion.div>
                <span className="font-medium">{link.name}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* YouTube Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mb-6"
          >
            <motion.h2 
              className="text-xl sm:text-2xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Latest Video
            </motion.h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <YouTubeIntegration />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-center text-gray-400 text-sm"
          >
            <p>© 2024 Dan Richmond. All rights reserved.</p>
          </motion.div>
        </div>

        {/* Background Animation */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-800/15 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 