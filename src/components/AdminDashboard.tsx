import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiLogOut, FiSettings, FiFileText, FiTag } from 'react-icons/fi';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useBlog } from '../hooks/useBlog';
import BlogSubmission from './BlogSubmission';
import { Post } from '../config/pocketbase';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const { posts, categories, tags, loading, error, createPost, deletePost } = useBlog();
  const [showBlogSubmission, setShowBlogSubmission] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'categories' | 'tags'>('posts');

  if (!isAuthenticated) {
    return null; // This should be handled by a protected route wrapper
  }

  const handleCreatePost = async (postData: any) => {
    try {
      await createPost(postData);
      setShowBlogSubmission(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setShowBlogSubmission(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  const getStatusBadge = (published: boolean) => {
    return published ? (
      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
        Published
      </span>
    ) : (
      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
        Draft
      </span>
    );
  };

  const getFeaturedBadge = (featured: boolean) => {
    return featured ? (
      <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs">
        Featured
      </span>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-400">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800 rounded-lg p-6 border border-dark-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Posts</p>
                <p className="text-3xl font-bold text-white">{posts.length}</p>
              </div>
              <FiFileText className="w-8 h-8 text-primary-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800 rounded-lg p-6 border border-dark-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Categories</p>
                <p className="text-3xl font-bold text-white">{categories.length}</p>
              </div>
              <FiSettings className="w-8 h-8 text-primary-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-800 rounded-lg p-6 border border-dark-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tags</p>
                <p className="text-3xl font-bold text-white">{tags.length}</p>
              </div>
              <FiTag className="w-8 h-8 text-primary-400" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-dark-800 rounded-lg border border-dark-700 mb-6">
          <div className="flex border-b border-dark-700">
            {[
              { id: 'posts', label: 'Posts', icon: FiFileText },
              { id: 'categories', label: 'Categories', icon: FiSettings },
              { id: 'tags', label: 'Tags', icon: FiTag }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary-400 border-b-2 border-primary-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Blog Posts</h2>
                  <button
                    onClick={() => setShowBlogSubmission(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <FiPlus className="w-4 h-4" />
                    New Post
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading posts...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-red-400">{error}</p>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8">
                    <FiFileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No posts yet. Create your first post!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-dark-700 rounded-lg p-4 border border-dark-600"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                              {getStatusBadge(post.published)}
                              {getFeaturedBadge(post.featured_post)}
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Category: {post.category}</span>
                              <span>Read time: {post.read_time} min</span>
                              <span>Created: {new Date(post.created).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="p-2 text-gray-400 hover:text-primary-400 transition-colors duration-200"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'categories' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                      <h3 className="font-semibold text-white mb-2">{category.name}</h3>
                      {category.description && (
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tags' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Submission Modal */}
      {showBlogSubmission && (
        <BlogSubmission
          onSubmit={handleCreatePost}
          onCancel={() => {
            setShowBlogSubmission(false);
            setEditingPost(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard; 