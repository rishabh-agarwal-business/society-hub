import { ReactNode, useState } from 'react';
import { ArrowUpDown, ChevronUp, ChevronDown, Search } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { GlassInput } from './GlassInput';

export interface Column<T> {
    key: string;
    label: string;

    sortable?: boolean;
    className?: string;
    mobileLabel?: string;

    // Support both render(item) and render(value, row)
    render?: ((item: T) => ReactNode) |
    ((value: any, row: T) => ReactNode);

    accessor?: keyof T; // optional for new style
}

interface ResponsiveTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string;
    searchable?: boolean;
    searchPlaceholder?: string;
    onSearch?: (term: string) => void;
    emptyMessage?: string;
    mobileCard?: (item: T) => ReactNode; // Custom mobile card renderer
}

type SortDirection = 'asc' | 'desc' | null;

function renderCell<T extends Record<string, any>>(column: Column<T>, item: T) {
    if (!column.render) return item[column.key];

    if (column.accessor) {
        const value = item[column.accessor];
        return (column.render as (value: any, row: T) => React.ReactNode)(value, item);
    }

    return (column.render as (item: T) => React.ReactNode)(item);
}

/**
 * Reusable responsive table component
 * Automatically converts to cards on mobile
 * Includes built-in sorting and searching
 */
export function ResponsiveTable<T extends Record<string, any>>({
    data,
    columns,
    keyExtractor,
    searchable = false,
    searchPlaceholder = 'Search...',
    onSearch,
    emptyMessage = 'No data available',
    mobileCard
}: ResponsiveTableProps<T>) {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSort = (columnKey: string) => {
        if (sortColumn === columnKey) {
            if (sortDirection === 'asc') setSortDirection('desc');
            else if (sortDirection === 'desc') {
                setSortDirection(null);
                setSortColumn(null);
            }
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn || !sortDirection) return 0;

        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        onSearch?.(value);
    };

    return (
        <div className="w-full space-y-4">
            {searchable && (
                <GlassInput
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    icon={<Search className="w-4 h-4" />}
                />
            )}

            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <GlassCard className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className={`px-4 py-3 text-left text-slate-700 dark:text-slate-300 ${column.className || ''}`}
                                    >
                                        {column.sortable ? (
                                            <button
                                                onClick={() => handleSort(column.key)}
                                                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            >
                                                {column.label}
                                                {sortColumn === column.key ? (
                                                    sortDirection === 'asc'
                                                        ? <ChevronUp className="w-4 h-4" />
                                                        : <ChevronDown className="w-4 h-4" />
                                                ) : (
                                                    <ArrowUpDown className="w-4 h-4 opacity-30" />
                                                )}
                                            </button>
                                        ) : column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                sortedData.map((item) => (
                                    <tr
                                        key={keyExtractor(item)}
                                        className="border-b last:border-0 border-slate-200 dark:border-slate-700 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className={`px-4 py-3 text-slate-900 dark:text-white ${column.className || ''}`}
                                            >
                                                {renderCell(column, item)}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </GlassCard>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-3">
                {sortedData.length === 0 ? (
                    <GlassCard className="p-6 text-center text-slate-500 dark:text-slate-400">
                        {emptyMessage}
                    </GlassCard>
                ) : (
                    sortedData.map((item) => (
                        <GlassCard key={keyExtractor(item)} className="p-4">
                            {mobileCard ? (
                                mobileCard(item)
                            ) : (
                                <div className="space-y-2">
                                    {columns.map((column) => (
                                        <div key={column.key} className="flex justify-between items-start gap-2">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                                {column.mobileLabel || column.label}:
                                            </span>
                                            <span className="text-sm text-slate-900 dark:text-white text-right">
                                                {renderCell(column, item)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </GlassCard>
                    ))
                )}
            </div>
        </div>
    );
}

