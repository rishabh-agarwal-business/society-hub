import { ReactNode } from 'react';
import { BackgroundEffects } from '../common/BackgrounEffects';

interface PageContainerProps {
    children: ReactNode;
    hasSidebar?: boolean;
}

/**
 * Reusable page container with consistent layout
 * Handles responsive padding for sidebar presence
 */
export function PageContainer({ children, hasSidebar = false }: PageContainerProps) {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <BackgroundEffects />

            <main className={`relative z-10 ${hasSidebar
                ? 'lg:ml-72 xl:ml-80 lg:mr-6'
                : 'max-w-7xl mx-auto px-4 md:px-6'
                }`}>
                {children}
            </main>
        </div>
    );
}
