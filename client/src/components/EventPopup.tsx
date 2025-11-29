import { X, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface EventPopupProps {
    onClose: () => void;
}

export function EventPopup({ onClose }: EventPopupProps) {
    // Mock event data - would be filtered by colony in production
    const event = {
        title: 'Annual Diwali Celebration',
        colony: 'A Block',
        date: 'November 25, 2025',
        time: '6:00 PM - 10:00 PM',
        location: 'Community Hall, A Block',
        description: 'Join us for our annual Diwali celebration with cultural programs, dinner, and fireworks display. All residents of A Block are cordially invited.',
        attendees: 87,
        image: 'https://images.unsplash.com/photo-1605722243979-fe0be8158232?w=800&q=80'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-card rounded-3xl p-0 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 glass-morphism p-2 rounded-xl hover:scale-105 transition-transform"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                    <div className="absolute bottom-4 left-6 right-6">
                        <div className="inline-block glass-morphism px-3 py-1 rounded-full text-white text-sm mb-2">
                            {event.colony}
                        </div>
                        <h2 className="text-white text-2xl">{event.title}</h2>
                    </div>
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-morphism rounded-2xl p-4 flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                                <div className="text-slate-600 dark:text-slate-400 text-sm">Date</div>
                                <div className="text-slate-900 dark:text-white">{event.date}</div>
                            </div>
                        </div>
                        <div className="glass-morphism rounded-2xl p-4 flex items-start gap-3">
                            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                            <div>
                                <div className="text-slate-600 dark:text-slate-400 text-sm">Time</div>
                                <div className="text-slate-900 dark:text-white">{event.time}</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-morphism rounded-2xl p-4 flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                        <div>
                            <div className="text-slate-600 dark:text-slate-400 text-sm">Location</div>
                            <div className="text-slate-900 dark:text-white">{event.location}</div>
                        </div>
                    </div>

                    <div className="glass-morphism rounded-2xl p-4 flex items-start gap-3">
                        <Users className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div>
                            <div className="text-slate-600 dark:text-slate-400 text-sm">Attendees</div>
                            <div className="text-slate-900 dark:text-white">{event.attendees} residents confirmed</div>
                        </div>
                    </div>

                    <div>
                        <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">About this event</div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button className="flex-1 glass-button-primary py-6">
                            I'll Attend
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="flex-1 glass-button py-6"
                        >
                            Maybe Later
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
