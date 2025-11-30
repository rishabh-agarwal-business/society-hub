import { ReactNode } from 'react';
import { LucideIcon, LogOut } from 'lucide-react';

export interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: number;
}

interface SidebarProps {
    user?: {
        name: string;
        subtitle: string;
        avatar?: string;
    };
    navItems: NavItem[];
    activeItem: string;
    onItemClick: (id: string) => void;
    onLogout?: () => void;
    isOpen?: boolean;
    onClose?: () => void;
}

/**
 * Reusable sidebar component
 * Responsive with mobile drawer functionality
 */
export function Sidebar({
    user,
    navItems,
    activeItem,
    onItemClick,
    onLogout,
    isOpen = true,
    onClose
}: SidebarProps) {
    const sidebarContent = (
        <>
            {/* User Profile */}
            {user && (
                <div className="flex items-center gap-3 mb-6 md:mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shrink-0">
                        {user.avatar || user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-slate-900 dark:text-white truncate">
                            {user.name}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 truncate">
                            {user.subtitle}
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                onItemClick(item.id);
                                onClose?.();
                            }}
                            className={`w-full cursor-pointer flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'glass-button-primary'
                                : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className="truncate">{item.label}</span>
                            </div>
                            {item.badge !== undefined && item.badge > 0 && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Logout Button */}
            {onLogout && (
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mt-4 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            )}
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex fixed left-4 md:left-6 top-6 bottom-6 w-64 xl:w-72 glass-card rounded-3xl p-4 md:p-6 flex-col z-20">
                {sidebarContent}
            </aside>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <aside className="absolute left-0 top-0 bottom-0 w-64 glass-card rounded-r-3xl p-6 flex flex-col animate-in slide-in-from-left duration-300">
                        {sidebarContent}
                    </aside>
                </div>
            )}
        </>
    );
}
