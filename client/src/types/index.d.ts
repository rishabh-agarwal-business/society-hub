// Theme Props
interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    setDarkMode: (value: boolean) => void;
}

// Nav Props
interface HeaderLink {
    title: string;
    url: string;
    style: string;
}

interface HeaderProps {
    title?: string;
    isDarkMode: boolean;
    onToggleDarkMode: () => void;
    showMenuButton?: boolean;
    onMenuToggle?: () => void;
    isMenuOpen?: boolean;
    actions?: HeaderLink[];
}

// Contact 
interface ContactFormType {
    email: string;
    name: string;
    message: string;
}
