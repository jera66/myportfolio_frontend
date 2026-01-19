import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { personalInfo } from '../mockData';
import ProfilePicture from './ProfilePicture';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, var(--bg-hero-from), var(--bg-hero-via), var(--bg-hero-to))`
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#8b2635]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1e3a5f]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Picture with rotating ring */}
          <ProfilePicture />

          {/* Main content */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in" style={{ color: 'var(--text-primary)' }}>
              Hi, I'm <span style={{ color: 'var(--text-primary)' }}>{personalInfo.name.split(' ')[0]}</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in-delay" style={{ color: 'var(--text-secondary)' }}>
              {personalInfo.title}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fade-in-delay-2" style={{ color: 'var(--text-muted)' }}>
              {personalInfo.bio}
            </p>
          </div>

          {/* CTA Buttons with neumorphic style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-3">
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: '#1e3a5f',
                color: '#e8d5c4',
                boxShadow: '3px 3px 10px #0a0f1a, -3px -3px 10px #2e4a6f'
              }}
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 rounded-xl text-white transition-all duration-300"
              style={{
                backgroundColor: '#8b2635',
                boxShadow: '2px 2px 8px rgba(10, 15, 26, 0.3), -2px -2px 8px rgba(155, 54, 69, 0.1)'
              }}
            >
              Get In Touch
            </button>
            <a
              href="/resume"
              className="group px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-300"
              style={{
                backgroundColor: '#1e3a5f',
                color: '#e8d5c4',
                boxShadow: '3px 3px 10px #0a0f1a, -3px -3px 10px #2e4a6f'
              }}
            >
              <Download size={20} />
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#e8d5c4]/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-[#8b2635] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
