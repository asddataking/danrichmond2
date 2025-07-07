import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiVideo, FiCamera, FiArrowRight } from 'react-icons/fi';

const Services: React.FC = () => {
  const services = [
    {
      icon: FiZap,
      title: "AI-Powered Marketing Tech",
      description: "CRM setup, funnel automation, and content workflows that scale your business intelligently.",
      features: [
        "Custom CRM Integration",
        "Automated Lead Nurturing",
        "Content Workflow Optimization",
        "Analytics & Reporting"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiVideo,
      title: "Video Editing & Content Strategy",
      description: "Branded shorts, reels, YouTube content, and viral formats that capture attention and drive engagement.",
      features: [
        "Short-form Video Creation",
        "YouTube Strategy & Optimization",
        "Brand Storytelling",
        "Viral Content Formats"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FiCamera,
      title: "Drone Videography (Prime Aerial Imagery)",
      description: "Real estate, events, and storytelling from the sky. Professional aerial cinematography that elevates your brand.",
      features: [
        "Real Estate Photography",
        "Event Coverage",
        "Commercial Cinematography",
        "Aerial Storytelling"
      ],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three core areas where I blend technology, creativity, and strategic thinking to deliver results.
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-dark-800 rounded-2xl p-8 h-full border border-dark-700 hover:border-primary-500 transition-all duration-300 hover:transform hover:scale-105">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="flex items-center text-primary-400 hover:text-primary-300 transition-colors duration-200 group-hover:translate-x-1">
                  <span className="mr-2">Learn More</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 p-8 rounded-2xl border border-primary-500/20">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether you need AI automation, compelling video content, or stunning aerial footage, 
              I'm here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
                Start a Project
              </button>
              <button className="px-8 py-3 border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
                View Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 