import {
    CreditCard, CheckCircle2, XCircle, Clock,
    Calendar, TrendingUp, Users
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { StatsCard } from '../../common/StatsCard';
import { StatusBadge } from '../../common/StatusBadge';
import { GlassButton } from '../../common/GlassButton';
import { User } from '../../../types';
import { usePayments } from '../../../hooks/usePayments';

interface OverviewTabProps {
    user: User;
}

/**
 * Overview Tab Component
 * Shows summary of user's payment status and upcoming events
 */
export function OverviewTab({ user }: OverviewTabProps) {
    const { payments, stats } = usePayments(undefined, user.id);

    // Mock data for events - in real app, would come from useEvents hook
    const upcomingEvents = [
        { id: 1, title: 'Annual Diwali Celebration', date: '2025-11-25', type: 'event' as const },
        { id: 2, title: 'Society General Meeting', date: '2025-12-01', type: 'meeting' as const },
        { id: 3, title: 'Christmas Party', date: '2025-12-24', type: 'event' as const },
    ];

    const upcomingPayment = payments.find(p => p.status === 'pending');

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                    Welcome back, {user.name}!
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Here's your society overview
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatsCard
                    title="Total Paid"
                    value={`₹${stats.totalCollected.toLocaleString()}`}
                    icon={CheckCircle2}
                    iconColor="text-green-600 dark:text-green-400"
                />
                <StatsCard
                    title="Pending"
                    value={`₹${stats.totalPending.toLocaleString()}`}
                    icon={Clock}
                    iconColor="text-yellow-600 dark:text-yellow-400"
                />
                <StatsCard
                    title="On-Time Rate"
                    value={`${Math.round(stats.collectionRate)}%`}
                    icon={TrendingUp}
                    iconColor="text-blue-600 dark:text-blue-400"
                />
                <StatsCard
                    title="This Month"
                    value={upcomingPayment ? `₹${upcomingPayment.amount}` : 'Paid'}
                    icon={CreditCard}
                    iconColor="text-purple-600 dark:text-purple-400"
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Payment */}
                <GlassCard className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg md:text-xl text-slate-900 dark:text-white">
                            Next Payment
                        </h2>
                        <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>

                    {upcomingPayment ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Amount</span>
                                <span className="text-2xl text-slate-900 dark:text-white">
                                    ₹{upcomingPayment.amount.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Month</span>
                                <span className="text-slate-900 dark:text-white">{upcomingPayment.month} {upcomingPayment.year}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Status</span>
                                <StatusBadge variant="warning">Pending</StatusBadge>
                            </div>
                            <GlassButton variant="primary" className="w-full mt-4">
                                Pay Now
                            </GlassButton>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                            <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                            <p>All payments are up to date!</p>
                        </div>
                    )}
                </GlassCard>

                {/* Upcoming Events */}
                <GlassCard className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg md:text-xl text-slate-900 dark:text-white">
                            Upcoming Events
                        </h2>
                        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>

                    <div className="space-y-3">
                        {upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                className="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-900 dark:text-white truncate">
                                            {event.title}
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <StatusBadge
                                        variant={event.type === 'meeting' ? 'info' : 'success'}
                                        size="sm"
                                    >
                                        {event.type}
                                    </StatusBadge>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Recent Activity */}
            <GlassCard className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl text-slate-900 dark:text-white mb-4">
                    Recent Payments
                </h2>
                <div className="space-y-3">
                    {payments
                        .filter(p => p.status === 'paid')
                        .slice(0, 5)
                        .map((payment) => (
                            <div
                                key={payment.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-900 dark:text-white">
                                            {payment.month} {payment.year}
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">
                                            Paid on {payment.paidDate}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm text-slate-900 dark:text-white">
                                    ₹{payment.amount.toLocaleString()}
                                </span>
                            </div>
                        ))}
                </div>
            </GlassCard>
        </div>
    );
}
