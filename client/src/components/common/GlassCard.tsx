import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'hover' | 'interactive';
    onClick?: () => void;
}

/**
 * Reusable glass morphism card component
 * Follows Single Responsibility Principle - only handles card styling
 */
export function GlassCard({ children, className = '', variant = 'default', onClick }: GlassCardProps) {
    const baseStyles = 'glass-card rounded-2xl transition-all duration-300';

    const variantStyles = {
        default: '',
        hover: 'hover:scale-[1.02] hover:shadow-2xl cursor-pointer',
        interactive: 'hover:bg-white/90 dark:hover:bg-slate-800/90 cursor-pointer active:scale-[0.98]'
    };

    return (
        <div
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
