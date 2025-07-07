import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiPlay } from 'react-icons/fi';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Poopster",
      tagline: "Local dog waste pickup business with viral branding",
      description: "A local service business that went viral through clever marketing and community engagement. Built from the ground up with a focus on sustainability and customer experience.",
      image: "🐕",
      stats: {
        views: "50K+",
        customers: "200+",
        rating: "4.9/5"
      },
      tags: ["Local Business", "Viral Marketing", "Community"],
      link: "https://www.poopsterscoops.com",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "DankNDevour",
      tagline: "Food + cannabis content brand (200K+ views)",
      description: "A content brand exploring the intersection of food culture and cannabis lifestyle. Creating engaging, educational content that resonates with a growing audience.",
      image: "🍕",
      stats: {
        views: "200K+",
        followers: "15K+",
        videos: "50+"
      },
      tags: ["Content Creation", "Food", "Cannabis"],
      link: "https://www.dankndevour.com",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Farm Fetch",
      tagline: "Concept startup connecting people to local farm goods",
      description: "An innovative platform concept designed to bridge the gap between local farmers and consumers. Focused on sustainability, transparency, and community building.",
      image: "🌾",
      stats: {
        concept: "MVP Ready",
        research: "Complete",
        market: "Validated"
      },
      tags: ["Startup", "Agriculture", "Tech"],
      link: "https://www.shopfarmfetch.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Prime Aerial Imagery",
      tagline: "Professional drone photography for real estate, commercial & weddings",
      description: "A specialized drone photography company capturing stunning aerial perspectives for real estate listings, commercial projects, and special events. Delivering high-quality imagery that elevates marketing and memories.",
      image: "🚁",
      stats: {
        projects: "100+",
        clients: "50+",
        rating: "5.0/5"
      },
      tags: ["Drone Photography", "Real Estate", "Commercial"],
      link: "https://www.primeaerialimagery.com",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Projects & Brands
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Public-facing ventures and experimental projects that showcase my approach to building, 
            branding, and growing businesses.
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-dark-700 rounded-2xl overflow-hidden border border-dark-600 hover:border-primary-500 transition-all duration-300 hover:transform hover:scale-105">
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${project.color} relative`}>
                  <div className="text-4xl mb-4">{project.image}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {project.tagline}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-primary-400">{value}</div>
                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-dark-600 text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
                    >
                      <FiPlay className="w-4 h-4" />
                      View Project
                    </a>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white text-sm font-semibold rounded-lg transition-colors duration-200"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-dark-700 to-dark-800 p-8 rounded-2xl border border-dark-600">
            <h3 className="text-2xl font-semibold text-white mb-4">
              More Projects in Development
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Always experimenting with new ideas and technologies. 
              From automation tools to content platforms, I'm constantly building and iterating.
            </p>
            <button className="px-8 py-3 border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
              See All Projects
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 