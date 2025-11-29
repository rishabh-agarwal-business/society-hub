import { Building2 } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-slate-200/50 dark:border-slate-800/50 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid sm:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="glass-morphism p-2 rounded-2xl">
                                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-slate-900 dark:text-white tracking-tight">SocietyHub</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">
                            The future of society management. Simplifying community living with technology.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Demo
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Updates
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Cookie Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    GDPR
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200/50 dark:border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-600 dark:text-slate-400 text-center md:text-left">
                        © 2025 SocietyHub. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Sitemap
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer