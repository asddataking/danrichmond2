import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import { Post } from '../config/pocketbase';

interface BlogPostProps {
  post: Post;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-dark-800/90 backdrop-blur-sm z-50 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-colors duration-200"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back to Blog
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {post.featured_image && (
              <img
                src={`http://127.0.0.1:8090/api/files/posts/${post.id}/${post.featured_image}`}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl"
              />
            )}
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-primary-500 text-white text-sm rounded-full">
                {post.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FiCalendar className="w-4 h-4" />
                {new Date(post.created).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FiClock className="w-4 h-4" />
                {post.read_time} min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-dark-700 text-gray-300 text-sm rounded-full flex items-center gap-2"
                >
                  <FiTag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="text-gray-300 leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Back to Blog CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-dark-700"
          >
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to All Posts
            </button>
          </motion.div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost; 