import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface GlassSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options?: Array<{ value: string | number; label: string }>;
    icon?: React.ElementType;
}

/**
 * Reusable glass morphism select component
 */
export const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
    ({ label, error, options, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block mb-2 text-sm text-slate-700 dark:text-slate-300">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`
            glass-input w-full px-4 py-2 md:py-3 rounded-xl cursor-pointer
            ${error ? 'border-red-500 dark:border-red-500' : ''}
            ${className}
          `}
                    {...props}
                >
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

GlassSelect.displayName = 'GlassSelect';
