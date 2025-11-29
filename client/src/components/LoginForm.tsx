import { useState, useEffect } from 'react';
import { Mail, Lock, AlertCircle, Building2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { authService } from './services/authService';

interface LoginFormProps {
    onLogin: (user: any) => void;
    onSwitchToSignup: () => void;
    isDarkMode?: boolean;
}

export function LoginForm({ onLogin, onSwitchToSignup }: LoginFormProps) {
    const { isDarkMode } = useTheme();
    const [step, setStep] = useState(1); // 1: Select Society, 2: Enter Credentials
    const [societies, setSocieties] = useState<any[]>([]);
    const [selectedSociety, setSelectedSociety] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Load societies
        const allSocieties = authService.getSocieties();
        setSocieties(allSocieties);
    }, []);

    const handleSocietySelect = () => {
        if (!selectedSociety) {
            setError('Please select a society');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = authService.login(email, password, selectedSociety);
            if (user) {
                onLogin(user);
            } else {
                setError('Invalid email or password, or wrong society selected');
            }
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const fillDemoCredentials = (type: 'admin' | 'member') => {
        if (type === 'admin') {
            setEmail('admin1@greenvalley.com');
            setPassword('admin@123');
        } else {
            setEmail('amit@example.com');
            setPassword('member@123');
        }
    };

    return (
        <div className="w-full max-w-md">
            {/* Glassmorphic Card */}
            <div className={`
        relative overflow-hidden rounded-3xl p-8
        ${isDarkMode
                    ? 'bg-white/10 backdrop-blur-xl border border-white/20'
                    : 'bg-white/60 backdrop-blur-xl border border-white/40'
                }
        shadow-2xl
      `}>
                {/* Title */}
                <div className="text-center mb-8">
                    <h2 className={`text-2xl mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Welcome Back
                    </h2>
                    <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                        {step === 1 ? 'Select your society to continue' : 'Sign in to your account'}
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className={`
            flex items-center gap-2 p-4 rounded-xl mb-6
            ${isDarkMode
                            ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                            : 'bg-red-50 border border-red-200 text-red-700'
                        }
          `}>
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Step 1: Society Selection */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div>
                            <label className={`block mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                Select Your Society
                            </label>
                            <div className="relative">
                                <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                <select
                                    value={selectedSociety}
                                    onChange={(e) => setSelectedSociety(e.target.value)}
                                    className={`
                    w-full pl-12 pr-4 py-3 rounded-xl
                    ${isDarkMode
                                            ? 'bg-white/10 border-white/20 text-white'
                                            : 'bg-white/50 border-slate-200 text-slate-900'
                                        }
                    border focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    transition-all appearance-none cursor-pointer
                  `}
                                >
                                    <option value="">Choose a society</option>
                                    {societies.map((society) => (
                                        <option key={society.id} value={society.id} className="bg-slate-900">
                                            {society.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSocietySelect}
                            className={`
                w-full py-3 rounded-xl transition-all
                ${isDarkMode
                                    ? 'bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                                    : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                                }
                text-white shadow-lg hover:shadow-xl
              `}
                        >
                            Continue
                        </button>
                    </div>
                )}

                {/* Step 2: Login Form */}
                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Selected Society Display */}
                        <div className={`
              p-4 rounded-xl flex items-center justify-between
              ${isDarkMode
                                ? 'bg-blue-500/20 border border-blue-500/30'
                                : 'bg-blue-50 border border-blue-200'
                            }
            `}>
                            <div className="flex items-center gap-2">
                                <Building2 className={`w-5 h-5 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`} />
                                <span className={isDarkMode ? 'text-blue-200' : 'text-blue-800'}>
                                    {societies.find(s => s.id === selectedSociety)?.name}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className={`text-sm ${isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}
                            >
                                Change
                            </button>
                        </div>

                        {/* Demo Credentials */}
                        <div className={`
              p-4 rounded-xl
              ${isDarkMode
                                ? 'bg-green-500/20 border border-green-500/30'
                                : 'bg-green-50 border border-green-200'
                            }
            `}>
                            <p className={`mb-2 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                                Demo Credentials:
                            </p>
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() => fillDemoCredentials('admin')}
                                    className={`
                    text-sm px-4 py-2 rounded-lg transition-all w-full text-left
                    ${isDarkMode
                                            ? 'bg-green-500/30 hover:bg-green-500/40 text-green-200'
                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                        }
                  `}
                                >
                                    Admin: admin1@greenvalley.com / admin@123
                                </button>
                                <button
                                    type="button"
                                    onClick={() => fillDemoCredentials('member')}
                                    className={`
                    text-sm px-4 py-2 rounded-lg transition-all w-full text-left
                    ${isDarkMode
                                            ? 'bg-green-500/30 hover:bg-green-500/40 text-green-200'
                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                        }
                  `}
                                >
                                    Member: amit@example.com / member@123
                                </button>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className={`block mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                    className={`
                    w-full pl-12 pr-4 py-3 rounded-xl
                    ${isDarkMode
                                            ? 'bg-white/10 border-white/20 text-white placeholder:text-slate-400'
                                            : 'bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-500'
                                        }
                    border focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    transition-all
                  `}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className={`block mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                    className={`
                    w-full pl-12 pr-4 py-3 rounded-xl
                    ${isDarkMode
                                            ? 'bg-white/10 border-white/20 text-white placeholder:text-slate-400'
                                            : 'bg-white/50 border-slate-200 text-slate-900 placeholder:text-slate-500'
                                        }
                    border focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    transition-all
                  `}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                w-full py-3 rounded-xl transition-all
                ${isDarkMode
                                    ? 'bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                                    : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                                }
                text-white shadow-lg hover:shadow-xl
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                )}

                {/* Switch to Signup */}
                <div className="mt-6 text-center">
                    <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                        Don't have an account?{' '}
                        <button
                            onClick={onSwitchToSignup}
                            className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
