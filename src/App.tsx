import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import Hero from './components/Hero';
import About from './components/About';

import Projects from './components/Projects';
import Blog from './components/Blog';
import VideoHub from './components/VideoHub';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-dark-900 text-white min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-dark-800/90 backdrop-blur-sm z-50 border-b border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <span className="text-xl font-bold text-primary-400">Dan Richmond</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {['home', 'about', 'projects', 'blog', 'youtube', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 capitalize"
                  >
                    {item}
                  </button>
                ))}
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
                >
                  {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
                >
                  {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
                >
                  {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-dark-700"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {['home', 'about', 'projects', 'blog', 'youtube', 'contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className="block w-full text-left px-3 py-2 text-gray-300 hover:text-primary-400 hover:bg-dark-700 rounded-md transition-colors duration-200 capitalize"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          <Hero />
          <About />
          <Projects />
          <Blog />
          <VideoHub />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App; 