import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-secondary-900 mb-4">Get in Touch</h1>
                    <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
                        Have questions about our products or need a custom quote? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-secondary-50 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-secondary-900 mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-lg text-primary-600">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-secondary-900">Our Location</p>
                                        <p className="text-secondary-500">123 Industrial Area, Phase 2<br />New Delhi, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-lg text-primary-600">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-secondary-900">Phone Number</p>
                                        <p className="text-secondary-500">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-100 p-3 rounded-lg text-primary-600">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-secondary-900">Email Address</p>
                                        <p className="text-secondary-500">info@poojatech.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-64 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070"
                                alt="Office"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary-100">
                        <h3 className="text-xl font-bold text-secondary-900 mb-6">Send us a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Message</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary-600 text-white font-medium py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                            >
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
