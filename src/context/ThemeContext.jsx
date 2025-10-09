import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({})

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [primaryColor, setPrimaryColor] = useState('#2563EB')

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('misms-theme')
    const savedPrimaryColor = localStorage.getItem('misms-primary-color')
    
    if (savedTheme) {
      setTheme(savedTheme)
    }
    
    if (savedPrimaryColor) {
      setPrimaryColor(savedPrimaryColor)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('misms-theme', theme)
  }, [theme])

  useEffect(() => {
    // Apply primary color to CSS custom properties
    document.documentElement.style.setProperty('--primary-color', primaryColor)
    localStorage.setItem('misms-primary-color', primaryColor)
  }, [primaryColor])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const setLightTheme = () => {
    setTheme('light')
  }

  const setDarkTheme = () => {
    setTheme('dark')
  }

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color)
  }

  const resetToDefaultTheme = () => {
    setTheme('light')
    setPrimaryColor('#2563EB')
  }

  const value = {
    theme,
    primaryColor,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    updatePrimaryColor,
    resetToDefaultTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

