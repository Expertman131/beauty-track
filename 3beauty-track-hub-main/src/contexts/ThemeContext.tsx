
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';
type PrimaryColor = 'beauty' | 'teal' | 'lavender' | 'blue' | 'green' | 'purple';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  primaryColor: PrimaryColor;
  setPrimaryColor: (color: PrimaryColor) => void;
}

const defaultContext: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
  primaryColor: 'beauty',
  setPrimaryColor: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Move the state initialization inside the component to avoid hooks outside of components
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>('beauty');
  
  // Initialize theme from localStorage in a useEffect to ensure it runs in browser context
  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Check system preference
      setTheme('dark');
    }
    
    // Initialize primary color from localStorage
    const savedColor = localStorage.getItem('primaryColor') as PrimaryColor;
    if (savedColor) {
      setPrimaryColor(savedColor);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handlePrimaryColorChange = (color: PrimaryColor) => {
    setPrimaryColor(color);
    localStorage.setItem('primaryColor', color);
    
    // Apply color to CSS variables
    document.documentElement.setAttribute('data-color', color);
  };

  // Update the DOM when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Set initial color attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-color', primaryColor);
  }, [primaryColor]);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        primaryColor, 
        setPrimaryColor: handlePrimaryColorChange 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
