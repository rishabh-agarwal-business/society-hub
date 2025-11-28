import React from 'react'
import { Button } from '../ui/button'
import { Sparkles } from 'lucide-react'

const Hero = () => {
    return (
        <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 glass-morphism px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-slate-700 dark:text-slate-300">Next-gen Society Management</span>
            </div>

            <h1 className="text-slate-900 dark:text-white text-6xl md:text-7xl tracking-tight">
                Manage Your Society
                <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    Effortlessly
                </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto">
                A futuristic platform for society maintenance, payments, and community management. Experience seamless living.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
                <Button
                    // onClick={() => setShowAuth(true)}
                    onClick={() => console.log('true')}
                    className="glass-button-primary px-8 py-6 text-lg cursor-pointer"
                >
                    Register Your Society
                </Button>
                <Button
                    // onClick={() => setShowAuth(true)}
                    onClick={() => console.log('true')}
                    variant="outline"
                    className="glass-button px-8 py-6 text-lg cursor-pointer"
                >
                    Sign In
                </Button>
            </div>
        </div>
    )
}

export default Hero