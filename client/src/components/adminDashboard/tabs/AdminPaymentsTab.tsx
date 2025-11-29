import { useState, useEffect, useMemo } from 'react';
import {
    Search, Filter, Calendar, CheckCircle2, Clock, XCircle
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { GlassInput } from '../../common/GlassInput';
import { GlassSelect } from '../../common/GlassSelect';
import { StatusBadge } from '../../common/StatusBadge';
import { Modal } from '../../common/Modal';
import { User } from '../../../types';
import { authService } from '../../services/authService';

interface AdminPaymentsTabProps {
    user: User;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Admin Payments Tab Component
 * View and manage all society payments
 */
export function AdminPaymentsTab({ user }: AdminPaymentsTabProps) {
    const [members, setMembers] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [paymentAmount, setPaymentAmount] = useState('5000');
    const [paymentMonth, setPaymentMonth] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        if (user.societyId) {
            const membersData = authService.getMembersBySociety(user.societyId);
            const paymentsData = authService.getPaymentsBySociety(user.societyId);
            setMembers(membersData);
            setPayments(paymentsData);
        }
    };

    // Get payment records with member info
    const getPaymentRecords = () => {
        return members.map(member => {
            const memberPayments = payments.filter(p => p.userId === member.userId);
            const yearPayments = memberPayments.filter(p => p.year === selectedYear);
            const paidCount = yearPayments.filter(p => p.status === 'paid').length;
            const totalPaid = yearPayments
                .filter(p => p.status === 'paid')
                .reduce((sum, p) => sum + p.amount, 0);

            // Monthly status
            const monthlyStatus: Record<string, 'paid' | 'pending'> = {};
            MONTHS.forEach(month => {
                const payment = yearPayments.find(p => p.month === month);
                monthlyStatus[month] = payment?.status === 'paid' ? 'paid' : 'pending';
            });

            return {
                ...member,
                paymentsCount: paidCount,
                totalPaid,
                monthlyStatus,
                lastPayment: memberPayments.length > 0
                    ? memberPayments.sort((a, b) =>
                        new Date(b.paidDate || '').getTime() - new Date(a.paidDate || '').getTime()
                    )[0]?.paidDate || '-'
                    : '-',
            };
        });
    };

    const paymentRecords = useMemo(() => getPaymentRecords(), [members, payments, selectedYear]);

    // Filtered records
    const filteredRecords = useMemo(() => {
        let filtered = paymentRecords;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(r =>
                r.houseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Month filter - show only records with specific month status
        if (selectedMonth !== 'all') {
            if (selectedStatus === 'all') {
                // No additional filter, show all for that month
            } else if (selectedStatus === 'paid') {
                filtered = filtered.filter(r => r.monthlyStatus[selectedMonth] === 'paid');
            } else if (selectedStatus === 'pending') {
                filtered = filtered.filter(r => r.monthlyStatus[selectedMonth] === 'pending' && r.hasAccount);
            }
        } else if (selectedStatus !== 'all') {
            // Filter by overall payment status
            if (selectedStatus === 'paid') {
                filtered = filtered.filter(r => r.paymentsCount > 0);
            } else if (selectedStatus === 'pending') {
                filtered = filtered.filter(r => r.paymentsCount === 0 && r.hasAccount);
            }
        }

        return filtered;
    }, [paymentRecords, searchTerm, selectedMonth, selectedStatus]);

    // Calculate stats
    const stats = {
        totalCollected: payments
            .filter(p => p.year === selectedYear && p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0),
        totalPending: members.filter(m => m.hasAccount).length * 12 * 5000 -
            payments.filter(p => p.year === selectedYear && p.status === 'paid')
                .reduce((sum, p) => sum + p.amount, 0),
        totalPayments: payments.filter(p => p.year === selectedYear).length,
    };

    const handleUpdatePayment = (member: any, month: string) => {
        setSelectedMember(member);
        setPaymentMonth(month);
        setShowPaymentModal(true);
    };

    const handleSubmitPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMember || !selectedMember.userId) {
            setError('Invalid member selected');
            return;
        }

        try {
            const currentStatus = selectedMember.monthlyStatus[paymentMonth];
            const newStatus = currentStatus === 'paid' ? 'pending' : 'paid';

            authService.updatePayment(
                selectedMember.userId,
                paymentMonth,
                selectedYear,
                parseInt(paymentAmount),
                newStatus
            );

            setSuccess(`Payment ${newStatus === 'paid' ? 'marked as paid' : 'marked as pending'} successfully!`);
            setShowPaymentModal(false);
            loadData();
        } catch (err: any) {
            setError(err.message || 'Failed to update payment');
        }
    };

    const years = [2023, 2024, 2025, 2026];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                    Payment Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Track and manage society payments
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Total Collected</p>
                            <p className="text-lg text-slate-900 dark:text-white">
                                ₹{stats.totalCollected.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Pending</p>
                            <p className="text-lg text-slate-900 dark:text-white">
                                ₹{stats.totalPending.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Total Payments</p>
                            <p className="text-lg text-slate-900 dark:text-white">
                                {stats.totalPayments}
                            </p>
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* Filters */}
            <GlassCard className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <h2 className="text-lg text-slate-900 dark:text-white">Filters</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <GlassInput
                        label="Search"
                        placeholder="Search by name or house..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search className='h-4 w-4' />}
                    />

                    <GlassSelect
                        label="Year"
                        value={selectedYear.toString()}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        icon={Calendar}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </GlassSelect>

                    <GlassSelect
                        label="Month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="all">All Months</option>
                        {MONTHS.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </GlassSelect>

                    <GlassSelect
                        label="Status"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        icon={Filter}
                    >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                    </GlassSelect>

                    <div className="flex items-end">
                        <GlassButton
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedMonth('all');
                                setSelectedStatus('all');
                            }}
                        >
                            Clear Filters
                        </GlassButton>
                    </div>
                </div>
            </GlassCard>

            {/* Payments Table */}
            <GlassCard className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg text-slate-900 dark:text-white">
                        Payment Records
                    </h2>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {filteredRecords.length} records
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">House</th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">Owner</th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">Paid Count</th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">Total Paid</th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record) => (
                                <tr
                                    key={record.id}
                                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                                >
                                    <td className="p-3 text-slate-900 dark:text-white">{record.houseNumber}</td>
                                    <td className="p-3 text-slate-900 dark:text-white">{record.ownerName}</td>
                                    <td className="p-3 text-slate-600 dark:text-slate-400">{record.paymentsCount}/12</td>
                                    <td className="p-3 text-slate-900 dark:text-white">₹{record.totalPaid.toLocaleString()}</td>
                                    <td className="p-3">
                                        <div className="flex flex-wrap gap-1">
                                            {selectedMonth !== 'all' && record.hasAccount ? (
                                                <GlassButton
                                                    variant={record.monthlyStatus[selectedMonth] === 'paid' ? 'success' : 'warning'}
                                                    size="sm"
                                                    onClick={() => handleUpdatePayment(record, selectedMonth)}
                                                >
                                                    {record.monthlyStatus[selectedMonth] === 'paid' ? (
                                                        <>
                                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                                            Paid
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            Mark Paid
                                                        </>
                                                    )}
                                                </GlassButton>
                                            ) : record.hasAccount ? (
                                                <StatusBadge variant={record.paymentsCount > 0 ? 'success' : 'warning'} size="sm">
                                                    {record.paymentsCount > 0 ? 'Active' : 'Pending'}
                                                </StatusBadge>
                                            ) : (
                                                <StatusBadge variant="danger" size="sm">No Account</StatusBadge>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredRecords.length === 0 && (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                            No payment records found
                        </div>
                    )}
                </div>
            </GlassCard>

            {/* Payment Modal */}
            {showPaymentModal && selectedMember && (
                <Modal
                    isOpen={showPaymentModal}
                    onClose={() => {
                        setShowPaymentModal(false);
                        setSelectedMember(null);
                    }}
                    title={`Update Payment - ${selectedMember.ownerName}`}
                >
                    <form onSubmit={handleSubmitPayment} className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-600 dark:text-slate-400">House</span>
                                <span className="text-slate-900 dark:text-white">{selectedMember.houseNumber}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Month</span>
                                <span className="text-slate-900 dark:text-white">{paymentMonth} {selectedYear}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Current Status</span>
                                <StatusBadge variant={selectedMember.monthlyStatus[paymentMonth] === 'paid' ? 'success' : 'warning'}>
                                    {selectedMember.monthlyStatus[paymentMonth]}
                                </StatusBadge>
                            </div>
                        </div>

                        <GlassInput
                            label="Amount"
                            type="number"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            required
                        />

                        <div className="flex gap-2 pt-4">
                            <GlassButton type="submit" variant="primary" className="flex-1">
                                {selectedMember.monthlyStatus[paymentMonth] === 'paid' ? 'Mark as Pending' : 'Mark as Paid'}
                            </GlassButton>
                            <GlassButton
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowPaymentModal(false)}
                            >
                                Cancel
                            </GlassButton>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}
