import { useState } from 'react';
import {
    User as UserIcon, Mail, Phone, Home, Lock,
    Bell, CreditCard, Shield, Save, Eye, EyeOff, Calendar
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { GlassInput } from '../../common/GlassInput';
import { StatusBadge } from '../../common/StatusBadge';
import { User } from '../../../types';
import { GlassSelect } from '../../common/GlassSelect';

interface SettingsTabProps {
    user: User;
}

/**
 * Settings Tab Component
 * User profile, preferences, and account settings
 */
export function SettingsTab({ user }: SettingsTabProps) {
    const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'notifications' | 'payment'>('profile');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Profile state
    const [profileData, setProfileData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        houseNumber: user.houseNumber || '',
    });

    // Security state
    const [securityData, setSecurityData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Notification preferences
    const [notificationPrefs, setNotificationPrefs] = useState({
        emailNotifications: true,
        smsNotifications: true,
        whatsappNotifications: false,
        pushNotifications: true,
        paymentReminders: true,
        eventUpdates: true,
        newsAnnouncements: true,
    });

    // Payment preferences
    const [paymentPrefs, setPaymentPrefs] = useState({
        autoPayEnabled: false,
        defaultPaymentMethod: 'upi',
        reminderDays: 5,
    });

    const sections = [
        { id: 'profile', label: 'Profile', icon: UserIcon },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'payment', label: 'Payment', icon: CreditCard },
    ];

    const handleSaveProfile = () => {
        console.log('Saving profile:', profileData);
        alert('Profile updated successfully!');
    };

    const handleChangePassword = () => {
        if (securityData.newPassword !== securityData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Changing password');
        alert('Password changed successfully!');
        setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleSaveNotifications = () => {
        console.log('Saving notification preferences:', notificationPrefs);
        alert('Notification preferences saved!');
    };

    const handleSavePayment = () => {
        console.log('Saving payment preferences:', paymentPrefs);
        alert('Payment preferences saved!');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                    Settings
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1">
                    <GlassCard className="p-2">
                        <div className="space-y-1">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;

                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id as any)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                            ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-sm">{section.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </GlassCard>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <GlassCard className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl text-slate-900 dark:text-white">
                                    Profile Information
                                </h2>
                                <StatusBadge variant="success">Verified</StatusBadge>
                            </div>

                            <div className="space-y-4">
                                <GlassInput
                                    label="Full Name"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    icon={<UserIcon className="w-4 h-4" />}
                                    placeholder="Enter your full name"
                                />

                                <GlassInput
                                    label="Email Address"
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    icon={<Mail className="w-4 h-4" />}
                                    placeholder="Enter your email"
                                />

                                <GlassInput
                                    label="Phone Number"
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    icon={<Phone className="w-4 h-4" />}
                                    placeholder="Enter your phone number"
                                />

                                <GlassInput
                                    label="House Number"
                                    value={profileData.houseNumber}
                                    onChange={(e) => setProfileData({ ...profileData, houseNumber: e.target.value })}
                                    icon={<Home className="w-4 h-4" />}
                                    placeholder="Enter your house/flat number"
                                />

                                <div className="pt-4">
                                    <GlassButton
                                        variant="primary"
                                        onClick={handleSaveProfile}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </GlassButton>
                                </div>
                            </div>
                        </GlassCard>
                    )}

                    {/* Security Section */}
                    {activeSection === 'security' && (
                        <GlassCard className="p-6">
                            <h2 className="text-xl text-slate-900 dark:text-white mb-6">
                                Security Settings
                            </h2>

                            <div className="space-y-6">
                                {/* Change Password */}
                                <div>
                                    <h3 className="text-sm text-slate-900 dark:text-white mb-4">
                                        Change Password
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <GlassInput
                                                label="Current Password"
                                                type={showCurrentPassword ? 'text' : 'password'}
                                                value={securityData.currentPassword}
                                                onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                                                icon={<Lock className="w-4 h-4" />}
                                                placeholder="Enter current password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute cursor-pointer right-3 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            >
                                                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>

                                        <div className="relative">
                                            <GlassInput
                                                label="New Password"
                                                type={showNewPassword ? 'text' : 'password'}
                                                value={securityData.newPassword}
                                                onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                                                icon={<Lock className="w-4 h-4" />}
                                                placeholder="Enter new password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute cursor-pointer right-3 top-9 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                            >
                                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>

                                        <GlassInput
                                            label="Confirm New Password"
                                            type="password"
                                            value={securityData.confirmPassword}
                                            onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                                            icon={<Lock className="w-4 h-4" />}
                                            placeholder="Confirm new password"
                                        />

                                        <GlassButton
                                            variant="primary"
                                            onClick={handleChangePassword}
                                        >
                                            Update Password
                                        </GlassButton>
                                    </div>
                                </div>

                                {/* Two-Factor Authentication */}
                                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-sm text-slate-900 dark:text-white mb-1">
                                                Two-Factor Authentication
                                            </h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                        <StatusBadge variant="warning">Disabled</StatusBadge>
                                    </div>
                                    <GlassButton>
                                        <Shield className="w-4 h-4 mr-2" />
                                        Enable 2FA
                                    </GlassButton>
                                </div>
                            </div>
                        </GlassCard>
                    )}

                    {/* Notifications Section */}
                    {activeSection === 'notifications' && (
                        <GlassCard className="p-6">
                            <h2 className="text-xl text-slate-900 dark:text-white mb-6">
                                Notification Preferences
                            </h2>

                            <div className="space-y-6">
                                {/* Notification Channels */}
                                <div>
                                    <h3 className="text-sm text-slate-900 dark:text-white mb-4">
                                        Notification Channels
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
                                            { key: 'smsNotifications', label: 'SMS Notifications', icon: Phone },
                                            { key: 'whatsappNotifications', label: 'WhatsApp Notifications', icon: Phone },
                                            { key: 'pushNotifications', label: 'Push Notifications', icon: Bell },
                                        ].map((channel) => {
                                            const Icon = channel.icon;
                                            const isEnabled = notificationPrefs[channel.key as keyof typeof notificationPrefs];

                                            return (
                                                <div
                                                    key={channel.key}
                                                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                                        <span className="text-sm text-slate-900 dark:text-white">
                                                            {channel.label}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            setNotificationPrefs({
                                                                ...notificationPrefs,
                                                                [channel.key]: !isEnabled,
                                                            })
                                                        }
                                                        className={`w-12 h-6 rounded-full transition-colors ${isEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                                                            }`}
                                                    >
                                                        <div
                                                            className={`w-5 h-5 rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                                                }`}
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Notification Types */}
                                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <h3 className="text-sm text-slate-900 dark:text-white mb-4">
                                        Notification Types
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { key: 'paymentReminders', label: 'Payment Reminders' },
                                            { key: 'eventUpdates', label: 'Event Updates' },
                                            { key: 'newsAnnouncements', label: 'News & Announcements' },
                                        ].map((type) => {
                                            const isEnabled = notificationPrefs[type.key as keyof typeof notificationPrefs];

                                            return (
                                                <div
                                                    key={type.key}
                                                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800"
                                                >
                                                    <span className="text-sm text-slate-900 dark:text-white">
                                                        {type.label}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            setNotificationPrefs({
                                                                ...notificationPrefs,
                                                                [type.key]: !isEnabled,
                                                            })
                                                        }
                                                        className={`w-12 h-6 rounded-full transition-colors ${isEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                                                            }`}
                                                    >
                                                        <div
                                                            className={`w-5 h-5 rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                                                }`}
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <GlassButton
                                        variant="primary"
                                        onClick={handleSaveNotifications}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Preferences
                                    </GlassButton>
                                </div>
                            </div>
                        </GlassCard>
                    )}

                    {/* Payment Section */}
                    {activeSection === 'payment' && (
                        <GlassCard className="p-6">
                            <h2 className="text-xl text-slate-900 dark:text-white mb-6">
                                Payment Preferences
                            </h2>

                            <div className="space-y-6">
                                {/* Auto-Pay */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                                    <div>
                                        <h3 className="text-sm text-slate-900 dark:text-white mb-1">
                                            Auto-Pay
                                        </h3>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">
                                            Automatically pay monthly dues on the due date
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setPaymentPrefs({
                                                ...paymentPrefs,
                                                autoPayEnabled: !paymentPrefs.autoPayEnabled,
                                            })
                                        }
                                        className={`w-12 h-6 rounded-full transition-colors ${paymentPrefs.autoPayEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                                            }`}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full bg-white transition-transform ${paymentPrefs.autoPayEnabled ? 'translate-x-6' : 'translate-x-0.5'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Default Payment Method */}
                                <div>
                                    <label className="text-sm text-slate-900 dark:text-white mb-3 block">
                                        Default Payment Method
                                    </label>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'upi', label: 'UPI' },
                                            { value: 'card', label: 'Credit/Debit Card' },
                                            { value: 'netbanking', label: 'Net Banking' },
                                        ].map((method) => (
                                            <label
                                                key={method.value}
                                                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${paymentPrefs.defaultPaymentMethod === method.value
                                                    ? 'bg-blue-500/20 border border-blue-500/50'
                                                    : 'bg-slate-50 dark:bg-slate-800 border border-transparent'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={method.value}
                                                    checked={paymentPrefs.defaultPaymentMethod === method.value}
                                                    onChange={(e) =>
                                                        setPaymentPrefs({
                                                            ...paymentPrefs,
                                                            defaultPaymentMethod: e.target.value,
                                                        })
                                                    }
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm text-slate-900 dark:text-white">
                                                    {method.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Reminder Days */}
                                <div>
                                    <GlassSelect
                                        label='Payment Reminder (days before due date)'
                                        value={paymentPrefs.reminderDays}
                                        onValueChange={(value) =>
                                            setPaymentPrefs({
                                                ...paymentPrefs,
                                                reminderDays: parseInt(value),
                                            })
                                        }
                                        icon={Calendar}
                                        options={[
                                            { value: '1', label: '1 day before' },
                                            { value: '3', label: '3 day before' },
                                            { value: '5', label: '5 day before' },
                                            { value: '7', label: '7 day before' },
                                            { value: '10', label: '10 day before' },
                                        ]}
                                    />
                                </div>

                                <div className="pt-4">
                                    <GlassButton
                                        variant="primary"
                                        onClick={handleSavePayment}
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Preferences
                                    </GlassButton>
                                </div>
                            </div>
                        </GlassCard>
                    )}
                </div>
            </div>
        </div>
    );
}
