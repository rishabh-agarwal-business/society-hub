import { Building2, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const Header = ({
    title = 'SocietyHub',
    isDarkMode,
    onToggleDarkMode,
    showMenuButton = false,
    onMenuToggle,
    isMenuOpen = false,
    actions
}: HeaderProps) => {
    return (
        <nav className="relative z-10 px-4 md:px-6 py-4 md:py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Logo and Title */}
                <div className="flex items-center gap-3">
                    {showMenuButton && onMenuToggle && (
                        <button
                            onClick={onMenuToggle}
                            className="lg:hidden p-2 glass-morphism rounded-xl hover:scale-105 transition-transform"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            ) : (
                                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            )}
                        </button>
                    )}
                    <div className="glass-morphism p-2 rounded-2xl">
                        <Building2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-slate-900 dark:text-white tracking-tight text-sm md:text-base truncate">
                        {title}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="hidden md:flex items-center gap-6 mr-4">
                        {
                            actions?.map((action: HeaderLink) => {
                                const { title, style, url } = action;
                                return (
                                    <a key={title} href={url} className={style}>{title}</a>
                                )
                            })
                        }
                    </div>
                    <Button
                        onClick={onToggleDarkMode}
                        className="glass-button px-4 md:px-6 text-sm md:text-base cursor-pointer"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                        ) : (
                            <Moon className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
                        )}
                    </Button>
                    <Button
                        // onClick={() => setShowAuth(!showAuth)}
                        onClick={() => console.log('logs')}
                        className="glass-button px-4 md:px-6 cursor-pointer"
                    >
                        {/* {showAuth ? 'Back' : 'Get Started'} */}
                        <span className='text-slate-900 dark:text-white tracking-tight text-sm md:text-base truncate'>Get Started</span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Header