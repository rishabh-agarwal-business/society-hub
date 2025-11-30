import { useState } from 'react';
import {
    CreditCard, Filter, Download, Calendar,
    CheckCircle2, Clock, Search
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { GlassInput } from '../../common/GlassInput';
import { GlassSelect } from '../../common/GlassSelect';
import { Column, ResponsiveTable } from '../../common/ResponsiveTable';
import { StatusBadge } from '../../common/StatusBadge';
import { usePayments } from '../../../hooks/usePayments';
import { User } from '../../../types';
import PaymentModal from '../../modals/PaymentModal';

interface PaymentsTabProps {
    user: User;
}

/**
 * Payments Tab Component
 * Displays payment history with filters and payment functionality
 * Fully responsive with mobile-friendly layouts
 */
export function PaymentsTab({ user }: PaymentsTabProps) {
    const { payments, stats } = usePayments(undefined, user.id);
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);

    // Filter payments based on selections
    const filteredPayments = payments.filter(payment => {
        const matchesYear = selectedYear === 'all' || payment.year.toString() === selectedYear;
        const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
        const matchesSearch = payment.month.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesYear && matchesStatus && matchesSearch;
    });

    const handlePayment = (payment: any) => {
        setSelectedPayment(payment);
        setShowPaymentModal(true);
    };

    const handleDownloadReceipt = (payment: any) => {
        // Mock download functionality
        console.log('Downloading receipt for:', payment);
        alert(`Receipt downloaded for ${payment.month} ${payment.year}`);
    };

    // Calculate due date for each payment (5th of each month)
    const getPaymentsWithDueDate = (payments: any[]) => {
        return payments.map(payment => {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            const monthIndex = monthNames.indexOf(payment.month);
            const dueDate = new Date(payment.year, monthIndex, 5);
            return {
                ...payment,
                dueDate: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };
        });
    };

    const paymentsWithDueDate = getPaymentsWithDueDate(filteredPayments);

    const columns: Column<any>[] = [
        {
            key: "month",
            label: "Month",
            accessor: "month",
            render: (value: any, row: any) => (
                <div>
                    <div className="text-slate-900 dark:text-white">{value} {row.year}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Due: {row.dueDate || 'N/A'}
                    </div>
                </div>
            ),
        },
        {
            key: "amount",
            label: "Amount",
            accessor: "amount",
            render: (value: number) => (
                <span className="text-slate-900 dark:text-white">
                    ₹{value.toLocaleString()}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            accessor: "status",
            render: (value: string) => (
                <StatusBadge
                    variant={
                        value === 'paid' ? 'success' :
                            value === 'pending' ? 'warning' :
                                'danger'
                    }
                >
                    {value}
                </StatusBadge>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            accessor: "id",
            render: (_: any, row: any) => (
                <div className="flex flex-wrap gap-2">
                    {row.status === 'pending' && (
                        <GlassButton variant="primary" size="sm" onClick={() => handlePayment(row)}>
                            Pay Now
                        </GlassButton>
                    )}

                    {row.status === 'paid' && (
                        <GlassButton className='glass-button' variant="outline" size="sm" onClick={() => handleDownloadReceipt(row)}>
                            <Download className="w-4 h-4" />
                        </GlassButton>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                    Payments
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your maintenance payments
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <GlassCard className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Total Paid</p>
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
                            <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Total Payments</p>
                            <p className="text-lg text-slate-900 dark:text-white">
                                {payments.length}
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
                        placeholder="Search by month..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                    />

                    <GlassSelect
                        label="Year"
                        value={selectedYear}
                        onValueChange={(value) => setSelectedYear(value)}
                        icon={Calendar}
                        options={[
                            { value: "all", label: "All Years" },
                            { value: "2023", label: "2023" },
                            { value: "2024", label: "2024" },
                            { value: "2025", label: "2025" },
                            { value: "2026", label: "2026" },
                        ]}
                    />

                    <GlassSelect
                        label='Status'
                        value={selectedStatus}
                        onValueChange={(value) => setSelectedStatus(value)}
                        icon={Filter}
                        options={[
                            { value: 'all', label: 'All Status' },
                            { value: 'paid', label: 'Paid' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'overdue', label: 'Overdue' },
                        ]}
                    />

                    <div className="flex items-end">
                        <GlassButton
                            variant="outline"
                            className="glass-button"
                            onClick={() => {
                                setSelectedYear('all');
                                setSelectedStatus('all');
                                setSearchTerm('');
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
                        Payment History
                    </h2>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {filteredPayments.length} payments
                    </span>
                </div>

                <ResponsiveTable
                    columns={columns}
                    data={paymentsWithDueDate}
                    emptyMessage="No payments found"
                    keyExtractor={(item) => item.id.toString()}
                />
            </GlassCard>

            {/* Payment Modal */}
            {showPaymentModal && selectedPayment && (
                <PaymentModal
                    openModal={showPaymentModal}
                    onClose={() => {
                        setShowPaymentModal(false);
                        setSelectedPayment(null);
                    }}
                    title="Make Payment"
                    payment={selectedPayment}
                />
            )}
        </div>
    );
}
