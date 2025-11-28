// Recommended way (tree-shakable)
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const Contact = () => {
    const [contactForm, setContactForm] = useState<ContactFormType>({ name: '', email: '', message: '' });

    const handleContactSubmit = (event: FormEvent<HTMLFormElement>): void => {
        throw new Error('Function not implemented.')
    }

    return (
        <div id="contact" className="relative z-10 max-w-7xl mx-auto px-6 py-20" >
            <div className="glass-card rounded-3xl p-12">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-slate-900 dark:text-white text-4xl mb-4">Get in Touch</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-slate-900 dark:text-white mb-1">Email</div>
                                    <div className="text-slate-600 dark:text-slate-400">support@societyhub.com</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-slate-900 dark:text-white mb-1">Phone</div>
                                    <div className="text-slate-600 dark:text-slate-400">+91 1800-123-4567</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-slate-900 dark:text-white mb-1">Address</div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        Tech Tower, Cyber City,<br />
                                        Gurugram, Haryana 122002
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="text-slate-900 dark:text-white mb-4">Follow Us</div>
                            <div className="flex gap-3">
                                <button className="glass-morphism p-3 rounded-xl hover:scale-105 transition-transform">
                                    <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </button>
                                <button className="glass-morphism p-3 rounded-xl hover:scale-105 transition-transform">
                                    <Twitter className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                </button>
                                <button className="glass-morphism p-3 rounded-xl hover:scale-105 transition-transform">
                                    <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                </button>
                                <button className="glass-morphism p-3 rounded-xl hover:scale-105 transition-transform">
                                    <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleContactSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="contact-name" className="text-slate-700 dark:text-slate-300">
                                    Your Name
                                </Label>
                                <Input
                                    id="contact-name"
                                    type="text"
                                    placeholder="John Doe"
                                    className="glass-input"
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact-email" className="text-slate-700 dark:text-slate-300">
                                    Email Address
                                </Label>
                                <Input
                                    id="contact-email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="glass-input"
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact-message" className="text-slate-700 dark:text-slate-300">
                                    Message
                                </Label>
                                <Textarea
                                    id="contact-message"
                                    placeholder="Tell us how we can help you..."
                                    className="glass-input min-h-[150px] resize-none"
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full glass-button-primary py-6 text-lg">
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Contact