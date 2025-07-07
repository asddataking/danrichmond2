import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiYoutube, FiInstagram, FiArrowUp } from 'react-icons/fi';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Dan Richmond</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Technologist, creator, and problem-solver exploring the future through automation, 
              storytelling, and flight. Building bold tools and stories at the intersection of AI, 
              video, and tech.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FiGithub, href: "#", label: "GitHub" },
                { icon: FiLinkedin, href: "#", label: "LinkedIn" },
                { icon: FiYoutube, href: "#", label: "YouTube" },
                { icon: FiInstagram, href: "#", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 rounded-full bg-dark-700 hover:bg-primary-500 transition-all duration-200 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Blog", href: "#blog" },
                { name: "YouTube", href: "#youtube" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:dan@danrichmond.com"
                className="flex items-center gap-3 text-gray-300 hover:text-primary-400 transition-colors duration-200"
              >
                <FiMail className="w-5 h-5" />
                <span>dan@danrichmond.com</span>
              </a>
              <p className="text-gray-300">
                Available for freelance projects, collaborations, and speaking opportunities.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-dark-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Dan Richmond. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <button
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </button>
              <button
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </button>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-dark-700 hover:bg-primary-500 transition-all duration-200 transform hover:scale-110"
                aria-label="Scroll to top"
              >
                <FiArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 