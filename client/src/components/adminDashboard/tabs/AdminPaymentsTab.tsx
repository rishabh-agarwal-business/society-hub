import { useState, useEffect, useMemo } from 'react';
import {
    Search, Filter, Calendar, CheckCircle2, Clock, XCircle, Edit2, IndianRupee
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
 * Monthly grid view where admin can update any member's payment for any month
 */
export function AdminPaymentsTab({ user }: AdminPaymentsTabProps) {
    const [members, setMembers] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [paymentAmount, setPaymentAmount] = useState('5000');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, [selectedYear]);

    const loadData = () => {
        if (user.societyId) {
            const membersData = authService.getMembersBySociety(user.societyId);
            const paymentsData = authService.getPaymentsBySociety(user.societyId);
            setMembers(membersData);
            setPayments(paymentsData);
        }
    };

    // Build payment records with monthly status
    const paymentRecords = useMemo(() => {
        return members.map(member => {
            const memberPayments = payments.filter(p => p.userId === member.userId);
            const yearPayments = memberPayments.filter(p => p.year === selectedYear);

            // Monthly status for each month
            const monthlyStatus: Record<string, { status: 'paid' | 'pending'; amount: number; paymentId?: string }> = {};
            MONTHS.forEach(month => {
                const payment = yearPayments.find(p => p.month === month);
                monthlyStatus[month] = {
                    status: payment?.status === 'paid' ? 'paid' : 'pending',
                    amount: payment?.amount || 5000,
                    paymentId: payment?.id
                };
            });

            const paidCount = yearPayments.filter(p => p.status === 'paid').length;
            const totalPaid = yearPayments
                .filter(p => p.status === 'paid')
                .reduce((sum, p) => sum + p.amount, 0);

            return {
                ...member,
                monthlyStatus,
                paidCount,
                totalPaid,
                pendingCount: 12 - paidCount,
            };
        });
    }, [members, payments, selectedYear]);

    // Filter records
    const filteredRecords = useMemo(() => {
        let filtered = paymentRecords;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(r =>
                r.houseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (filterStatus === 'paid') {
            filtered = filtered.filter(r => r.paidCount === 12);
        } else if (filterStatus === 'pending') {
            filtered = filtered.filter(r => r.paidCount < 12 && r.hasAccount);
        } else if (filterStatus === 'partial') {
            filtered = filtered.filter(r => r.paidCount > 0 && r.paidCount < 12);
        }

        return filtered;
    }, [paymentRecords, searchTerm, filterStatus]);

    // Calculate stats
    const stats = {
        totalCollected: payments
            .filter(p => p.year === selectedYear && p.status === 'paid')
            .reduce((sum, p) => sum + p.amount, 0),
        totalPending: members.filter(m => m.hasAccount).length * 12 * 5000 -
            payments.filter(p => p.year === selectedYear && p.status === 'paid')
                .reduce((sum, p) => sum + p.amount, 0),
        totalPayments: payments.filter(p => p.year === selectedYear && p.status === 'paid').length,
        fullyPaidMembers: paymentRecords.filter(r => r.paidCount === 12 && r.hasAccount).length,
    };

    const handleCellClick = (member: any, month: string) => {
        if (!member.hasAccount) {
            setError('Member does not have an account');
            setTimeout(() => setError(''), 3000);
            return;
        }

        setSelectedMember(member);
        setSelectedMonth(month);
        setPaymentAmount(member.monthlyStatus[month].amount.toString());
        setShowPaymentModal(true);
    };

    const handleSubmitPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMember || !selectedMember.userId) {
            setError('Invalid member selected');
            return;
        }

        try {
            const currentStatus = selectedMember.monthlyStatus[selectedMonth].status;
            const newStatus = currentStatus === 'paid' ? 'pending' : 'paid';

            authService.updatePayment(
                selectedMember.userId,
                selectedMonth,
                selectedYear,
                parseInt(paymentAmount),
                newStatus
            );

            setSuccess(`Payment ${newStatus === 'paid' ? 'marked as paid' : 'marked as pending'} successfully!`);
            setShowPaymentModal(false);
            loadData();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to update payment');
            setTimeout(() => setError(''), 3000);
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
                    Track and manage society payments - Click on any cell to update payment status
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
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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

                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Fully Paid</p>
                            <p className="text-lg text-slate-900 dark:text-white">
                                {stats.fullyPaidMembers} members
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <GlassInput
                        label="Search"
                        placeholder="Search by name, house or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                    />

                    <GlassSelect
                        label="Year"
                        value={selectedYear.toString()}
                        icon={Calendar}
                        onValueChange={(value) => setSelectedYear(parseInt(value))}
                        options={years.map(year => ({ value: year, label: year.toString() }))}
                    />

                    <GlassSelect
                        label="Payment Status"
                        value={filterStatus}
                        icon={IndianRupee}
                        onValueChange={(value) => setFilterStatus(value)}
                        options={[
                            { value: 'all', label: 'All Members' },
                            { value: 'paid', label: 'Fully Paid (12/12)' },
                            { value: 'partial', label: 'Partially Paid' },
                            { value: 'pending', label: 'Pending Payments' }
                        ]}
                    />

                    <div className="flex items-end">
                        <GlassButton
                            className="glass-button"
                            onClick={() => {
                                setSearchTerm('');
                                setFilterStatus('all');
                            }}
                        >
                            Clear Filters
                        </GlassButton>
                    </div>
                </div>
            </GlassCard>

            {/* Payment Grid */}
            <GlassCard className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg text-slate-900 dark:text-white">
                        Monthly Payment Grid - {selectedYear}
                    </h2>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {filteredRecords.length} members
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                                    Member
                                </th>
                                <th className="text-left p-3 text-sm text-slate-600 dark:text-slate-400 sticky left-0 bg-white dark:bg-slate-900 z-10">
                                    House
                                </th>
                                {MONTHS.map(month => (
                                    <th key={month} className="text-center p-2 text-xs text-slate-600 dark:text-slate-400">
                                        {month.substring(0, 3)}
                                    </th>
                                ))}
                                <th className="text-center p-3 text-sm text-slate-600 dark:text-slate-400">
                                    Status
                                </th>
                                <th className="text-right p-3 text-sm text-slate-600 dark:text-slate-400">
                                    Total Paid
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record) => (
                                <tr
                                    key={record.id}
                                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                                >
                                    <td className="p-3 text-sm text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900">
                                        <div>
                                            <div className="truncate max-w-[150px]">{record.ownerName}</div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[150px]">
                                                {record.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-sm text-slate-900 dark:text-white sticky left-0 bg-white dark:bg-slate-900">
                                        {record.houseNumber}
                                    </td>
                                    {MONTHS.map(month => (
                                        <td key={month} className="p-1">
                                            {record.hasAccount ? (
                                                <button
                                                    onClick={() => handleCellClick(record, month)}
                                                    className={`
                            w-full h-10 rounded-lg flex items-center justify-center transition-all
                            ${record.monthlyStatus[month].status === 'paid'
                                                            ? 'bg-green-500/20 hover:bg-green-500/30 border border-green-500/30'
                                                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                                                        }
                          `}
                                                    title={`${month}: ${record.monthlyStatus[month].status} - ₹${record.monthlyStatus[month].amount}`}
                                                >
                                                    {record.monthlyStatus[month].status === 'paid' ? (
                                                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                    ) : (
                                                        <Edit2 className="w-3 h-3 text-slate-400" />
                                                    )}
                                                </button>
                                            ) : (
                                                <div className="w-full h-10 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center">
                                                    <XCircle className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                    <td className="p-3 text-center">
                                        <StatusBadge
                                            variant={
                                                !record.hasAccount ? 'danger' :
                                                    record.paidCount === 12 ? 'success' :
                                                        record.paidCount > 0 ? 'warning' :
                                                            'danger'
                                            }
                                            size="sm"
                                        >
                                            {!record.hasAccount ? 'No Account' : `${record.paidCount}/12`}
                                        </StatusBadge>
                                    </td>
                                    <td className="p-3 text-right text-sm text-slate-900 dark:text-white">
                                        ₹{record.totalPaid.toLocaleString()}
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

                {/* Legend */}
                <div className="mt-4 flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                        </div>
                        <span>Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                            <Edit2 className="w-3 h-3 text-slate-400" />
                        </div>
                        <span>Pending (Click to update)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-100/50 dark:bg-slate-800/50 flex items-center justify-center">
                            <XCircle className="w-3 h-3 text-slate-300" />
                        </div>
                        <span>No Account</span>
                    </div>
                </div>
            </GlassCard>

            {/* Payment Update Modal */}
            {showPaymentModal && selectedMember && selectedMonth && (
                <Modal
                    isOpen={showPaymentModal}
                    onClose={() => {
                        setShowPaymentModal(false);
                        setSelectedMember(null);
                        setSelectedMonth('');
                    }}
                    title={`Update Payment`}
                >
                    <form onSubmit={handleSubmitPayment} className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Member</span>
                                <span className="text-slate-900 dark:text-white">{selectedMember.ownerName}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-600 dark:text-slate-400">House</span>
                                <span className="text-slate-900 dark:text-white">{selectedMember.houseNumber}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Month</span>
                                <span className="text-slate-900 dark:text-white">{selectedMonth} {selectedYear}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-400">Current Status</span>
                                <StatusBadge variant={selectedMember.monthlyStatus[selectedMonth].status === 'paid' ? 'success' : 'warning'}>
                                    {selectedMember.monthlyStatus[selectedMonth].status}
                                </StatusBadge>
                            </div>
                        </div>

                        <GlassInput
                            label="Amount (₹)"
                            type="number"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            required
                            min="0"
                        />

                        <div className="flex gap-2 pt-4">
                            <GlassButton type="submit" variant="primary" className="flex-1">
                                {selectedMember.monthlyStatus[selectedMonth].status === 'paid' ? (
                                    <>
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Mark as Pending
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Mark as Paid
                                    </>
                                )}
                            </GlassButton>
                            <GlassButton
                                type="button"
                                className="flex-1"
                                onClick={() => {
                                    setShowPaymentModal(false);
                                    setSelectedMember(null);
                                    setSelectedMonth('');
                                }}
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
