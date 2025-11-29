import { ReactNode, ButtonHTMLAttributes } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: "default" | "primary" | "danger" | "success" | "outline" | "warning"
    size?: "sm" | "md" | "lg"
    isLoading?: boolean
    icon?: ReactNode
}

/**
 * Shadcn + Glassmorphism Button Component
 */
export function GlassButton({
    children,
    variant = "default",
    size = "md",
    isLoading = false,
    icon,
    className,
    disabled,
    ...props
}: GlassButtonProps) {
    const variantStyles = {
        default: "glass-button",
        primary: "glass-button-primary",
        danger: "bg-red-500/90 hover:bg-red-600 text-white border border-red-400/30",
        success: "bg-green-500/90 hover:bg-green-600 text-white border border-green-400/30",
        warning: "bg-yellow-500/90 hover:bg-yellow-600 text-white border border-yellow-400/30",
        outline:
            "border border-slate-400/40 dark:border-slate-600/40 text-slate-700 dark:text-slate-200 hover:bg-slate-100/20 dark:hover:bg-slate-800/30 backdrop-blur-md",
    }

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 md:px-6 md:py-3",
        lg: "px-6 py-3 md:px-8 md:py-4 text-lg",
    }

    return (
        <Button
            disabled={disabled || isLoading}
            className={cn(
                "cursor-pointer inline-flex items-center justify-center gap-2 transition-all duration-300",
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
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
        </Button>
    )
}
