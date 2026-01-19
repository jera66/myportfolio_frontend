import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center"
      style={{
        backgroundColor: 'var(--bg-card)',
        boxShadow: '2px 2px 6px var(--shadow-color-1), -2px -2px 6px var(--shadow-color-2)',
        color: 'var(--text-primary)'
      }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
