import { useState } from 'react';
import {
    Home, CreditCard, Bell, BarChart3, Settings,
    Users, Calendar, Vote
} from 'lucide-react';
import { PageContainer } from '../layout/PageContainer';
import { Header } from '../layout/Header';
import { Sidebar, NavItem } from '../layout/Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { AdminOverviewTab } from './tabs/AdminOverviewTab';
import { AdminMembersTab } from './tabs/AdminMembersTab';
import { AdminPaymentsTab } from './tabs/AdminPaymentsTab';
import { AdminEventsTab } from './tabs/AdminEventsTab';
import { AdminAnalyticsTab } from './tabs/AdminAnalyticsTab';
import { AdminSettingsTab } from './tabs/AdminSettingsTab';
import { User } from '../../types';
import { AdminElectionsTab } from './tabs/AdminElectionsTab';

interface AdminDashboardProps {
    user: User;
    onLogout: () => void;
}

type TabType = 'overview' | 'members' | 'payments' | 'events' | 'elections' | 'analytics' | 'settings';

/**
 * Admin Dashboard Component
 * Similar structure to member dashboard but with admin-specific tabs
 * Responsive with mobile menu support
 */
export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems: NavItem[] = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'members', label: 'Members', icon: Users },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'elections', label: 'Elections', icon: Vote },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const renderTab = () => {
        switch (activeTab) {
            case 'overview':
                return <AdminOverviewTab user={user} />;
            case 'members':
                return <AdminMembersTab user={user} />;
            case 'payments':
                return <AdminPaymentsTab user={user} />;
            case 'events':
                return <AdminEventsTab user={user} />;
            case 'analytics':
                return <AdminAnalyticsTab user={user} />;
            case 'elections':
                return <AdminElectionsTab user={user} />;
            case 'settings':
                return <AdminSettingsTab user={user} />;
            default:
                return <AdminOverviewTab user={user} />;
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
                    subtitle: 'Society Admin',
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
