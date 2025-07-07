import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCode, FiCamera, FiZap } from 'react-icons/fi';

const About: React.FC = () => {
  const skills = [
    { icon: FiCode, title: "AI & Automation", description: "Building intelligent systems and workflows" },
    { icon: FiCamera, title: "Video Editing", description: "Creating compelling visual stories" },
    { icon: FiZap, title: "Drone Technology", description: "Capturing perspectives from above" },
    { icon: FiAward, title: "Military Background", description: "Discipline and strategic thinking" },
  ];

  return (
    <section id="about" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              From Military Service to Creative Technology
            </h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                My journey began in the military, where I learned the value of discipline, 
                strategic thinking, and hands-on problem-solving. That foundation became the 
                bedrock for everything that followed.
              </p>
              
              <p>
                After my service, I discovered a deep curiosity about technology and its 
                potential to solve real-world problems. I became self-taught in modern tools 
                like AI agents, automation systems, and content platforms.
              </p>
              
              <p>
                Today, I blend that military precision with creative innovation. I do video editing 
                and content creation, work with AI automation tools, and capture aerial footage with drones. 
                Every project is an opportunity to build something that makes noise and 
                moves the needle.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">200K+</div>
                <div className="text-sm text-gray-400">Content Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">50+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">3</div>
                <div className="text-sm text-gray-400">Active Brands</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-700 p-6 rounded-lg border border-dark-600 hover:border-primary-500 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-500/20 rounded-lg group-hover:bg-primary-500 transition-colors duration-300">
                    <skill.icon className="w-6 h-6 text-primary-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 p-8 rounded-2xl border border-primary-500/20">
            <h3 className="text-2xl font-semibold text-white mb-4">
              My Philosophy
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              "I believe in the power of combining old-school grit with cutting-edge technology. 
              Every tool, every platform, every piece of content should serve a purpose and tell a story. 
              Whether it's automating a business process or capturing a moment from the sky, 
              the goal is always to create something that matters."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 