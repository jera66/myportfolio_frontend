/**
 * Hero Component
 * 
 * The main landing section of the portfolio - first thing visitors see.
 * Features animated profile picture, headline, bio, and call-to-action buttons.
 * 
 * @component
 * 
 * VISUAL ELEMENTS:
 * - Gradient background (navy to cream in dark mode, cream to white in light)
 * - Animated background blobs (subtle pulsing circles)
 * - Profile picture with rotating ring animation
 * - Animated text elements (staggered fade-in)
 * - Three CTA buttons with soft neumorphic shadows
 * - Scroll indicator at bottom
 * 
 * ANIMATIONS:
 * - Background blobs: animate-pulse with delay
 * - Text: animate-fade-in, animate-fade-in-delay, animate-fade-in-delay-2
 * - Buttons: animate-fade-in-delay-3
 * - Scroll indicator: animate-bounce
 */

import React, { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { personalInfo } from '../mockData';
import ProfilePicture from './ProfilePicture';

// Rotating titles for the typewriter effect — sourced from mockData so they
// can be edited without touching this component.
const TITLES = personalInfo.titles && personalInfo.titles.length > 0
  ? personalInfo.titles
  : [personalInfo.title];

const useTypewriter = (words, typeSpeed = 90, deleteSpeed = 50, hold = 1600) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, hold]);

  return text;
};

const Hero = () => {
  // =========================================
  // HELPER FUNCTIONS
  // =========================================
  
  /**
   * scrollToSection - Smooth scrolls to a page section by ID
   * @param {string} id - The DOM id of the target section
   */
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const typed = useTypewriter(TITLES);

  // =========================================
  // RENDER
  // =========================================
  
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-12"
      style={{
        // Dynamic gradient using CSS variables (changes with theme)
        background: `linear-gradient(to bottom right, var(--bg-hero-from), var(--bg-hero-via), var(--bg-hero-to))`
      }}
    >
      {/* ============================================
          ANIMATED BACKGROUND ELEMENTS (matches About theme)
          - slow drifting blobs, no pulse glare
          ============================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="about-blob-1 absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, rgba(139,38,53,0.18) 0%, rgba(139,38,53,0) 70%)' }} />
        <div className="about-blob-2 absolute bottom-20 right-20 w-[28rem] h-[28rem] rounded-full blur-3xl"
             style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.30) 0%, rgba(30,58,95,0) 70%)' }} />
      </div>

      {/* ============================================
          MAIN CONTENT CONTAINER
          - Centered with max-width for readability
          - z-10 to appear above background elements
          ============================================ */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Profile Picture with Rotating Ring Animation */}
          <ProfilePicture />

          {/* ============================================
              TEXT CONTENT SECTION
              - Name, title, and bio with staggered animations
              - Each element has increasing animation delay
              ============================================ */}
          <div className="mb-8">
            {/* Main Headline - Name */}
            <h1 
              className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in" 
              style={{ color: 'var(--text-primary)' }}
            >
              Hi, I&apos;m <span style={{ color: 'var(--text-primary)' }}>
                {personalInfo.name.split(' ')[0]} {/* First name only */}
              </span>
            </h1>
            
            {/* Sub-headline - Typewriter rotating titles (burgundy accent) */}
            <h2 
              className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in-delay min-h-[1.2em]" 
              style={{ color: 'var(--text-secondary)' }}
              data-testid="hero-typed-title"
            >
              {typed}
              <span className="about-caret ml-1" style={{ color: 'var(--text-secondary)' }}>▍</span>
            </h2>
            
            {/* Bio Paragraph */}
            <p 
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fade-in-delay-2" 
              style={{ color: 'var(--text-muted)' }}
            >
              {personalInfo.bio}
            </p>
          </div>

          {/* ============================================
              CTA BUTTONS
              - Three buttons with soft neumorphic shadows
              - Responsive: stack on mobile, row on desktop
              - Latest fade-in animation (delay-3)
              ============================================ */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-3">
            
            {/* View My Work Button - Navy background */}
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: '#1e3a5f',
                color: '#e8d5c4',
                // Soft neumorphic shadow
                boxShadow: '2px 2px 6px rgba(10, 15, 26, 0.25), -2px -2px 6px rgba(46, 74, 111, 0.15)'
              }}
              data-testid="hero-view-work-btn"
            >
              View My Work
              {/* Arrow icon that moves on hover */}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Get In Touch Button - Burgundy background */}
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 rounded-xl text-white transition-all duration-300"
              style={{
                backgroundColor: '#8b2635',
                boxShadow: '2px 2px 6px rgba(10, 15, 26, 0.2), -2px -2px 6px rgba(155, 54, 69, 0.08)'
              }}
              data-testid="hero-contact-btn"
            >
              Get In Touch
            </button>
            
            {/* Resume Button - Navy background with download icon */}
            <a
              href="/resume"
              className="group px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-300"
              style={{
                backgroundColor: '#1e3a5f',
                color: '#e8d5c4',
                boxShadow: '2px 2px 6px rgba(10, 15, 26, 0.25), -2px -2px 6px rgba(46, 74, 111, 0.15)'
              }}
              data-testid="hero-resume-btn"
            >
              <Download size={20} />
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* ============================================
          SCROLL INDICATOR
          - Bouncing mouse/scroll icon at bottom
          - Visual cue that there's more content below
          ============================================ */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        {/* Mouse shape container */}
        <div className="w-6 h-10 border-2 border-[#e8d5c4]/50 rounded-full flex items-start justify-center p-2">
          {/* Scroll wheel dot */}
          <div className="w-1.5 h-1.5 bg-[#8b2635] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
