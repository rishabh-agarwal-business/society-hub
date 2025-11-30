import { Building2, Moon, Sun, Menu, X } from 'lucide-react';
import { GlassButton } from '../common/GlassButton';

interface HeaderProps {
    title?: string;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    showMenuButton?: boolean;
    onMenuToggle?: () => void;
    isMenuOpen?: boolean;
    actions?: React.ReactNode;
}

/**
 * Reusable header component
 * Responsive with mobile menu support
 */
export function Header({
    title = 'SocietyHub',
    isDarkMode,
    onToggleDarkMode,
    showMenuButton = false,
    onMenuToggle,
    isMenuOpen = false,
    actions
}: HeaderProps) {
    return (
        <nav className="relative z-10 px-4 md:px-6 py-4 md:py-6">
            <div className="max-w-8xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    {showMenuButton && onMenuToggle && (
                        <GlassButton
                            onClick={onMenuToggle}
                            className="lg:hidden p-2 glass-morphism hover:scale-105 transition-transform"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            ) : (
                                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            )}
                        </GlassButton>
                    )}
                    <div className="glass-morphism p-2 rounded-2xl">
                        <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-slate-900 dark:text-white tracking-tight text-sm md:text-base truncate">
                        {title}
                    </span>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    {actions}
                    <GlassButton
                        onClick={onToggleDarkMode}
                        className="glass-button p-2 md:p-3 hover:scale-105 transition-transform"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                        ) : (
                            <Moon className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
                        )}
                    </GlassButton>
                </div>
            </div>
        </nav>
    );
}
