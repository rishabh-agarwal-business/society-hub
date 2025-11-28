import { Star } from "lucide-react";
import React from 'react'

const Testimonials = () => {
    return (
        <div className="mt-16 grid md:grid-cols-3 gap-6" >
            <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                    "SocietyHub has transformed how we manage our community. Payment collection is now 100% on time!"
                </p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                        R
                    </div>
                    <div>
                        <div className="text-slate-900 dark:text-white">Rajesh Kumar</div>
                        <div className="text-slate-600 dark:text-slate-400">Secretary, Green Park Society</div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                    "The automated reminders and easy payment options have made life so much easier for our residents."
                </p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                        P
                    </div>
                    <div>
                        <div className="text-slate-900 dark:text-white">Priya Sharma</div>
                        <div className="text-slate-600 dark:text-slate-400">Treasurer, Sunrise Apartments</div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                    "Modern, intuitive interface. Our elderly residents find it easy to use. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                        A
                    </div>
                    <div>
                        <div className="text-slate-900 dark:text-white">Amit Patel</div>
                        <div className="text-slate-600 dark:text-slate-400">Chairman, Vista Heights</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Testimonials