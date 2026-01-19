import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      } else if (window.scrollY < 150) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set active section based on current path
    if (location.pathname === '/resume') {
      setActiveSection('resume');
    } else if (location.pathname === '/') {
      setActiveSection('home');
    }
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'About', path: '/#about', section: 'about' },
    { name: 'Projects', path: '/#projects', section: 'projects' },
    { name: 'Resume', path: '/resume', section: 'resume' },
    { name: 'Contact', path: '/#contact', section: 'contact' }
  ];

  const handleNavClick = (e, path, section) => {
    e.preventDefault();
    
    if (path === '/') {
      // Home button - go to top
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      setActiveSection('home');
    } else if (path === '/resume') {
      navigate('/resume');
      setActiveSection('resume');
    } else if (path.startsWith('/#')) {
      // Section navigation
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const id = path.substring(2);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const id = path.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setActiveSection(section);
    }
  };

  const isActive = (section) => {
    if (location.pathname === '/resume') {
      return section === 'resume';
    }
    return activeSection === section;
  };

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
        style={{
          background: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
        }}
      >
        <nav className="container mx-auto px-6 py-4">
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

            {/* Nav Links - Center Aligned */}
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

      {/* Mobile Floating Glass Navbar */}
      <nav className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-lg">
        <div 
          className="rounded-[50px] px-4 py-3"
          style={{
            background: 'rgba(30, 58, 95, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '6px 6px 20px rgba(10, 15, 26, 0.4), -6px -6px 20px rgba(255, 255, 255, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="grid grid-cols-6 items-center gap-2">
            {/* Navigation tabs - centered, taking 5 columns */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path, link.section)}
                className={`text-[10px] font-medium transition-all duration-300 text-center py-2 rounded-full`}
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
            {/* Theme toggle - right aligned, taking 1 column */}
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
