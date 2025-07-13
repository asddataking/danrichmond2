import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight, FiPlus, FiLoader } from 'react-icons/fi';
import BlogPost from './BlogPost';
import BlogSubmission from './BlogSubmission';
import { useBlog } from '../hooks/useBlog';
import { Post } from '../config/pocketbase';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showSubmission, setShowSubmission] = useState(false);
  
  const { 
    posts, 
    categories, 
    loading, 
    error, 
    createPost, 
    getPostImageUrl 
  } = useBlog();

  const handlePostClick = (slug: string) => {
    const post = posts.find(p => p.slug === slug);
    if (post) {
      setSelectedPost(post);
    }
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
  };

  const handleSubmitPost = async (newPost: any) => {
    const createdPost = await createPost(newPost);
    if (createdPost) {
      setShowSubmission(false);
    }
  };

  // Create category options including "All Posts"
  const categoryOptions = [
    { id: 'all', name: 'All Posts' },
    ...categories.map(cat => ({ id: cat.name, name: cat.name }))
  ];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Loading state
  if (loading) {
    return (
      <section id="blog" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3 text-white">
              <FiLoader className="w-6 h-6 animate-spin" />
              <span>Loading blog posts...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="blog" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-400 mb-4">Error loading blog posts</div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // If a post is selected, show the blog post detail view
  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={handleBackToBlog} />;
  }

  // If submission form is open, show it
  if (showSubmission) {
    return <BlogSubmission onSubmit={handleSubmitPost} onCancel={() => setShowSubmission(false)} />;
  }

  return (
    <section id="blog" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            404: Real Love Not Found
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Personal thoughts, opinions, and cultural takes on AI, UFOs, simulation theory, 
            tech trends, and digital life. Casual, reflective, and sometimes controversial.
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
          
          {/* Write New Post Button */}
          <motion.button
            onClick={() => setShowSubmission(true)}
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus className="w-5 h-5" />
            Write New Post
          </motion.button>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.filter(post => post.featured_post).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {filteredPosts.filter(post => post.featured_post).map((post) => (
              <div 
                key={post.id} 
                className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 p-8 rounded-2xl border border-primary-500/20 cursor-pointer hover:border-primary-400 transition-all duration-300"
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full">Featured</span>
                  <span className="text-gray-400 text-sm">{post.category.toUpperCase()}</span>
                </div>
                
                {/* Featured Post Image */}
                {post.featured_image && (
                  <div className="mb-6">
                    <img 
                      src={getPostImageUrl(post) || ''} 
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <h3 className="text-3xl font-bold text-white mb-4">{post.title}</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      {new Date(post.created).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4" />
                      {post.read_time} min read
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-200">
                    Read More <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => !post.featured_post).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div 
                className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-primary-500 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                onClick={() => handlePostClick(post.slug)}
              >
                {/* Blog Post Image */}
                {post.featured_image && (
                  <div className="mb-4">
                    <img 
                      src={getPostImageUrl(post) || ''} 
                      alt={post.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-dark-600 text-gray-300 text-xs rounded-full">
                    {post.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiCalendar className="w-4 h-4" />
                    {new Date(post.created).toLocaleDateString()}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-200">
                  {post.title}
                </h4>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiClock className="w-4 h-4" />
                    {post.read_time} min read
                  </div>
                  <button className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-200">
                    Read <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-dark-700 to-dark-800 p-8 rounded-2xl border border-dark-600">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get notified when I publish new thoughts on AI, UFOs, simulation theory, 
              and the future of digital culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-600 border border-dark-500 text-white rounded-lg focus:outline-none focus:border-primary-500"
              />
              <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog; 