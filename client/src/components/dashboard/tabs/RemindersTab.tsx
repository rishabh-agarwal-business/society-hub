import { useState } from 'react';
import {
    Bell, Mail, MessageSquare, Phone, Check,
    Calendar, Clock, Settings, BellRing
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { StatusBadge } from '../../common/StatusBadge';
import { Modal } from '../../common/Modal';
import { User } from '../../../types';
import { GlassSelect } from '../../common/GlassSelect';

interface RemindersTabProps {
    user: User;
}

type ReminderType = 'email' | 'sms' | 'whatsapp' | 'push';

interface Reminder {
    id: number;
    type: ReminderType;
    title: string;
    message: string;
    date: string;
    time: string;
    status: 'sent' | 'scheduled' | 'failed';
    read: boolean;
}

/**
 * Reminders Tab Component
 * Shows payment reminders and notification preferences
 * Supports email, SMS, and WhatsApp notifications
 */
export function RemindersTab({ user }: RemindersTabProps) {
    const [showPreferences, setShowPreferences] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

    // Mock reminder preferences
    const [preferences, setPreferences] = useState({
        email: true,
        sms: true,
        whatsapp: false,
        push: true,
        daysBefore: 5,
    });

    // Mock reminders data
    const [reminders] = useState<Reminder[]>([
        {
            id: 1,
            type: 'email',
            title: 'Payment Reminder - December 2025',
            message: 'Your monthly maintenance payment of ₹5,000 is due in 3 days.',
            date: '2025-12-01',
            time: '09:00 AM',
            status: 'scheduled',
            read: false,
        },
        {
            id: 2,
            type: 'sms',
            title: 'Payment Reminder - December 2025',
            message: 'Payment due: ₹5,000 on Dec 5, 2025',
            date: '2025-12-01',
            time: '09:00 AM',
            status: 'scheduled',
            read: false,
        },
        {
            id: 3,
            type: 'email',
            title: 'Payment Confirmation - November 2025',
            message: 'Thank you! Your payment of ₹5,000 has been received.',
            date: '2025-11-05',
            time: '02:30 PM',
            status: 'sent',
            read: true,
        },
        {
            id: 4,
            type: 'push',
            title: 'Annual General Meeting',
            message: 'Society AGM scheduled for December 15, 2025 at 6:00 PM',
            date: '2025-11-20',
            time: '10:00 AM',
            status: 'sent',
            read: true,
        },
    ]);

    const getTypeIcon = (type: ReminderType) => {
        switch (type) {
            case 'email':
                return Mail;
            case 'sms':
                return MessageSquare;
            case 'whatsapp':
                return Phone;
            case 'push':
                return Bell;
        }
    };

    const getTypeColor = (type: ReminderType) => {
        switch (type) {
            case 'email':
                return 'text-blue-600 dark:text-blue-400 bg-blue-500/20';
            case 'sms':
                return 'text-green-600 dark:text-green-400 bg-green-500/20';
            case 'whatsapp':
                return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/20';
            case 'push':
                return 'text-purple-600 dark:text-purple-400 bg-purple-500/20';
        }
    };

    const unreadCount = reminders.filter(r => !r.read).length;
    const scheduledCount = reminders.filter(r => r.status === 'scheduled').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                        Reminders & Notifications
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Manage your payment reminders and notifications
                    </p>
                </div>
                <GlassButton
                    variant="outline"
                    className='glass-button'
                    onClick={() => setShowPreferences(true)}
                >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                </GlassButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Unread</p>
                            <p className="text-lg text-slate-900 dark:text-white">{unreadCount}</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Scheduled</p>
                            <p className="text-lg text-slate-900 dark:text-white">{scheduledCount}</p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Total</p>
                            <p className="text-lg text-slate-900 dark:text-white">{reminders.length}</p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Reminders List */}
            <GlassCard className="p-4 md:p-6">
                <h2 className="text-lg text-slate-900 dark:text-white mb-4">
                    Recent Reminders
                </h2>

                <div className="space-y-3">
                    {reminders.map((reminder) => {
                        const Icon = getTypeIcon(reminder.type);
                        const colorClass = getTypeColor(reminder.type);

                        return (
                            <div
                                key={reminder.id}
                                className={`p-4 rounded-xl border transition-all cursor-pointer ${reminder.read
                                    ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                                    : 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-800 shadow-sm'
                                    }`}
                                onClick={() => setSelectedReminder(reminder)}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className={`text-sm ${reminder.read
                                                ? 'text-slate-700 dark:text-slate-300'
                                                : 'text-slate-900 dark:text-white'
                                                }`}>
                                                {reminder.title}
                                            </h3>
                                            <StatusBadge
                                                variant={
                                                    reminder.status === 'sent' ? 'success' :
                                                        reminder.status === 'scheduled' ? 'info' :
                                                            'danger'
                                                }
                                                size="sm"
                                            >
                                                {reminder.status}
                                            </StatusBadge>
                                        </div>

                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                                            {reminder.message}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(reminder.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {reminder.time}
                                            </span>
                                            <span className="capitalize">{reminder.type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>

            {/* Notification Preferences Modal */}
            {showPreferences && (
                <Modal
                    isOpen={showPreferences}
                    onClose={() => setShowPreferences(false)}
                    title="Notification Preferences"
                >
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm text-slate-900 dark:text-white mb-3">
                                Notification Channels
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { key: 'email', label: 'Email Notifications', icon: Mail },
                                    { key: 'sms', label: 'SMS Notifications', icon: MessageSquare },
                                    { key: 'whatsapp', label: 'WhatsApp Notifications', icon: Phone },
                                    { key: 'push', label: 'Push Notifications', icon: Bell },
                                ].map((channel) => {
                                    const Icon = channel.icon;
                                    return (
                                        <div
                                            key={channel.key}
                                            className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                                <span className="text-sm text-slate-900 dark:text-white">
                                                    {channel.label}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setPreferences({
                                                        ...preferences,
                                                        [channel.key]: !preferences[channel.key as keyof typeof preferences],
                                                    })
                                                }
                                                className={`w-12 h-6 rounded-full transition-colors ${preferences[channel.key as keyof typeof preferences]
                                                    ? 'bg-blue-600'
                                                    : 'bg-slate-300 dark:bg-slate-600'
                                                    }`}
                                            >
                                                <div
                                                    className={`w-5 h-5 rounded-full bg-white transition-transform ${preferences[channel.key as keyof typeof preferences]
                                                        ? 'translate-x-6'
                                                        : 'translate-x-0.5'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm text-slate-900 dark:text-white mb-3">
                                Reminder Timing
                            </h3>
                            <GlassSelect
                                icon={BellRing}
                                label='Send reminders (days before due date)'
                                placeholder='Select reminders time'
                                onValueChange={
                                    (value) =>
                                        setPreferences({ ...preferences, daysBefore: parseInt(value) })
                                }
                                options={[
                                    { value: 1, label: '1 day before' },
                                    { value: 3, label: '3 day before' },
                                    { value: 5, label: '5 day before' },
                                    { value: 7, label: '7 day before' },
                                    { value: 10, label: '10 day before' },
                                ]}
                            />
                        </div>

                        <GlassButton variant="primary" className="w-full">
                            Save Preferences
                        </GlassButton>
                    </div>
                </Modal>
            )}

            {/* Reminder Detail Modal */}
            {selectedReminder && (
                <Modal
                    isOpen={!!selectedReminder}
                    onClose={() => setSelectedReminder(null)}
                    title="Reminder Details"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            {(() => {
                                const Icon = getTypeIcon(selectedReminder.type);
                                const colorClass = getTypeColor(selectedReminder.type);
                                return (
                                    <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                );
                            })()}
                            <div>
                                <h3 className="text-slate-900 dark:text-white">
                                    {selectedReminder.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                                    {selectedReminder.type} notification
                                </p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                            <p className="text-sm text-slate-900 dark:text-white">
                                {selectedReminder.message}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Date</p>
                                <p className="text-sm text-slate-900 dark:text-white">
                                    {new Date(selectedReminder.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Time</p>
                                <p className="text-sm text-slate-900 dark:text-white">
                                    {selectedReminder.time}
                                </p>
                            </div>
                        </div>

                        <StatusBadge
                            variant={
                                selectedReminder.status === 'sent' ? 'success' :
                                    selectedReminder.status === 'scheduled' ? 'info' :
                                        'danger'
                            }
                        >
                            {selectedReminder.status}
                        </StatusBadge>
                    </div>
                </Modal>
            )}
        </div>
    );
}
