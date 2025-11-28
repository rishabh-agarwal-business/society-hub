import { Bell, CheckCircle2, Shield, Sparkles, Users, Zap } from 'lucide-react'

const WhyUs = () => {
    return (
        <div id="why-us" className="relative z-10 max-w-7xl mx-auto px-6 py-20" >
            <div className="text-center mb-16">
                <h2 className="text-slate-900 dark:text-white text-4xl md:text-5xl mb-4">
                    Why SocietyHub is the Best Choice
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-xl">
                    Built with the latest technology for maximum efficiency
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-8 rounded-3xl flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-xl mb-2">Lightning Fast Performance</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Built on cutting-edge technology ensuring instant payments and real-time updates for all users.
                        </p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-xl mb-2">Bank-Grade Security</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            256-bit SSL encryption and PCI DSS compliance ensures your financial data is always protected.
                        </p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-xl mb-2">99.9% Uptime Guarantee</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Our robust infrastructure ensures your society operations never stop, 24/7 availability.
                        </p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-xl mb-2">Dedicated Support Team</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            24/7 customer support ready to assist you with any queries or issues you might encounter.
                        </p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-rose-500 to-red-500 flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-xl mb-2">Smart Automation</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            AI-powered reminders, auto-generated receipts, and intelligent payment tracking save hours of manual work.
                        </p>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-blue-500 flex items-center justify-center shrink-0">
                        <Bell className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-xl mb-2">Multi-Channel Notifications</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Reach members through email, SMS, WhatsApp, and in-app notifications for maximum engagement.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyUs