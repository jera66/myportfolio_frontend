/**
 * Header Component
 * 
 * The main navigation component for the portfolio website.
 * Features both desktop and mobile navigation with glassmorphism styling.
 * 
 * @component
 * 
 * STRUCTURE:
 * - Desktop Header: Fixed top navbar with glass effect on scroll
 *   - Logo (left), Nav Links (center), Theme Toggle (right)
 * - Mobile Navbar: Floating bottom navbar with rounded tabs
 *   - All nav links + Theme Toggle in a glass container
 * 
 * FEATURES:
 * - Scroll-aware glass morphism effect (appears on scroll)
 * - Active section highlighting based on scroll position
 * - Smooth scroll navigation to page sections
 * - Theme toggle integration
 * - Responsive design (desktop/mobile breakpoint at md:768px)
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  // =========================================
  // STATE MANAGEMENT
  // =========================================
  
  /**
   * isScrolled - Tracks if user has scrolled past threshold (50px)
   * Used to apply glass morphism effect on desktop header
   */
  const [isScrolled, setIsScrolled] = useState(false);
  
  /**
   * activeSection - Tracks currently visible section for nav highlighting
   * Values: 'home' | 'about' | 'projects' | 'resume' | 'contact'
   */
  const [activeSection, setActiveSection] = useState('home');

  /**
   * isLoaded - Triggers the navbar intro:
   *  1. Bar slides into place (fast)
   *  2. Items stagger-fade in afterwards
   */
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Next-frame flip so the initial off-screen state paints first
    const id = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // React Router hooks for navigation
  const location = useLocation();   // Current URL path
  const navigate = useNavigate();   // Programmatic navigation

  // =========================================
  // SCROLL DETECTION EFFECT
  // =========================================
  
  useEffect(() => {
    /**
     * handleScroll - Updates header state based on scroll position
     * 1. Sets isScrolled true when scrollY > 50px (triggers glass effect)
     * 2. Determines active section by checking which section is in viewport
     */
    const handleScroll = () => {
      // Enable glass effect after scrolling 50px
      setIsScrolled(window.scrollY > 50);

      // Find which section is currently in the viewport
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is "active" if its top is above 150px and bottom is below 150px
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      // Update active section or default to 'home' at top of page
      if (currentSection) {
        setActiveSection(currentSection);
      } else if (window.scrollY < 150) {
        setActiveSection('home');
      }
    };

    // Attach scroll listener and run initial check
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Cleanup on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // =========================================
  // ROUTE CHANGE EFFECT
  // =========================================
  
  useEffect(() => {
    /**
     * Updates active section when route changes
     * - /resume path sets activeSection to 'resume'
     * - / path sets activeSection to 'home'
     */
    if (location.pathname === '/resume') {
      setActiveSection('resume');
    } else if (location.pathname === '/') {
      setActiveSection('home');
    }
  }, [location]);

  // =========================================
  // NAVIGATION CONFIGURATION
  // =========================================
  
  /**
   * navLinks - Array of navigation items
   * @property {string} name - Display text
   * @property {string} path - URL path (/ for home, /resume for resume, /#section for sections)
   * @property {string} section - Section identifier for active state
   */
  const navLinks = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'About', path: '/#about', section: 'about' },
    { name: 'Projects', path: '/#projects', section: 'projects' },
    { name: 'Resume', path: '/resume', section: 'resume' },
    { name: 'Contact', path: '/#contact', section: 'contact' }
  ];

  // =========================================
  // EVENT HANDLERS
  // =========================================
  
  /**
   * handleNavClick - Handles all navigation link clicks
   * @param {Event} e - Click event (prevented for custom handling)
   * @param {string} path - Target path
   * @param {string} section - Section identifier
   * 
   * Logic:
   * 1. Home (/) - Scroll to top or navigate to home page
   * 2. Resume (/resume) - Navigate to resume page
   * 3. Section (/#about, etc.) - Scroll to section or navigate then scroll
   */
  const handleNavClick = (e, path, section) => {
    e.preventDefault();
    
    if (path === '/') {
      // HOME NAVIGATION
      if (location.pathname === '/') {
        // Already on home - smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // On different page - navigate to home
        navigate('/');
      }
      setActiveSection('home');
    } else if (path === '/resume') {
      // RESUME PAGE NAVIGATION
      navigate('/resume');
      setActiveSection('resume');
    } else if (path.startsWith('/#')) {
      // SECTION NAVIGATION (e.g., /#about)
      if (location.pathname !== '/') {
        // On different page - navigate to home first, then scroll
        navigate('/');
        setTimeout(() => {
          const id = path.substring(2); // Remove '/#' prefix
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100); // Delay to allow page load
      } else {
        // Already on home - just scroll to section
        const id = path.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setActiveSection(section);
    }
  };

  /**
   * isActive - Determines if a nav link should be highlighted
   * @param {string} section - Section to check
   * @returns {boolean} - True if section is active
   */
  const isActive = (section) => {
    if (location.pathname === '/resume') {
      return section === 'resume';
    }
    return activeSection === section;
  };

  // =========================================
  // RENDER
  // =========================================
  
  return (
    <>
      {/* ============================================
          DESKTOP HEADER
          - Hidden on mobile (hidden md:block)
          - Fixed position at top
          - Glass morphism effect when scrolled
          ============================================ */}
      <header
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={{
          // Glass morphism: semi-transparent bg + blur
          background: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          // Whole bar slides in from the right edge on first load.
          // Hidden completely until the slide starts, then sweeps left into place.
          transform: isLoaded ? 'translateX(0)' : 'translateX(100%)',
          transitionProperty: 'transform, background, backdrop-filter, box-shadow, border-color',
          transitionDuration: '900ms',
          transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.25, 1)'
        }}
      >
        <nav className="container mx-auto px-6 py-4">
          {/* 3-Column Grid: Logo | Nav Links | Theme Toggle */}
          <div className="grid grid-cols-3 items-center">
            {/* Logo - Left Aligned */}
            <div className="flex justify-start">
              <Link 
                to="/" 
                onClick={(e) => handleNavClick(e, '/', 'home')}
                className="text-2xl font-bold"
              >
                <span 
                  style={{
                    color: 'var(--text-primary)',
                    // Subtle inset text shadow for depth
                    textShadow: 'inset 4px 4px 8px rgba(10, 15, 26, 0.9), inset -4px -4px 8px rgba(46, 74, 111, 0.2)',
                    WebkitTextStroke: '0.5px rgba(10, 15, 26, 0.3)',
                    filter: 'brightness(0.85) contrast(1.1)',
                    letterSpacing: '0.02em'
                  }}
                >
                  Jerathel
                </span>
              </Link>
            </div>

            {/* Navigation Links - Center Aligned */}
            <div className="flex items-center justify-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path, link.section)}
                  className={`text-sm font-medium transition-colors hover:text-[#8b2635]`}
                  style={{
                    color: isActive(link.section) ? '#8b2635' : 'var(--text-primary)'
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme Toggle - Right Aligned */}
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      {/* ============================================
          MOBILE FLOATING NAVBAR
          - Visible only on mobile (md:hidden)
          - Fixed at bottom of screen
          - Rounded glass container with neumorphic tabs
          ============================================ */}
      <nav className="md:hidden fixed bottom-6 left-1/2 z-50 w-[95%] max-w-lg"
           style={{
             // Whole mobile bar slides in from the right on first load.
             transform: isLoaded
               ? 'translateX(-50%)'
               : 'translateX(calc(100vw - 50%))',
             transition: 'transform 900ms cubic-bezier(0.2, 0.9, 0.25, 1)'
           }}>
        <div 
          className="rounded-[50px] px-4 py-3"
          style={{
            // Glass morphism with navy tint
            background: 'rgba(30, 58, 95, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            // Neumorphic shadow for depth
            boxShadow: '6px 6px 20px rgba(10, 15, 26, 0.4), -6px -6px 20px rgba(255, 255, 255, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* 6-Column Grid: 5 nav tabs + 1 theme toggle */}
          <div className="grid grid-cols-6 items-center gap-2">
            {/* Navigation Tabs */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path, link.section)}
                className={`text-[10px] font-medium text-center py-2 rounded-full transition-all duration-300`}
                style={{
                  color: isActive(link.section) ? '#ffffff' : 'var(--text-primary)',
                  backgroundColor: isActive(link.section) ? '#8b2635' : 'rgba(30, 58, 95, 0.3)',
                  boxShadow: isActive(link.section)
                    ? '3px 3px 8px rgba(10, 15, 26, 0.4), -3px -3px 8px rgba(155, 54, 69, 0.2)'
                    : '3px 3px 8px rgba(10, 15, 26, 0.3), -3px -3px 8px rgba(255, 255, 255, 0.15)'
                }}
              >
                {link.name}
              </a>
            ))}
            <div className="flex justify-end scale-[0.65]">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
