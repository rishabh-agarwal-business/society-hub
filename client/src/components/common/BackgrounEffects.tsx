/**
 * Reusable background effects component
 * DRY principle - used across all pages
 */
export function BackgroundEffects() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 -left-20 w-64 h-64 md:w-96 md:h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl" />
        </div>
    );
}
