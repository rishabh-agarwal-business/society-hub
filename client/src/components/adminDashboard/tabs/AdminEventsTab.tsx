import { useState, useEffect } from 'react';
import {
    Plus, Calendar, Trash2, Bell, Users, FileText, Filter, Search, Tickets
} from 'lucide-react';
import { GlassCard } from '../../common/GlassCard';
import { GlassButton } from '../../common/GlassButton';
import { GlassInput } from '../../common/GlassInput';
import { GlassSelect } from '../../common/GlassSelect';
import { GlassTextarea } from '../../common/GlassTextarea';
import { Modal } from '../../common/Modal';
import { StatusBadge } from '../../common/StatusBadge';
import { SocietyEvent, User } from '../../../types';
import { authService } from '../../services/authService';

interface AdminEventsTabProps {
    user: User;
}

/**
 * Admin Events Tab Component
 * Create and manage society events, meetings, and announcements
 */
export function AdminEventsTab({ user }: AdminEventsTabProps) {
    const [events, setEvents] = useState<SocietyEvent[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterDateRange, setFilterDateRange] = useState<'all' | 'upcoming' | 'past'>('all');
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventType, setEventType] = useState<SocietyEvent['type']>('announcement');
    const [eventDate, setEventDate] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = () => {
        if (user.societyId) {
            const eventsData = authService.getEventsBySociety(user.societyId);
            setEvents(eventsData);
        }
    };

    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.societyId) return;

        try {
            authService.createEvent(
                user.societyId,
                eventTitle,
                eventDescription,
                eventType,
                eventDate
            );
            setSuccess('Event created successfully!');
            setEventTitle('');
            setEventDescription('');
            setEventType('announcement');
            setEventDate('');
            setShowAddEvent(false);
            loadEvents();
        } catch (err: any) {
            setError(err.message || 'Failed to create event');
        }
    };

    const handleDeleteEvent = (eventId: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                authService.deleteEvent(eventId);
                setSuccess('Event deleted successfully!');
                loadEvents();
            } catch (err: any) {
                setError(err.message || 'Failed to delete event');
            }
        }
    };

    const getEventIcon = (type: SocietyEvent['type']) => {
        switch (type) {
            case 'meeting':
                return Users;
            case 'event':
                return Calendar;
            case 'announcement':
                return Bell;
            case 'notice':
                return FileText;
            default:
                return Calendar;
        }
    };

    const getEventColor = (type: SocietyEvent['type']) => {
        switch (type) {
            case 'meeting':
                return 'blue';
            case 'event':
                return 'purple';
            case 'announcement':
                return 'yellow';
            case 'notice':
                return 'red';
            default:
                return 'blue';
        }
    };

    // Filter events
    const filteredEvents = events.filter(event => {
        const matchesSearch = searchTerm === '' ||
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || event.type === filterType;

        const eventDate = new Date(event.date);
        const today = new Date();
        const matchesDate =
            filterDateRange === 'all' ||
            (filterDateRange === 'upcoming' && eventDate >= today) ||
            (filterDateRange === 'past' && eventDate < today);

        return matchesSearch && matchesType && matchesDate;
    });

    const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= new Date());
    const pastEvents = filteredEvents.filter(e => new Date(e.date) < new Date());

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
                        Events & Announcements
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Manage society events, meetings, and notices
                    </p>
                </div>
                <GlassButton
                    variant="primary"
                    onClick={() => setShowAddEvent(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                </GlassButton>
            </div>

            {/* Alerts */}
            {error && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="ml-auto">×</button>
                </div>
            )}

            {success && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400">
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')} className="ml-auto">×</button>
                </div>
            )}

            {/* Filters */}
            <GlassCard className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    <h2 className="text-lg text-slate-900 dark:text-white">Filters</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <GlassInput
                        label="Search Events"
                        placeholder="Search by title or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                    />

                    <GlassSelect
                        label="Event Type"
                        value={filterType}
                        icon={Tickets}
                        onValueChange={(value) => setFilterType(value)}
                        options={[
                            { value: 'all', label: 'All Types' },
                            { value: 'announcement', label: 'Announcement' },
                            { value: 'meeting', label: 'Meeting' },
                            { value: 'event', label: 'Event' },
                            { value: 'notice', label: 'Notice' }
                        ]}
                    />

                    <GlassSelect
                        label="Date Range"
                        icon={Calendar}
                        value={filterDateRange}
                        onValueChange={(value) => setFilterDateRange(value as any)}
                        options={[
                            { value: 'all', label: 'All Events' },
                            { value: 'upcoming', label: 'Upcoming Only' },
                            { value: 'past', label: 'Past Only' }
                        ]}
                    />

                    <div className="flex items-end">
                        <GlassButton
                            onClick={() => {
                                setSearchTerm('');
                                setFilterType('all');
                                setFilterDateRange('all');
                            }}
                        >
                            Clear Filters
                        </GlassButton>
                    </div>
                </div>
            </GlassCard>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <GlassCard className="p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Events</p>
                    <p className="text-2xl text-slate-900 dark:text-white">{filteredEvents.length}</p>
                </GlassCard>
                <GlassCard className="p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Upcoming</p>
                    <p className="text-2xl text-slate-900 dark:text-white">{upcomingEvents.length}</p>
                </GlassCard>
                <GlassCard className="p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Past Events</p>
                    <p className="text-2xl text-slate-900 dark:text-white">{pastEvents.length}</p>
                </GlassCard>
            </div>

            {/* Upcoming Events */}
            <GlassCard className="p-4 md:p-6">
                <h2 className="text-lg text-slate-900 dark:text-white mb-4">
                    Upcoming Events
                </h2>

                {upcomingEvents.length > 0 ? (
                    <div className="space-y-3">
                        {upcomingEvents.map((event) => {
                            const Icon = getEventIcon(event.type);
                            return (
                                <div
                                    key={event.id}
                                    className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className={`w-10 h-10 rounded-xl bg-${getEventColor(event.type)}-500/20 flex items-center justify-center shrink-0`}>
                                                <Icon className={`w-5 h-5 text-${getEventColor(event.type)}-600 dark:text-${getEventColor(event.type)}-400`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-slate-900 dark:text-white truncate">{event.title}</h3>
                                                    <StatusBadge variant="info" size="sm">
                                                        {event.type}
                                                    </StatusBadge>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                                    {event.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(event.date).toLocaleDateString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <GlassButton
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeleteEvent(event.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        </GlassButton>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                        No upcoming events
                    </div>
                )}
            </GlassCard>

            {/* Past Events */}
            {pastEvents.length > 0 && (
                <GlassCard className="p-4 md:p-6">
                    <h2 className="text-lg text-slate-900 dark:text-white mb-4">
                        Past Events
                    </h2>

                    <div className="space-y-3">
                        {pastEvents.map((event) => {
                            const Icon = getEventIcon(event.type);
                            return (
                                <div
                                    key={event.id}
                                    className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 opacity-75"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className={`w-10 h-10 rounded-xl bg-${getEventColor(event.type)}-500/20 flex items-center justify-center shrink-0`}>
                                                <Icon className={`w-5 h-5 text-${getEventColor(event.type)}-600 dark:text-${getEventColor(event.type)}-400`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-slate-900 dark:text-white truncate">{event.title}</h3>
                                                    <StatusBadge variant="neutral" size="sm">
                                                        {event.type}
                                                    </StatusBadge>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                                    {event.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(event.date).toLocaleDateString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <GlassButton
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeleteEvent(event.id)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        </GlassButton>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </GlassCard>
            )}

            {/* Add Event Modal */}
            {showAddEvent && (
                <Modal
                    isOpen={showAddEvent}
                    onClose={() => {
                        setShowAddEvent(false);
                        setEventTitle('');
                        setEventDescription('');
                        setEventType('announcement');
                        setEventDate('');
                    }}
                    title="Create New Event"
                >
                    <form onSubmit={handleAddEvent} className="space-y-4">
                        <GlassInput
                            label="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            required
                            placeholder="Enter event title"
                        />

                        <GlassTextarea
                            label="Description"
                            value={eventDescription}
                            onChange={(e) => setEventDescription(e.target.value)}
                            required
                            placeholder="Enter event description"
                            rows={4}
                        />

                        <GlassSelect
                            label="Event Type"
                            value={eventType}
                            onValueChange={(value) => setEventType(value as SocietyEvent['type'])}
                            options={[
                                { value: 'announcement', label: 'Announcement' },
                                { value: 'meeting', label: 'Meeting' },
                                { value: 'event', label: 'Event' },
                                { value: 'notice', label: 'Notice' }
                            ]}
                        />

                        <GlassInput
                            label="Event Date"
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                        />

                        <div className="flex gap-2 pt-4">
                            <GlassButton type="submit" variant="primary" className="flex-1">
                                Create Event
                            </GlassButton>
                            <GlassButton
                                type="button"
                                className="flex-1"
                                onClick={() => setShowAddEvent(false)}
                            >
                                Cancel
                            </GlassButton>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}
