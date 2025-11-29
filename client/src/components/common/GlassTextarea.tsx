import { TextareaHTMLAttributes, forwardRef } from 'react';

interface GlassTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

/**
 * Reusable glass morphism textarea component
 */
export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block mb-2 text-sm text-slate-700 dark:text-slate-300">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`
            glass-input w-full px-4 py-2 md:py-3 rounded-xl min-h-[100px] resize-y
            ${error ? 'border-red-500 dark:border-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

GlassTextarea.displayName = 'GlassTextarea';
