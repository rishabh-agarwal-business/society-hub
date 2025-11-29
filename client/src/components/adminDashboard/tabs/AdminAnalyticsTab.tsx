import { useState, useEffect } from 'react';
import {
    TrendingUp, Calendar, DollarSign
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassSelect } from '../../common/GlassSelect';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { User } from '../../../types';
import { authService } from '../../services/authService';

interface AdminAnalyticsTabProps {
    user: User;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Admin Analytics Tab Component
 * Advanced analytics and reporting for society management
 */
export function AdminAnalyticsTab({ user }: AdminAnalyticsTabProps) {
    const { isDarkMode } = useTheme();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [payments, setPayments] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        if (user.societyId) {
            const paymentsData = authService.getPaymentsBySociety(user.societyId);
            const membersData = authService.getMembersBySociety(user.societyId);
            setPayments(paymentsData);
            setMembers(membersData);
        }
    };

    // Monthly revenue data
    const monthlyRevenueData = MONTHS.map(month => ({
        month: month.substring(0, 3),
        revenue: payments
            .filter(p => p.month === month && p.year === selectedYear && p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0)
    }));

    // Year-over-year comparison
    const yearComparisonData = MONTHS.map(month => ({
        month: month.substring(0, 3),
        current: payments
            .filter(p => p.month === month && p.year === selectedYear && p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0),
        previous: payments
            .filter(p => p.month === month && p.year === selectedYear - 1 && p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0)
    }));

    // Collection rate over time
    const collectionRateData = MONTHS.map(month => {
        const monthPayments = payments.filter(p => p.month === month && p.year === selectedYear);
        const paidCount = monthPayments.filter(p => p.status === 'paid').length;
        const totalMembers = members.filter(m => m.hasAccount).length;
        return {
            month: month.substring(0, 3),
            rate: totalMembers > 0 ? Math.round((paidCount / totalMembers) * 100) : 0
        };
    });

    // Calculate statistics
    const currentYearRevenue = payments
        .filter(p => p.year === selectedYear && p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0);

    const previousYearRevenue = payments
        .filter(p => p.year === selectedYear - 1 && p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0);

    const growthRate = previousYearRevenue > 0
        ? ((currentYearRevenue - previousYearRevenue) / previousYearRevenue) * 100
        : 0;

    const averageMonthlyRevenue = currentYearRevenue / 12;

    const currentMonthRevenue = payments
        .filter(p => {
            const currentMonth = new Date().toLocaleString('default', { month: 'long' });
            return p.month === currentMonth && p.year === selectedYear && p.status === 'paid';
        })
        .reduce((sum, p) => sum + p.amount, 0);

    const years = [2023, 2024, 2025, 2026];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                        Analytics & Reports
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Detailed insights into society financials
                    </p>
                </div>
                <GlassSelect
                    label="Year"
                    value={selectedYear.toString()}
                    icon={Calendar}
                    onValueChange={(e: any) => setSelectedYear(parseInt(e.target.value))}
                    options={years.map(year => ({ value: year, label: year.toString() }))}
                />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <GlassCard className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Annual Revenue</p>
                        <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-2xl text-slate-900 dark:text-white mb-1">
                        ₹{currentYearRevenue.toLocaleString()}
                    </p>
                    <p className={`text-xs ${growthRate >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}% vs last year
                    </p>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Avg Monthly</p>
                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-2xl text-slate-900 dark:text-white">
                        ₹{averageMonthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">This Month</p>
                        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-2xl text-slate-900 dark:text-white">
                        ₹{currentMonthRevenue.toLocaleString()}
                    </p>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Active Members</p>
                        <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-2xl text-slate-900 dark:text-white">
                        {members.filter(m => m.hasAccount).length}
                    </p>
                </GlassCard>
            </div>

            {/* Revenue Trend */}
            <GlassCard className="p-4 md:p-6">
                <h3 className="text-lg text-slate-900 dark:text-white mb-4">
                    Revenue Trend ({selectedYear})
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#ffffff20' : '#00000020'} />
                        <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#475569'} />
                        <YAxis stroke={isDarkMode ? '#94a3b8' : '#475569'} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                                border: `1px solid ${isDarkMode ? '#ffffff20' : '#e2e8f0'}`,
                                borderRadius: '12px',
                                color: isDarkMode ? '#ffffff' : '#1e293b'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#8b5cf6"
                            fill="#8b5cf6"
                            fillOpacity={0.3}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </GlassCard>

            {/* Year-over-Year Comparison */}
            <GlassCard className="p-4 md:p-6">
                <h3 className="text-lg text-slate-900 dark:text-white mb-4">
                    Year-over-Year Comparison
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={yearComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#ffffff20' : '#00000020'} />
                        <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#475569'} />
                        <YAxis stroke={isDarkMode ? '#94a3b8' : '#475569'} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                                border: `1px solid ${isDarkMode ? '#ffffff20' : '#e2e8f0'}`,
                                borderRadius: '12px',
                                color: isDarkMode ? '#ffffff' : '#1e293b'
                            }}
                        />
                        <Legend />
                        <Bar dataKey="current" fill="#3b82f6" name={selectedYear.toString()} radius={[8, 8, 0, 0]} />
                        <Bar dataKey="previous" fill="#94a3b8" name={(selectedYear - 1).toString()} radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </GlassCard>

            {/* Collection Rate Trend */}
            <GlassCard className="p-4 md:p-6">
                <h3 className="text-lg text-slate-900 dark:text-white mb-4">
                    Collection Rate Trend ({selectedYear})
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={collectionRateData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#ffffff20' : '#00000020'} />
                        <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#475569'} />
                        <YAxis stroke={isDarkMode ? '#94a3b8' : '#475569'} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                                border: `1px solid ${isDarkMode ? '#ffffff20' : '#e2e8f0'}`,
                                borderRadius: '12px',
                                color: isDarkMode ? '#ffffff' : '#1e293b'
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="Collection Rate (%)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </GlassCard>
        </div>
    );
}
