import { useState, useEffect } from 'react';
import {
    Building2, MapPin, Users, Save
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { GlassInput } from '../../common/GlassInput';
import { User } from '../../../types';
import { authService } from '../../services/authService';

interface AdminSettingsTabProps {
    user: User;
}

/**
 * Admin Settings Tab Component
 * Manage society and admin profile settings
 */
export function AdminSettingsTab({ user }: AdminSettingsTabProps) {
    const [society, setSociety] = useState<any>(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadSociety();
    }, []);

    const loadSociety = () => {
        if (user.societyId) {
            const societyData = authService.getSocietyById(user.societyId);
            setSociety(societyData);
        }
    };

    const handleSaveSocietySettings = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would update the society in the backend
        setSuccess('Settings saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
    };

    const handleSaveProfileSettings = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would update the admin profile in the backend
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                    Settings
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your society and profile settings
                </p>
            </div>

            {/* Alerts */}
            {error && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="ml-auto">×</button>
                </div>
            )}

            {success && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400">
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')} className="ml-auto">×</button>
                </div>
            )}

            {society && (
                <>
                    {/* Society Settings */}
                    <GlassCard className="p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-lg text-slate-900 dark:text-white">
                                Society Information
                            </h2>
                        </div>

                        <form onSubmit={handleSaveSocietySettings} className="space-y-4">
                            <GlassInput
                                label="Society Name"
                                value={society.name}
                                onChange={() => { }}
                                disabled
                            />

                            <GlassInput
                                label="Address"
                                value={society.address}
                                onChange={() => { }}
                                disabled
                            />

                            <GlassInput
                                label="Total Units"
                                type="number"
                                value={society.totalUnits}
                                onChange={() => { }}
                                disabled
                            />

                            <GlassInput
                                label="Registered Date"
                                value={new Date(society.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                onChange={() => { }}
                                disabled
                            />

                            <div className="pt-2">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Note: Society information cannot be modified. Contact support for changes.
                                </p>
                            </div>
                        </form>
                    </GlassCard>

                    {/* Profile Settings */}
                    <GlassCard className="p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <h2 className="text-lg text-slate-900 dark:text-white">
                                Admin Profile
                            </h2>
                        </div>

                        <form onSubmit={handleSaveProfileSettings} className="space-y-4">
                            <GlassInput
                                label="Full Name"
                                value={user.name}
                                onChange={() => { }}
                                placeholder="Enter your full name"
                            />

                            <GlassInput
                                label="Email Address"
                                type="email"
                                value={user.email}
                                onChange={() => { }}
                                disabled
                            />

                            <GlassInput
                                label="Role"
                                value="Society Admin"
                                onChange={() => { }}
                                disabled
                            />

                            <div className="pt-2">
                                <GlassButton type="submit" variant="primary">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Profile
                                </GlassButton>
                            </div>
                        </form>
                    </GlassCard>

                    {/* Payment Settings */}
                    <GlassCard className="p-4 md:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            <h2 className="text-lg text-slate-900 dark:text-white">
                                Payment Settings
                            </h2>
                        </div>

                        <form className="space-y-4">
                            <GlassInput
                                label="Default Monthly Maintenance"
                                type="number"
                                value="5000"
                                onChange={() => { }}
                                placeholder="₹5000"
                            />

                            <GlassInput
                                label="Payment Due Date"
                                type="number"
                                value="5"
                                onChange={() => { }}
                                placeholder="5th of every month"
                            />

                            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50">
                                <div>
                                    <p className="text-sm text-slate-900 dark:text-white mb-1">Enable Late Fee</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        Charge late fee for overdue payments
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="pt-2">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Note: Payment settings are for reference. Actual payment processing requires integration.
                                </p>
                            </div>
                        </form>
                    </GlassCard>
                </>
            )}
        </div>
    );
}
