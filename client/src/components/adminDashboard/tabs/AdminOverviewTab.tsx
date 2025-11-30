import { useState, useEffect } from 'react';
import {
    Building2, Users, DollarSign, Calendar,
    CheckCircle2, UserX, TrendingUp, Filter, Search
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { StatsCard } from '../../common/StatsCard';
import { GlassSelect } from '../../common/GlassSelect';
import { GlassInput } from '../../common/GlassInput';
import { GlassButton } from '../../common/GlassButton';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import { User } from '../../../types';
import { authService } from '../../services/authService';

interface AdminOverviewTabProps {
    user: User;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Admin Overview Tab Component
 * Shows high-level statistics and charts for society management
 */
export function AdminOverviewTab({ user }: AdminOverviewTabProps) {
    const { isDarkMode } = useTheme();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [society, setSociety] = useState<any>(null);
    const [members, setMembers] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        if (user.societyId) {
            const societyData = authService.getSocietyById(user.societyId);
            const membersData = authService.getMembersBySociety(user.societyId);
            const eventsData = authService.getEventsBySociety(user.societyId);
            const paymentsData = authService.getPaymentsBySociety(user.societyId);

            setSociety(societyData);
            setMembers(membersData);
            setEvents(eventsData);
            setPayments(paymentsData);
        }
    };

    // Calculate statistics
    const stats = {
        totalMembers: members.length,
        membersWithAccounts: members.filter(m => m.hasAccount).length,
        membersWithoutAccounts: members.filter(m => !m.hasAccount).length,
        totalUnits: society?.totalUnits || 0,
        totalRevenue: payments
            .filter(p => p.year === selectedYear && p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0),
        upcomingEvents: events.filter(e => new Date(e.date) >= new Date()).length,
    };

    // Monthly revenue data for chart
    const monthlyRevenueData = MONTHS.map(month => ({
        month: month.substring(0, 3),
        revenue: payments
            .filter(p => p.month === month && p.year === selectedYear && p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0)
    }));

    // Payment status distribution
    const yearPayments = payments.filter(p => p.year === selectedYear);
    const paidMembers = new Set(yearPayments.filter(p => p.status === 'paid').map(p => p.userId)).size;
    const totalActiveMembers = members.filter(m => m.hasAccount).length;
    const pendingMembers = totalActiveMembers - paidMembers;

    const paymentStatusData = [
        { name: 'Paid', value: paidMembers, color: '#10b981' },
        { name: 'Pending', value: pendingMembers, color: '#f59e0b' },
    ];

    const years = [2023, 2024, 2025, 2026];

    // Filter members based on search
    const filteredMembers = members.filter(m =>
        searchTerm === '' ||
        m.houseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter payments based on month
    const filteredPayments = selectedMonth === 'all'
        ? payments.filter(p => p.year === selectedYear)
        : payments.filter(p => p.year === selectedYear && p.month === selectedMonth);

    if (!society) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                        Welcome, Society Admin!
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Please register your society to get started
                    </p>
                </div>
                <GlassCard className="p-6 text-center">
                    <Building2 className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl mb-2 text-slate-900 dark:text-white">
                        No Society Registered
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Contact support to register your society
                    </p>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                        {society.name}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Society Management Dashboard
                    </p>
                </div>
            </div>

            {/* Filters */}
            <GlassCard className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <h2 className="text-lg text-slate-900 dark:text-white">Filters</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* <GlassInput
                        label="Search Members"
                        placeholder="Search by name or house..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                    /> */}

                    <GlassSelect
                        label="Year"
                        value={selectedYear.toString()}
                        icon={Calendar}
                        onValueChange={(value) => setSelectedYear(parseInt(value))}
                        options={years.map(year => ({ value: year, label: year.toString() }))}
                    />

                    <GlassSelect
                        label="Month"
                        value={selectedMonth}
                        icon={Filter}
                        onValueChange={(value) => setSelectedMonth(value)}
                        options={[
                            { value: 'all', label: 'All Months' },
                            ...MONTHS.map(month => ({ value: month, label: month }))
                        ]}
                    />

                    <div className="flex items-end">
                        <GlassButton
                            variant="outline"
                            className="glass-button"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedMonth('all');
                            }}
                        >
                            Clear Filters
                        </GlassButton>
                    </div>
                </div>
            </GlassCard>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatsCard
                    title="Total Units"
                    value={stats.totalUnits.toString()}
                    icon={Building2}
                    iconColor="text-blue-600 dark:text-blue-400"
                />
                <StatsCard
                    title="Total Members"
                    value={stats.totalMembers.toString()}
                    icon={Users}
                    iconColor="text-green-600 dark:text-green-400"
                />
                <StatsCard
                    title="Active Accounts"
                    value={stats.membersWithAccounts.toString()}
                    icon={CheckCircle2}
                    iconColor="text-purple-600 dark:text-purple-400"
                />
                <StatsCard
                    title={`Revenue (${selectedYear})`}
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    iconColor="text-emerald-600 dark:text-emerald-400"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Revenue Chart */}
                <GlassCard className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl text-slate-900 dark:text-white mb-4">
                        Monthly Revenue ({selectedYear})
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyRevenueData}>
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
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </GlassCard>

                {/* Payment Status Chart */}
                <GlassCard className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl text-slate-900 dark:text-white mb-4">
                        Payment Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={paymentStatusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {paymentStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                                    border: `1px solid ${isDarkMode ? '#ffffff20' : '#e2e8f0'}`,
                                    borderRadius: '12px',
                                    color: isDarkMode ? '#ffffff' : '#1e293b'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </GlassCard>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassCard className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Members Without Account</p>
                            <p className="text-2xl text-slate-900 dark:text-white">{stats.membersWithoutAccounts}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                            <UserX className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Upcoming Events</p>
                            <p className="text-2xl text-slate-900 dark:text-white">{stats.upcomingEvents}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Collection Rate</p>
                            <p className="text-2xl text-slate-900 dark:text-white">
                                {totalActiveMembers > 0 ? Math.round((paidMembers / totalActiveMembers) * 100) : 0}%
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
