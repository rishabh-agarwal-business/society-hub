
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

interface GlassSelectProps {
    label?: string;
    error?: string;
    options: Array<{ value: string | number; label: string }>;
    icon?: React.ElementType;
    placeholder?: string;
    value?: string | number;
    onValueChange?: (value: string) => void;
    required?: boolean;
    className?: string;
}

export function GlassSelect({
    label,
    error,
    options,
    icon: Icon,
    placeholder = "Select an option",
    value,
    onValueChange,
    required,
    className,
}: GlassSelectProps) {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <Label className="text-sm font-medium">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </Label>
            )}

            <Select value={value?.toString()} onValueChange={onValueChange}>
                <SelectTrigger
                    className={cn(
                        "glass-input focus:ring-2 focus:ring-primary/50 transition relative w-full pr-10",
                        error && "border-red-500",
                        className
                    )}
                >
                    {Icon && (
                        <Icon
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none"
                        />
                    )}

                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent className="glass-panel border shadow-md">
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value.toString()}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
