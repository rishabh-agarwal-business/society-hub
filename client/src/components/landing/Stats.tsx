import { Award, Building2, TrendingUp, Users } from "lucide-react"

const Stats = () => {
    return (
        <>
            <div className="text-center mb-16">
                <h2 className="text-slate-900 dark:text-white text-4xl md:text-5xl mb-4">
                    Trusted by Communities Nationwide
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-xl">
                    Join thousands of societies managing their communities efficiently
                </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                <div className="glass-card p-8 rounded-3xl text-center hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-slate-900 dark:text-white text-4xl mb-2">1,250+</div>
                    <div className="text-slate-600 dark:text-slate-400">Societies Registered</div>
                </div>

                <div className="glass-card p-8 rounded-3xl text-center hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-slate-900 dark:text-white text-4xl mb-2">75,000+</div>
                    <div className="text-slate-600 dark:text-slate-400">Active Members</div>
                </div>

                <div className="glass-card p-8 rounded-3xl text-center hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-slate-900 dark:text-white text-4xl mb-2">₹450Cr+</div>
                    <div className="text-slate-600 dark:text-slate-400">Transactions Processed</div>
                </div>

                <div className="glass-card p-8 rounded-3xl text-center hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-slate-900 dark:text-white text-4xl mb-2">98%</div>
                    <div className="text-slate-600 dark:text-slate-400">Satisfaction Rate</div>
                </div>
            </div>
        </>

    )
}

export default Stats