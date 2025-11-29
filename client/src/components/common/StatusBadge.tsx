import { ReactNode } from 'react';

interface StatusBadgeProps {
    children: ReactNode;
    variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable status badge component
 * Factory pattern for different status types
 */
export function StatusBadge({ children, variant, size = 'md' }: StatusBadgeProps) {
    const variantStyles = {
        success: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
        danger: 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30',
        info: 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30',
        neutral: 'bg-slate-500/20 text-slate-700 dark:text-slate-400 border-slate-500/30'
    };

    const sizeStyles = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base'
    };

    return (
        <span className={`inline-flex items-center justify-center rounded-full border ${variantStyles[variant]} ${sizeStyles[size]}`}>
            {children}
        </span>
    );
}
