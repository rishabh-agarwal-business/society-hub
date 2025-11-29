import { ReactNode } from 'react';
import { GlassCard } from './GlassCard';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    iconColor?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    subtitle?: string;
}

/**
 * Reusable stats card component
 * Used for displaying metrics and statistics
 */
export function StatsCard({
    title,
    value,
    icon: Icon,
    iconColor = 'text-blue-600 dark:text-blue-400',
    trend,
    subtitle
}: StatsCardProps) {
    return (
        <GlassCard className="p-4 md:p-6" variant="hover">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        {title}
                    </p>
                    <p className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-1">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            {subtitle}
                        </p>
                    )}
                    {trend && (
                        <div className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl bg-linear-to-br from-blue-500/10 to-purple-500/10`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </GlassCard>
    );
}
