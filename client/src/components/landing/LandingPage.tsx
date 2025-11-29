import { useState } from 'react';
import { NAV_LINKS } from '../../constants/constants';
import { useTheme } from '../../contexts/ThemeContext'
import Header from '../layout/Header'
import Contact from './Contact';
import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';
import Stats from './Stats';
import Testimonials from './Testimonials';
import WhyUs from './WhyUs';
import SigninForm from '../SigninForm';

interface LandingPageProps {
    onLogin?: (userData: any) => void;
}

const LandingPage = ({ onLogin }: LandingPageProps) => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [showAuth, setShowAuth] = useState<boolean>(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Ambient background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            <Header isDarkMode onToggleDarkMode={toggleDarkMode} actions={!showAuth ? NAV_LINKS : []} />

            {
                !showAuth ? (<>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                        <Hero />
                        <Features />
                    </div>

                    <div id='stats' className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                        <Stats />
                        <Testimonials />
                    </div>

                    <WhyUs />
                    <Contact />
                    <Footer />
                </>) : (
                    <div className="relative z-10 max-w-md mx-auto px-6 py-12 md:py-20">
                        {authMode === 'signin' ? (
                            <SigninForm
                                // onLogin={onLogin}
                                onLogin={() => { }}
                                onSwitchToSignup={() => setAuthMode('signup')}
                                isDarkMode={isDarkMode}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                )
            }

        </div>
    )
}

export default LandingPage