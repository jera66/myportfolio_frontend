/**
 * ProjectModal Component
 * 
 * A modal dialog that displays detailed information about a selected project.
 * Features neumorphic design with smooth animations and responsive layout.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.project - The project data to display
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback function to close the modal
 */

import React, { useEffect } from 'react';
import { X, ExternalLink, Code, Layers, Sparkles } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  /**
   * Handle escape key press to close modal
   * Also prevents body scroll when modal is open
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if modal is closed or no project selected
  if (!isOpen || !project) return null;

  return (
    // Backdrop overlay with fade animation
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      style={{ backgroundColor: 'rgba(10, 15, 26, 0.85)' }}
      onClick={onClose}
      data-testid="project-modal-backdrop"
    >
      {/* Modal container - stops click propagation */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl animate-modal-enter"
        style={{
          backgroundColor: 'var(--bg-card)',
          boxShadow: '8px 8px 32px rgba(10, 15, 26, 0.6), -8px -8px 32px var(--shadow-color-2)'
        }}
        onClick={(e) => e.stopPropagation()}
        data-testid="project-modal-content"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'var(--bg-section)',
            color: 'var(--text-primary)',
            boxShadow: '2px 2px 6px var(--shadow-color-1), -2px -2px 6px var(--shadow-color-2)'
          }}
          data-testid="project-modal-close"
        >
          <X size={24} />
        </button>

        {/* Hero image section */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent"></div>
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#8b2635] text-white text-sm font-bold px-4 py-2 rounded-full">
              <Sparkles size={16} />
              Featured Project
            </div>
          )}

          {/* Project title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {project.name}
            </h2>
            <div className="flex items-center gap-2 text-[#e8d5c4]/80">
              <Layers size={16} />
              <span className="text-sm">{project.category}</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 md:p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span className="w-8 h-0.5 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }}></span>
              About This Project
            </h3>
            <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>
          </div>

          {/* Technologies section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Code size={20} style={{ color: 'var(--text-secondary)' }} />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--bg-section)',
                    color: 'var(--text-primary)',
                    boxShadow: 'inset 1px 1px 3px var(--shadow-color-1), inset -1px -1px 3px var(--shadow-color-2)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key features - generated from description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <Sparkles size={20} style={{ color: 'var(--text-secondary)' }} />
              Key Highlights
            </h3>
            <div
              className="rounded-xl p-5"
              style={{
                backgroundColor: 'var(--bg-section)',
                boxShadow: 'inset 2px 2px 6px var(--shadow-color-1), inset -2px -2px 6px var(--shadow-color-2)'
              }}
            >
              <ul className="space-y-3">
                {getProjectHighlights(project).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3" style={{ color: 'var(--text-muted)' }}>
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--text-secondary)' }}></span>
                    <span className="text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-center">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:gap-4"
              style={{
                backgroundColor: '#8b2635',
                color: '#ffffff',
                boxShadow: '3px 3px 10px rgba(10, 15, 26, 0.3), -3px -3px 10px rgba(155, 54, 69, 0.15)'
              }}
              data-testid="project-modal-view-link"
            >
              View Live Project
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Modal animation styles */}
      <style>{`
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

/**
 * Helper function to extract key highlights from project description
 * @param {Object} project - The project object
 * @returns {string[]} Array of highlight strings
 */
const getProjectHighlights = (project) => {
  const highlights = {
    1: [ // Agency Studio
      "Custom WordPress theme built from scratch",
      "Reusable template components inspired by React",
      "Focus on performance, accessibility, and SEO",
      "No page builders - pure custom development"
    ],
    2: [ // Dayding
      "Revolutionary Christian dating platform",
      "Connects believers through shared faith and values",
      "Elegant UI with technological precision",
      "Built on biblical principles and modern engineering"
    ],
    3: [ // Rosathel PMS
      "Personalized guest dashboards and reward points",
      "Digital room keys and seamless check-in",
      "Full MERN stack implementation",
      "Premium user experience with elegant UI"
    ],
    4: [ // Software Developer Portfolio
        "Unique neumorphic design with navy and burgundy theme",
        "Fully responsive and production-ready",
        "Showcases professional experience, projects, and skills",
        "Emphasis on beautiful UI/UX design"
    ],
     5: [ // VLOSA - Virtual Life Operating System Agent
        "Comprehensive personal automation platform",
        "Manages digital life intelligently with AI",
        "Combines inbox management, task tracking, and automation",
        "Available on both web and mobile for optimal productivity"
    ]
  };

  return highlights[project.id] || [
    "Modern development practices",
    "Responsive and accessible design",
    "Clean, maintainable code"
  ];
};

export default ProjectModal;
