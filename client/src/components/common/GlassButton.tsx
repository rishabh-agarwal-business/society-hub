import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'default' | 'primary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: ReactNode;
}

/**
 * Reusable glass morphism button component
 * Follows Open/Closed Principle - easily extended with new variants
 */
export function GlassButton({
    children,
    variant = 'default',
    size = 'md',
    isLoading = false,
    icon,
    className = '',
    disabled,
    ...props
}: GlassButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        default: 'glass-button',
        primary: 'glass-button-primary',
        danger: 'bg-red-500/90 hover:bg-red-600 text-white border border-red-400/30',
        success: 'bg-green-500/90 hover:bg-green-600 text-white border border-green-400/30'
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 md:px-6 md:py-3',
        lg: 'px-6 py-3 md:px-8 md:py-4 text-lg'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {icon && <span className="shrink-0">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
}
