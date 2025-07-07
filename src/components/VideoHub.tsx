import React from 'react';
import { motion } from 'framer-motion';
import { FiYoutube, FiPlay } from 'react-icons/fi';

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

        {/* YouTube Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* YouTube Video Embed */}
            <div className="aspect-video bg-dark-700 rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/YOUR_LATEST_VIDEO_ID?rel=0&modestbranding=1"
                title="Dan Richmond Latest Video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Overlay with play button for visual appeal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FiPlay className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </div>

          {/* Video Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <FiYoutube className="w-6 h-6 text-red-500" />
              <span className="text-gray-400 text-sm">YouTube</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Latest Upload from Dan Richmond
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Subscribe to my YouTube channel for more content about AI automation, 
              drone videography, tech reviews, and digital lifestyle.
            </p>
            
            {/* Subscribe Button */}
            <motion.a
              href="https://youtube.com/@danrichmond"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiYoutube className="w-5 h-5" />
              Subscribe to Channel
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoHub; 