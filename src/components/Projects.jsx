import React, { useState } from 'react';
import { ExternalLink, Filter } from 'lucide-react';
import { projects } from '../mockData';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'React', 'WordPress', 'React Native', 'PHP'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20" style={{ background: `linear-gradient(to bottom, var(--bg-section), var(--bg-section-alt))` }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Featured Projects
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              A showcase of my recent work, featuring custom web applications built with modern technologies.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <Filter size={20} />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300`}
                style={{
                  backgroundColor: activeFilter === category ? '#8b2635' : 'var(--bg-card)',
                  color: activeFilter === category ? '#ffffff' : 'var(--text-primary)',
                  boxShadow: activeFilter === category 
                    ? '2px 2px 8px rgba(10, 15, 26, 0.4), -2px -2px 8px rgba(155, 54, 69, 0.2)'
                    : '2px 2px 8px var(--shadow-color-1), -2px -2px 8px var(--shadow-color-2)'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: '3px 3px 12px var(--shadow-color-1), -3px -3px 12px var(--shadow-color-2)'
                }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] to-transparent opacity-60"></div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-[#8b2635] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#8b2635] transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {project.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: 'var(--bg-section)',
                          color: 'var(--text-primary)',
                          boxShadow: 'inset 0.5px 0.5px 2px var(--shadow-color-1), inset -0.5px -0.5px 2px var(--shadow-color-2)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 font-medium text-sm group-hover:gap-3 transition-all"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    View Project
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#e8d5c4]/50 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
