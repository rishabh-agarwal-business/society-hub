import { useState } from 'react';
import {
    BarChart3, TrendingUp, TrendingDown, Calendar,
    DollarSign, PieChart, Download
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Area, AreaChart
} from 'recharts';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { User } from '../../../types';
import { GlassSelect } from '../../common/GlassSelect';

interface AnalyticsTabProps {
    user: User;
}

/**
 * Analytics Tab Component
 * Displays payment trends, expense breakdowns, and year-over-year comparisons
 * Uses Recharts for data visualization
 */
export function AnalyticsTab({ user }: AnalyticsTabProps) {
    const [selectedYear, setSelectedYear] = useState('2025');
    const [comparisonYear, setComparisonYear] = useState('2024');

    // Mock data for payment trends
    const paymentTrends = [
        { month: 'Jan', paid: 5000, pending: 0, year2024: 4800 },
        { month: 'Feb', paid: 5000, pending: 0, year2024: 5000 },
        { month: 'Mar', paid: 5000, pending: 0, year2024: 4800 },
        { month: 'Apr', paid: 5000, pending: 0, year2024: 5200 },
        { month: 'May', paid: 5000, pending: 0, year2024: 5000 },
        { month: 'Jun', paid: 5000, pending: 0, year2024: 5000 },
        { month: 'Jul', paid: 5000, pending: 0, year2024: 4900 },
        { month: 'Aug', paid: 5000, pending: 0, year2024: 5100 },
        { month: 'Sep', paid: 5000, pending: 0, year2024: 5000 },
        { month: 'Oct', paid: 5000, pending: 0, year2024: 5200 },
        { month: 'Nov', paid: 5000, pending: 0, year2024: 5000 },
        { month: 'Dec', paid: 0, pending: 5000, year2024: 5000 },
    ];

    // Mock data for expense breakdown
    const expenseBreakdown = [
        { name: 'Maintenance', value: 2500, color: '#3b82f6' },
        { name: 'Water', value: 800, color: '#06b6d4' },
        { name: 'Electricity', value: 1200, color: '#f59e0b' },
        { name: 'Security', value: 300, color: '#8b5cf6' },
        { name: 'Others', value: 200, color: '#ec4899' },
    ];

    // Mock data for yearly comparison
    const yearlyComparison = [
        { year: '2023', total: 58000, avgMonthly: 4833 },
        { year: '2024', total: 60000, avgMonthly: 5000 },
        { year: '2025', total: 55000, avgMonthly: 5000 },
    ];

    // Calculate total and average
    const totalPaid2025 = paymentTrends.reduce((sum, month) => sum + month.paid, 0);
    const totalPaid2024 = paymentTrends.reduce((sum, month) => sum + month.year2024, 0);
    const percentageChange = ((totalPaid2025 - totalPaid2024) / totalPaid2024) * 100;

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-900 dark:text-white mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-xs" style={{ color: entry.color }}>
                            {entry.name}: ₹{entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                        Analytics & Insights
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Track your payment trends and expenses
                    </p>
                </div>
                <GlassButton variant="outline" className='glass-button'>
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </GlassButton>
            </div>

            {/* Year Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassSelect
                    label="Year"
                    value={selectedYear}
                    onValueChange={(value) => setSelectedYear(value)}
                    icon={Calendar}
                    options={[
                        { value: "2023", label: "2023" },
                        { value: "2024", label: "2024" },
                        { value: "2025", label: "2025" },
                        { value: "2026", label: "2026" },
                    ]}
                />

                <GlassSelect
                    label="Compare With"
                    value={comparisonYear}
                    onValueChange={(value) => setComparisonYear(value)}
                    icon={Calendar}
                    options={[
                        { value: "2023", label: "2023" },
                        { value: "2024", label: "2024" },
                        { value: "2025", label: "2025" },
                    ]}
                />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-slate-600 dark:text-slate-400">Total Paid {selectedYear}</p>
                            <p className="text-lg text-slate-900 dark:text-white">
                                ₹{totalPaid2025.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl ${percentageChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                            } flex items-center justify-center`}>
                            {percentageChange >= 0 ? (
                                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                            ) : (
                                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-slate-600 dark:text-slate-400">YoY Change</p>
                            <p className={`text-lg ${percentageChange >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                                }`}>
                                {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-slate-600 dark:text-slate-400">Avg Monthly</p>
                            <p className="text-lg text-slate-900 dark:text-white">
                                ₹{Math.round(totalPaid2025 / 12).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                            <PieChart className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-slate-600 dark:text-slate-400">Payment Rate</p>
                            <p className="text-lg text-slate-900 dark:text-white">
                                {Math.round((11 / 12) * 100)}%
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Payment Trends Chart */}
            <GlassCard className="p-4 md:p-6">
                <h2 className="text-lg text-slate-900 dark:text-white mb-4">
                    Payment Trends
                </h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={paymentTrends}>
                            <defs>
                                <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorYear" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                            <XAxis
                                dataKey="month"
                                stroke="#64748b"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#64748b"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => `₹${value / 1000}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="paid"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorPaid)"
                                name={`${selectedYear} Paid`}
                            />
                            <Area
                                type="monotone"
                                dataKey="year2024"
                                stroke="#8b5cf6"
                                fillOpacity={1}
                                fill="url(#colorYear)"
                                name={`${comparisonYear} Paid`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expense Breakdown */}
                <GlassCard className="p-4 md:p-6">
                    <h2 className="text-lg text-slate-900 dark:text-white mb-4">
                        Expense Breakdown
                    </h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={expenseBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        percent !== undefined
                                            ? `${name} ${(percent * 100).toFixed(0)}%`
                                            : `${name} 0%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {expenseBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </RechartsPie>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {expenseBreakdown.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-xs text-slate-600 dark:text-slate-400">
                                    {item.name}: ₹{item.value.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Yearly Comparison */}
                <GlassCard className="p-4 md:p-6">
                    <h2 className="text-lg text-slate-900 dark:text-white mb-4">
                        Year-over-Year Comparison
                    </h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={yearlyComparison}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                                <XAxis
                                    dataKey="year"
                                    stroke="#64748b"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    style={{ fontSize: '12px' }}
                                    tickFormatter={(value) => `₹${value / 1000}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar
                                    dataKey="total"
                                    fill="#3b82f6"
                                    name="Total Paid"
                                    radius={[8, 8, 0, 0]}
                                />
                                <Bar
                                    dataKey="avgMonthly"
                                    fill="#8b5cf6"
                                    name="Avg Monthly"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>

            {/* Payment Status by Month */}
            <GlassCard className="p-4 md:p-6">
                <h2 className="text-lg text-slate-900 dark:text-white mb-4">
                    Monthly Payment Status
                </h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={paymentTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                            <XAxis
                                dataKey="month"
                                stroke="#64748b"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#64748b"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => `₹${value / 1000}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="paid"
                                fill="#10b981"
                                name="Paid"
                                radius={[8, 8, 0, 0]}
                            />
                            <Bar
                                dataKey="pending"
                                fill="#f59e0b"
                                name="Pending"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </GlassCard>

            {/* Insights */}
            <GlassCard className="p-4 md:p-6">
                <h2 className="text-lg text-slate-900 dark:text-white mb-4">
                    Key Insights
                </h2>
                <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="flex items-start gap-3">
                            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-900 dark:text-white mb-1">
                                    Excellent Payment History
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    You've maintained a 92% on-time payment rate this year
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-start gap-3">
                            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-900 dark:text-white mb-1">
                                    Consistent Monthly Spending
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Your average monthly payment is ₹{Math.round(totalPaid2025 / 12).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <div className="flex items-start gap-3">
                            <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-slate-900 dark:text-white mb-1">
                                    Largest Expense Category
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Maintenance charges account for 50% of your total expenses
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
