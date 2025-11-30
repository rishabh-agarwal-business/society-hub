import { useState, useEffect } from 'react';
import { Mail, Lock, User, Home, Building2, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { authService } from './services/authService';
import { GlassSelect } from './common/GlassSelect';

interface SignupFormProps {
    onSignup: (user: any) => void;
    onSwitchToLogin: () => void;
    isDarkMode?: boolean;
}

export function SignupForm({ onSignup, onSwitchToLogin, isDarkMode }: SignupFormProps) {
    const [step, setStep] = useState(1); // 1: Select Type, 2: Select Society/Fill Admin, 3: Fill Details
    const [userType, setUserType] = useState<'admin' | 'member' | ''>('');
    const [societies, setSocieties] = useState<any[]>([]);
    const [selectedSociety, setSelectedSociety] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Load societies
        const allSocieties = authService.getSocieties();
        setSocieties(allSocieties);
    }, []);

    const handleTypeSelect = (type: 'admin' | 'member') => {
        setUserType(type);
        setError('');
        if (type === 'admin') {
            setStep(3); // Go directly to registration form for admin
        } else {
            setStep(2); // Go to society selection for member
        }
    };

    const handleSocietySelect = () => {
        if (!selectedSociety) {
            setError('Please select a society');
            return;
        }
        setError('');
        setStep(3);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            if (userType === 'admin') {
                // Register as society admin
                const user = authService.registerSocietyAdmin(email, password, name, phone);
                if (user) {
                    onSignup(user);
                }
            } else {
                // Register as member
                const user = authService.register(email, password, name, selectedSociety, houseNumber);
                if (user) {
                    onSignup(user);
                }
            }
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
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
                        Create Account
                    </h2>
                    <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                        {step === 1 ? 'Choose your account type' : step === 2 ? 'Select your society' : 'Fill in your details'}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8 gap-2">
                    <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${step >= 1
                            ? isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                            : isDarkMode ? 'bg-white/20 text-slate-400' : 'bg-slate-200 text-slate-500'
                        }
          `}>
                        {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                    </div>
                    <div className={`w-8 h-0.5 ${step > 1 ? 'bg-blue-500' : isDarkMode ? 'bg-white/20' : 'bg-slate-200'}`} />
                    <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${step >= 2
                            ? isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                            : isDarkMode ? 'bg-white/20 text-slate-400' : 'bg-slate-200 text-slate-500'
                        }
          `}>
                        {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                    </div>
                    <div className={`w-8 h-0.5 ${step > 2 ? 'bg-blue-500' : isDarkMode ? 'bg-white/20' : 'bg-slate-200'}`} />
                    <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${step >= 3
                            ? isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                            : isDarkMode ? 'bg-white/20 text-slate-400' : 'bg-slate-200 text-slate-500'
                        }
          `}>
                        3
                    </div>
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

                {/* Step 1: Select User Type */}
                {step === 1 && (
                    <div className="space-y-4">
                        <p className={`text-center mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            Are you registering as:
                        </p>

                        <button
                            onClick={() => handleTypeSelect('admin')}
                            className={`
                w-full p-6 rounded-xl transition-all text-left
                ${isDarkMode
                                    ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-white/20'
                                    : 'bg-linear-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-slate-200'
                                }
              `}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/30' : 'bg-blue-200'}`}>
                                    <Building2 className={`w-6 h-6 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`} />
                                </div>
                                <div>
                                    <h3 className={`mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        Society Admin
                                    </h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Register your society and manage members, payments, and more.
                                    </p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleTypeSelect('member')}
                            className={`
                w-full p-6 rounded-xl transition-all text-left
                ${isDarkMode
                                    ? 'bg-linear-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30 border border-white/20'
                                    : 'bg-linear-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 border border-slate-200'
                                }
              `}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-green-500/30' : 'bg-green-200'}`}>
                                    <User className={`w-6 h-6 ${isDarkMode ? 'text-green-200' : 'text-green-700'}`} />
                                </div>
                                <div>
                                    <h3 className={`mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        Society Member
                                    </h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Join your registered society and manage your payments and requests.
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                )}

                {/* Step 2: Society Selection (for members only) */}
                {step === 2 && userType === 'member' && (
                    <div className="space-y-6">
                        <div>
                            <label className={`block mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                Select Your Society
                            </label>
                            <GlassSelect
                                icon={Building2}
                                value={selectedSociety}
                                label='Choose a society'
                                onValueChange={(value) => setSelectedSociety(value)}
                                options={societies.map(society => ({
                                    value: society.id,
                                    label: society.name
                                }))}
                            />
                        </div>

                        {/* Info Box */}
                        <div className={`
              p-4 rounded-xl
              ${isDarkMode
                                ? 'bg-blue-500/20 border border-blue-500/30'
                                : 'bg-blue-50 border border-blue-200'
                            }
            `}>
                            <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                                💡 Your society must be registered and your details must be added by the admin before you can create an account.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className={`
                  px-6 py-3 rounded-xl transition-all
                  ${isDarkMode
                                        ? 'bg-white/10 hover:bg-white/20 text-slate-300'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    }
                `}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSocietySelect}
                                className={`
                  flex-1 py-3 rounded-xl transition-all
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
                    </div>
                )}

                {/* Step 3: Registration Form */}
                {step === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Selected Society Display (for members) */}
                        {userType === 'member' && (
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
                                    onClick={() => setStep(2)}
                                    className={`text-sm ${isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}
                                >
                                    Change
                                </button>
                            </div>
                        )}

                        {/* Account Type Display (for admins) */}
                        {userType === 'admin' && (
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
                                        Registering as Society Admin
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
                        )}

                        {/* Name Field */}
                        <div>
                            <label className={`block mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                Full Name
                            </label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your full name"
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
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                Use the email registered with your society
                            </p>
                        </div>

                        {/* House Number Field (for members only) */}
                        {userType === 'member' && (
                            <div>
                                <label className={`block mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                    House/Unit Number
                                </label>
                                <div className="relative">
                                    <Home className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                    <input
                                        type="text"
                                        value={houseNumber}
                                        onChange={(e) => setHouseNumber(e.target.value)}
                                        required
                                        placeholder="e.g., A-101"
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
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Must match the house number registered by admin
                                </p>
                            </div>
                        )}

                        {/* Phone Field (for admins only) */}
                        {userType === 'admin' && (
                            <div>
                                <label className={`block mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder="Enter your phone number"
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
                        )}

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
                                    placeholder="Create a password"
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

                        {/* Confirm Password Field */}
                        <div>
                            <label className={`block mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm your password"
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
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                )}

                {/* Switch to Login */}
                <div className="mt-6 text-center">
                    <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                        Already have an account?{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
