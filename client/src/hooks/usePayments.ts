import { useState, useEffect, useMemo } from 'react';
import { Payment } from '../types';
import { authService } from '../components/services/authService';

/**
 * Custom hook for payment management
 * Handles payment logic and calculations
 */
export function usePayments(societyId?: string, userId?: string) {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPayments();
    }, [societyId, userId]);

    const loadPayments = () => {
        setIsLoading(true);

        let paymentData: Payment[] = [];
        if (societyId) {
            paymentData = authService.getPaymentsBySociety(societyId);
        } else if (userId) {
            paymentData = authService.getPaymentsByUser(userId);
        }

        setPayments(paymentData);
        setIsLoading(false);
    };

    const updatePayment = async (
        userId: string,
        month: string,
        year: number,
        amount: number,
        status: Payment['status']
    ): Promise<{ success: boolean; error?: string }> => {
        try {
            authService.updatePayment(userId, month, year, amount, status);
            loadPayments();
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message || 'Failed to update payment' };
        }
    };

    // Calculate payment statistics
    const stats = useMemo(() => {
        const paid = payments.filter(p => p.status === 'paid');
        const pending = payments.filter(p => p.status === 'pending');
        const overdue = payments.filter(p => p.status === 'overdue');

        const totalCollected = paid.reduce((sum, p) => sum + p.amount, 0);
        const totalPending = pending.reduce((sum, p) => sum + p.amount, 0);

        return {
            totalPayments: payments.length,
            paidCount: paid.length,
            pendingCount: pending.length,
            overdueCount: overdue.length,
            totalCollected,
            totalPending,
            collectionRate: payments.length > 0 ? (paid.length / payments.length) * 100 : 0
        };
    }, [payments]);

    // Get payments by year
    const getPaymentsByYear = (year: number) => {
        return payments.filter(p => p.year === year);
    };

    // Get payment trend data for charts
    const getTrendData = (year: number) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        return months.map(month => {
            const monthPayments = payments.filter(p => p.month === month && p.year === year);
            const collected = monthPayments
                .filter(p => p.status === 'paid')
                .reduce((sum, p) => sum + p.amount, 0);
            const pending = monthPayments
                .filter(p => p.status !== 'paid')
                .reduce((sum, p) => sum + p.amount, 0);

            return {
                month: month.substring(0, 3),
                collected,
                pending,
                total: collected + pending
            };
        });
    };

    return {
        payments,
        isLoading,
        stats,
        updatePayment,
        getPaymentsByYear,
        getTrendData,
        refreshPayments: loadPayments
    };
}
