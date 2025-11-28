import { Bell, CreditCard, Shield } from 'lucide-react'
import React from 'react'

const Features = () => {
    return (
        <div id="features" className="grid md:grid-cols-3 gap-6 mt-24" >
            <div className="glass-card p-8 rounded-3xl space-y-4 hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-slate-900 dark:text-white text-xl">Easy Payments</h3>
                <p className="text-slate-600 dark:text-slate-400">
                    Pay your monthly charges seamlessly with multiple payment options and automated reminders.
                </p>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-4 hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bell className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-slate-900 dark:text-white text-xl">Smart Notifications</h3>
                <p className="text-slate-600 dark:text-slate-400">
                    Get timely reminders via email, SMS, and WhatsApp. Never miss a payment or event.
                </p>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-4 hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-slate-900 dark:text-white text-xl">Secure & Transparent</h3>
                <p className="text-slate-600 dark:text-slate-400">
                    Track all your payments and society activities with complete transparency and security.
                </p>
            </div>
        </div>
    )
}

export default Features