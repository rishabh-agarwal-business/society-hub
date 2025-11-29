import { useState } from 'react';
import {
    Home, CreditCard, Bell, BarChart3, Settings,
    Calendar, CheckCircle2, XCircle, Clock
} from 'lucide-react';
import { PageContainer } from '../layout/PageContainer';
import { Header } from '../layout/Header';
import { Sidebar, NavItem } from '../layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { OverviewTab } from './tabs/OverviewTab';
import { PaymentsTab } from './tabs/PaymentsTab';
import { RemindersTab } from './tabs/RemindersTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { User } from '../../types';

interface DashboardViewProps {
    user: User;
    onLogout: () => void;
}

type TabType = 'overview' | 'payments' | 'reminders' | 'analytics' | 'settings';

/**
 * Refactored Dashboard Component
 * Follows Single Responsibility Principle - handles only layout and tab routing
 * Responsive with mobile menu support
 */
export function DashboardView({ user, onLogout }: DashboardViewProps) {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems: NavItem[] = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'reminders', label: 'Reminders', icon: Bell, badge: 2 },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const renderTab = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab user={user} />;
            case 'payments':
                return <PaymentsTab user={user} />;
            case 'reminders':
                return <RemindersTab user={user} />;
            case 'analytics':
                return <AnalyticsTab user={user} />;
            case 'settings':
                return <SettingsTab user={user} />;
            default:
                return <OverviewTab user={user} />;
        }
    };

    return (
        <PageContainer hasSidebar>
            <Header
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
                showMenuButton
                onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                isMenuOpen={isSidebarOpen}
            />

            <Sidebar
                user={{
                    name: user.name,
                    subtitle: user.houseNumber || user.email,
                }}
                navItems={navItems}
                activeItem={activeTab}
                onItemClick={(id) => setActiveTab(id as TabType)}
                onLogout={onLogout}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="py-6 px-4 md:px-6">
                {renderTab()}
            </div>
        </PageContainer>
    );
}
