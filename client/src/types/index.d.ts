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

// Signin form props
interface SigninProps {
    onLogin: (user: any) => void;
    onSwitchToSignup: () => void;
    isDarkMode?: boolean;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'society_admin' | 'member';
    societyId?: string;
    houseNumber?: string;
    phone: string;
}

export interface Society {
    id: string;
    name: string;
    address: string;
    totalUnits: number;
    createdAt: string;
    adminId: string;
}

export interface SocietyMember {
    id: string;
    societyId: string;
    houseNumber: string;
    ownerName: string;
    email: string;
    phone: string;
    hasAccount: boolean;
    userId?: string;
}

export interface Payment {
    id: string;
    userId: string;
    societyId: string;
    amount: number;
    month: string;
    year: number;
    status: 'paid' | 'pending' | 'overdue';
    paidDate?: string;
}

export interface SocietyEvent {
    id: string;
    societyId: string;
    title: string;
    description: string;
    type: 'event' | 'meeting' | 'announcement' | 'notice';
    date: string;
    createdAt: string;
    createdBy: string;
}