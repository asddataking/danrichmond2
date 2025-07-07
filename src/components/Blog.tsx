import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import BlogPost from './BlogPost';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handlePostClick = (slug: string) => {
    const post = blogPosts.find(p => p.slug === slug);
    if (post) {
      // Add sample content for the blog post
      const fullPost = {
        ...post,
        content: `This is a detailed blog post about ${post.title}. 

The content would go here with multiple paragraphs exploring the topic in depth. This is where you'd put the full article content with proper formatting, examples, and insights.

In a real implementation, this content would be stored in a database or CMS and would include rich formatting, images, and other media elements.

The blog post would continue with more paragraphs, examples, and detailed analysis of the topic at hand.`
      };
      setSelectedPost(fullPost);
    }
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
  };

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'ai', name: 'AI & Tech' },
    { id: 'ufo', name: 'UFOs & Conspiracy' },
    { id: 'simulation', name: 'Simulation Theory' },
    { id: 'culture', name: 'Digital Culture' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The AI Revolution: Why We're All Becoming Cyborgs",
      excerpt: "Exploring how AI is reshaping our relationship with technology and what it means for the future of human consciousness.",
      category: 'ai',
      date: '2024-01-15',
      readTime: '5 min read',
      tags: ['AI', 'Technology', 'Future'],
      featured: true,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      slug: "ai-revolution-cyborgs"
    },
    {
      id: 2,
      title: "UFO Disclosure: What They're Not Telling Us",
      excerpt: "A deep dive into the latest developments in UFO disclosure and why the truth might be stranger than fiction.",
      category: 'ufo',
      date: '2024-01-10',
      readTime: '8 min read',
      tags: ['UFOs', 'Disclosure', 'Conspiracy'],
      featured: false,
      image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&h=400&fit=crop",
      slug: "ufo-disclosure-truth"
    },
    {
      id: 3,
      title: "Living in a Simulation: Evidence That's Hard to Ignore",
      excerpt: "From quantum physics to glitches in reality, examining the evidence that suggests we might be living in a computer simulation.",
      category: 'simulation',
      date: '2024-01-05',
      readTime: '12 min read',
      tags: ['Simulation Theory', 'Philosophy', 'Reality'],
      featured: false,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      slug: "simulation-theory-evidence"
    },
    {
      id: 4,
      title: "The Death of Authenticity in the Age of Social Media",
      excerpt: "How social media is changing what it means to be authentic and why we're all performing for invisible audiences.",
      category: 'culture',
      date: '2023-12-28',
      readTime: '6 min read',
      tags: ['Social Media', 'Authenticity', 'Culture'],
      featured: false,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      slug: "death-authenticity-social-media"
    },
    {
      id: 5,
      title: "ChatGPT and the Future of Creative Work",
      excerpt: "How AI is transforming creative industries and what it means for artists, writers, and content creators.",
      category: 'ai',
      date: '2023-12-20',
      readTime: '7 min read',
      tags: ['AI', 'Creativity', 'Content Creation'],
      featured: false,
      image: "https://images.unsplash.com/photo-1676299258276-5b1d7c4b0c0c?w=800&h=400&fit=crop",
      slug: "chatgpt-future-creative-work"
    },
    {
      id: 6,
      title: "Digital Nomadism: The New American Dream?",
      excerpt: "Why more people are choosing location independence and what it means for the future of work and society.",
      category: 'culture',
      date: '2023-12-15',
      readTime: '9 min read',
      tags: ['Digital Nomad', 'Work', 'Lifestyle'],
      featured: false,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      slug: "digital-nomadism-american-dream"
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // If a post is selected, show the blog post detail view
  if (selectedPost) {
    return <BlogPost post={selectedPost} onBack={handleBackToBlog} />;
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
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
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
        {filteredPosts.filter(post => post.featured).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {filteredPosts.filter(post => post.featured).map((post) => (
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
                <div className="mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">{post.title}</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4" />
                      {post.readTime}
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
          {filteredPosts.filter(post => !post.featured).map((post, index) => (
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
                <div className="mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-dark-600 text-gray-300 text-xs rounded-full">
                    {post.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiCalendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
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
                    {post.readTime}
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