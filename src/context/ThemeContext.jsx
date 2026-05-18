/**
 * ThemeContext - Global Theme State Management
 * 
 * Provides theme state and toggle functionality across the entire application.
 * Implements React Context pattern for prop-drilling-free theme access.
 * 
 * @module ThemeContext
 * 
 * USAGE:
 * 1. Wrap app with <ThemeProvider>
 * 2. Use useTheme() hook in any component to access theme state
 * 
 * FEATURES:
 * - Persists theme preference in localStorage
 * - Applies 'dark' or 'light' class to document root
 * - Defaults to dark theme on first visit
 * 
 * EXAMPLE:
 * ```jsx
 * const { theme, toggleTheme } = useTheme();
 * // theme: 'dark' | 'light'
 * // toggleTheme: () => void
 * ```
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// =========================================
// CONTEXT CREATION
// =========================================

/**
 * ThemeContext - The context object
 * Default value is undefined, will be provided by ThemeProvider
 */
const ThemeContext = createContext();

// =========================================
// CUSTOM HOOK
// =========================================

/**
 * useTheme - Custom hook to access theme context
 * @returns {{ theme: string, toggleTheme: Function }}
 * @throws {Error} If used outside of ThemeProvider
 * 
 * @example
 * const { theme, toggleTheme } = useTheme();
 * console.log(theme); // 'dark' or 'light'
 * toggleTheme(); // Switches theme
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // Guard: Ensure hook is used within ThemeProvider
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
};

// =========================================
// PROVIDER COMPONENT
// =========================================

/**
 * ThemeProvider - Provides theme state to children
 * @param {{ children: React.ReactNode }} props
 * 
 * STATE:
 * - theme: Current theme ('dark' | 'light')
 * 
 * INITIALIZATION:
 * 1. Check localStorage for saved preference
 * 2. If none found, default to 'dark'
 * 
 * SIDE EFFECTS:
 * - Applies theme class to <html> element
 * - Saves theme to localStorage on change
 */
export const ThemeProvider = ({ children }) => {
  // =========================================
  // STATE INITIALIZATION
  // =========================================
  
  /**
   * theme state with lazy initialization
   * Reads from localStorage or defaults to 'dark'
   */
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme || 'dark';
  });

  // =========================================
  // THEME APPLICATION EFFECT
  // =========================================
  
  useEffect(() => {
    /**
     * Apply theme to document:
     * 1. Remove both theme classes first (clean slate)
     * 2. Add the current theme class
     * 3. Persist to localStorage
     * 
     * The CSS variables in index.css respond to .dark/.light classes
     */
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // =========================================
  // TOGGLE FUNCTION
  // =========================================
  
  /**
   * toggleTheme - Switches between dark and light themes
   * Uses functional update to ensure correct state transition
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // =========================================
  // PROVIDER RENDER
  // =========================================
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
