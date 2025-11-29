import { InputHTMLAttributes, forwardRef } from "react"
import { Input } from "../ui/input"
import { cn } from "../../lib/utils"
import { Label } from "../ui/label"

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
    ({ label, error, icon, className, required, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <Label className="text-sm font-medium">
                        {label}
                        {required && <span className="text-red-500">*</span>}
                    </Label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                            {icon}
                        </div>
                    )}

                    <Input
                        ref={ref}
                        className={cn(
                            "glass-panel px-4 py-2 md:py-3",
                            icon && "pl-10",
                            error && "border-red-500 dark:border-red-500",
                            className
                        )}
                        required={required}
                        {...props}
                    />
                </div>

                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        )
    }
)

GlassInput.displayName = "GlassInput"
