import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-40 w-14 h-14 rounded-full text-white transition-all duration-300 flex items-center justify-center animate-slow-bounce"
          style={{
            backgroundColor: '#8b2635',
            boxShadow: '4px 4px 16px rgba(10, 15, 26, 0.5), -4px -4px 16px rgba(155, 54, 69, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.2)',
            left: '50%',
            marginLeft: '-28px', // Half of width (56px / 2 = 28px)
            bottom: window.innerWidth < 768 ? '6rem' : '2rem'
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default BackToTop;
