import React from 'react';
import { motion } from 'framer-motion';
import { FiYoutube } from 'react-icons/fi';
import YouTubeIntegration from './YouTubeIntegration';

const VideoHub: React.FC = () => {
  return (
    <section id="youtube" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Latest Video
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My most recent YouTube upload. Subscribe for more content about AI, tech, 
            drone footage, and digital lifestyle.
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
        </motion.div>

        {/* YouTube Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <YouTubeIntegration />
        </motion.div>

        {/* Subscribe Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://youtube.com/@danrichmond"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiYoutube className="w-5 h-5" />
            Subscribe to Channel
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoHub; 