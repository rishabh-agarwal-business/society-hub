import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { authService } from './components/services/authService';
import ThemeProvider from './contexts/ThemeContext';
import { DashboardView } from './components/dashboard/Dashboard';
import { EventPopup } from './components/EventPopup';
import { AdminDashboard } from './components/adminDashboard/AdminDashboard';

function AppContent() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'admin'>('landing');
  const [showEventPopup, setShowEventPopup] = useState(false);

  // User data from authService
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      if (currentUser.role === 'society_admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('dashboard');
      }
    }
  }, []);

  // Show event popup when user logs in
  useEffect(() => {
    if (currentView === 'dashboard' && user && user.role === 'member') {
      const timer = setTimeout(() => {
        setShowEventPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentView, user]);

  const handleLogin = (userData: any) => {
    setUser(userData);
    // Check if user is society admin
    if (userData.role === 'society_admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentView('landing');
  };

  const event = {
    title: 'Annual Diwali Celebration',
    colony: 'A Block',
    date: 'November 25, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Community Hall, A Block',
    description: 'Join us for our annual Diwali celebration with cultural programs, dinner, and fireworks display. All residents of A Block are cordially invited.',
    attendees: 87,
    image: 'https://images.unsplash.com/photo-1605722243979-fe0be8158232?w=800&q=80'
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {currentView === 'landing' ? (
        <LandingPage
          onLogin={handleLogin}
        />
      ) : currentView === 'admin' ? (
        <AdminDashboard
          user={user}
          onLogout={handleLogout}
        />
      ) : (
        <DashboardView
          user={user}
          onLogout={handleLogout}
        />
      )}

      {showEventPopup && (
        <EventPopup
          event={event}
          onClose={() => setShowEventPopup(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}