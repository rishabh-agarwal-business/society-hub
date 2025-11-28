import React from 'react'
import ThemeProvider from './contexts/ThemeContext'
import LandingPage from './components/landing/LandingPage'

const AppContent = () => {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      <LandingPage />
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App