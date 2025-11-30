import { useState } from 'react';
import {
    Building2, Moon, Sun, Sparkles, Shield, Bell, CreditCard,
    Users, TrendingUp, Award, Zap, CheckCircle2, Star,
    Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin, Facebook
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { GlassButton } from './common/GlassButton';

interface LandingPageProps {
    onLogin: (userData: any) => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle contact form submission
        alert('Thank you for contacting us! We will get back to you soon.');
        setContactForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 px-4 md:px-6 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="glass-morphism p-2 rounded-2xl">
                            <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-slate-900 dark:text-white tracking-tight text-sm md:text-base">SocietyHub</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        {!showAuth && (
                            <div className="hidden md:flex items-center gap-6 mr-4">
                                <a href="#features" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
                                <a href="#stats" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stats</a>
                                <a href="#why-us" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Why Us</a>
                                <a href="#contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
                            </div>
                        )}
                        <GlassButton
                            onClick={toggleDarkMode}
                            className="glass-button p-2 md:p-3 hover:scale-105 transition-transform"
                        >
                            {isDarkMode ? (
                                <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                            ) : (
                                <Moon className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
                            )}
                        </GlassButton>
                        <GlassButton
                            onClick={() => setShowAuth(!showAuth)}
                            className="glass-button px-4 md:px-6 text-sm md:text-base"
                        >
                            {showAuth ? 'Back' : 'Get Started'}
                        </GlassButton>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            {!showAuth ? (
                <>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                        <div className="text-center max-w-4xl mx-auto space-y-8">
                            <div className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full">
                                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-slate-700 dark:text-slate-300">Next-gen Society Management</span>
                            </div>

                            <h1 className="text-slate-900 dark:text-white text-6xl md:text-7xl tracking-tight">
                                Manage Your Society
                                <span className="block mt-2 bg-linear-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                    Effortlessly
                                </span>
                            </h1>

                            <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto">
                                A futuristic platform for society maintenance, payments, and community management. Experience seamless living.
                            </p>

                            <div className="flex items-center justify-center gap-4 pt-4">
                                <Button
                                    onClick={() => setShowAuth(true)}
                                    className="glass-button-primary px-8 py-6 text-lg"
                                >
                                    Register Your Society
                                </Button>
                                <Button
                                    onClick={() => setShowAuth(true)}
                                    variant="outline"
                                    className="glass-button px-8 py-6 text-lg"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div id="features" className="grid md:grid-cols-3 gap-6 mt-24">
                            <div className="glass-card p-8 rounded-3xl space-y-4 hover:scale-105 transition-transform">
                                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <CreditCard className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-slate-900 dark:text-white text-xl">Easy Payments</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Pay your monthly charges seamlessly with multiple payment options and automated reminders.
                                </p>
                            </div>

                            <div className="glass-card p-8 rounded-3xl space-y-4 hover:scale-105 transition-transform">
                                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <Bell className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-slate-900 dark:text-white text-xl">Smart Notifications</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Get timely reminders via email, SMS, and WhatsApp. Never miss a payment or event.
                                </p>
                            </div>

                            <div className="glass-card p-8 rounded-3xl space-y-4 hover:scale-105 transition-transform">
                                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-slate-900 dark:text-white text-xl">Secure & Transparent</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Track all your payments and society activities with complete transparency and security.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div id="stats" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                        <div className="text-center mb-16">
                            <h2 className="text-slate-900 dark:text-white text-4xl md:text-5xl mb-4">
                                Trusted by Communities Nationwide
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-xl">
                                Join thousands of societies managing their communities efficiently
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="glass-card p-8 rounded-3xl text-center hover:scale-105 transition-transform">
                                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-slate-900 dark:text-white text-4xl mb-2">1,250+</div>
                                <div className="text-slate-600 dark:text-slate-400">Societies Registered</div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl text-center hover:scale-105 transition-transform">
                                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-slate-900 dark:text-white text-4xl mb-2">75,000+</div>
                                <div className="text-slate-600 dark:text-slate-400">Active Members</div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl text-center hover:scale-105 transition-transform">
                                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-slate-900 dark:text-white text-4xl mb-2">₹450Cr+</div>
                                <div className="text-slate-600 dark:text-slate-400">Transactions Processed</div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl text-center hover:scale-105 transition-transform">
                                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-slate-900 dark:text-white text-4xl mb-2">98%</div>
                                <div className="text-slate-600 dark:text-slate-400">Satisfaction Rate</div>
                            </div>
                        </div>

                        {/* Testimonials */}
                        <div className="mt-16 grid md:grid-cols-3 gap-6">
                            <div className="glass-card p-6 rounded-3xl">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    ))}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    "SocietyHub has transformed how we manage our community. Payment collection is now 100% on time!"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                                        R
                                    </div>
                                    <div>
                                        <div className="text-slate-900 dark:text-white">Rajesh Kumar</div>
                                        <div className="text-slate-600 dark:text-slate-400">Secretary, Green Park Society</div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-3xl">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    ))}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    "The automated reminders and easy payment options have made life so much easier for our residents."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                                        P
                                    </div>
                                    <div>
                                        <div className="text-slate-900 dark:text-white">Priya Sharma</div>
                                        <div className="text-slate-600 dark:text-slate-400">Treasurer, Sunrise Apartments</div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6 rounded-3xl">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    ))}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    "Modern, intuitive interface. Our elderly residents find it easy to use. Highly recommended!"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                                        A
                                    </div>
                                    <div>
                                        <div className="text-slate-900 dark:text-white">Amit Patel</div>
                                        <div className="text-slate-600 dark:text-slate-400">Chairman, Vista Heights</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Us Section */}
                    <div id="why-us" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                        <div className="text-center mb-16">
                            <h2 className="text-slate-900 dark:text-white text-4xl md:text-5xl mb-4">
                                Why SocietyHub is the Best Choice
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-xl">
                                Built with the latest technology for maximum efficiency
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="glass-card p-8 rounded-3xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-xl mb-2">Lightning Fast Performance</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Built on cutting-edge technology ensuring instant payments and real-time updates for all users.
                                    </p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-xl mb-2">Bank-Grade Security</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        256-bit SSL encryption and PCI DSS compliance ensures your financial data is always protected.
                                    </p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-xl mb-2">99.9% Uptime Guarantee</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Our robust infrastructure ensures your society operations never stop, 24/7 availability.
                                    </p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-xl mb-2">Dedicated Support Team</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        24/7 customer support ready to assist you with any queries or issues you might encounter.
                                    </p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-rose-500 to-red-500 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-xl mb-2">Smart Automation</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        AI-powered reminders, auto-generated receipts, and intelligent payment tracking save hours of manual work.
                                    </p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl flex gap-6">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center shrink-0">
                                    <Bell className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-xl mb-2">Multi-Channel Notifications</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Reach members through email, SMS, WhatsApp, and in-app notifications for maximum engagement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div id="contact" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                        <div className="glass-card rounded-3xl p-12">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Contact Info */}
                                <div>
                                    <h2 className="text-slate-900 dark:text-white text-4xl mb-4">Get in Touch</h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
                                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                                                <Mail className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-slate-900 dark:text-white mb-1">Email</div>
                                                <div className="text-slate-600 dark:text-slate-400">support@societyhub.com</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                                <Phone className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-slate-900 dark:text-white mb-1">Phone</div>
                                                <div className="text-slate-600 dark:text-slate-400">+91 1800-123-4567</div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                                                <MapPin className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-slate-900 dark:text-white mb-1">Address</div>
                                                <div className="text-slate-600 dark:text-slate-400">
                                                    Tech Tower, Cyber City,<br />
                                                    Gurugram, Haryana 122002
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="text-slate-900 dark:text-white mb-4">Follow Us</div>
                                        <div className="flex gap-3">
                                            <button className="glass-morphism p-3 rounded-xl hover:scale-105 transition-transform">
                                                <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </button>
                                            <button className="glass-morphism p-3 rounded-xl hover:scale-105 transition-transform">
                                                <Twitter className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                            </button>
                                            <button className="glass-morphism p-3 rounded-xl hover:scale-105 transition-transform">
                                                <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                            </button>
                                            <button className="glass-morphism p-3 rounded-xl hover:scale-105 transition-transform">
                                                <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div>
                                    <form onSubmit={handleContactSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="contact-name" className="text-slate-700 dark:text-slate-300">
                                                Your Name
                                            </Label>
                                            <Input
                                                id="contact-name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="glass-input"
                                                value={contactForm.name}
                                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="contact-email" className="text-slate-700 dark:text-slate-300">
                                                Email Address
                                            </Label>
                                            <Input
                                                id="contact-email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="glass-input"
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="contact-message" className="text-slate-700 dark:text-slate-300">
                                                Message
                                            </Label>
                                            <Textarea
                                                id="contact-message"
                                                placeholder="Tell us how we can help you..."
                                                className="glass-input min-h-[150px] resize-none"
                                                value={contactForm.message}
                                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="w-full glass-button-primary py-6 text-lg">
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Message
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="relative z-10 border-t border-slate-200/50 dark:border-slate-800/50 mt-20">
                        <div className="max-w-7xl mx-auto px-6 py-12">
                            <div className="grid md:grid-cols-4 gap-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="glass-morphism p-2 rounded-2xl">
                                            <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className="text-slate-900 dark:text-white tracking-tight">SocietyHub</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        The future of society management. Simplifying community living with technology.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-slate-900 dark:text-white mb-4">Product</h4>
                                    <ul className="space-y-2">
                                        <li>
                                            <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Features
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Pricing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Demo
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Updates
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-slate-900 dark:text-white mb-4">Company</h4>
                                    <ul className="space-y-2">
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                About Us
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Careers
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Contact
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Blog
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-slate-900 dark:text-white mb-4">Legal</h4>
                                    <ul className="space-y-2">
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Privacy Policy
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Terms of Service
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                Cookie Policy
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                GDPR
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-slate-200/50 dark:border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="text-slate-600 dark:text-slate-400 text-center md:text-left">
                                    © 2025 SocietyHub. All rights reserved.
                                </p>
                                <div className="flex gap-6">
                                    <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        Privacy
                                    </a>
                                    <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        Terms
                                    </a>
                                    <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        Sitemap
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </>
            ) : (
                /* Auth Form */
                <div className="relative z-10 max-w-md mx-auto px-6 py-12 md:py-20">
                    {authMode === 'login' ? (
                        <LoginForm
                            onLogin={onLogin}
                            onSwitchToSignup={() => setAuthMode('signup')}
                            isDarkMode={isDarkMode}
                        />
                    ) : (
                        <SignupForm
                            onSignup={onLogin}
                            onSwitchToLogin={() => setAuthMode('login')}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </div>
            )}
        </div>
    );
}