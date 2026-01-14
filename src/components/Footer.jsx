import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-primary-400">Poojatech</h3>
                        <p className="text-secondary-400 text-sm leading-relaxed">
                            Providing high-quality furniture and healthcare equipment with a focus on durability, aesthetics, and functionality.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-secondary-400 hover:text-primary-400 transition-colors">Home</Link></li>
                            <li><Link to="/products" className="text-secondary-400 hover:text-primary-400 transition-colors">Products</Link></li>
                            <li><Link to="/contact" className="text-secondary-400 hover:text-primary-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-secondary-400">
                                <MapPin size={20} className="text-primary-400 shrink-0" />
                                <span>123 Industrial Area, Phase 2, New Delhi, India</span>
                            </li>
                            <li className="flex items-center space-x-3 text-secondary-400">
                                <Phone size={20} className="text-primary-400 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3 text-secondary-400">
                                <Mail size={20} className="text-primary-400 shrink-0" />
                                <span>info@poojatech.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
                        <p className="text-secondary-400 text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-secondary-800 border border-secondary-700 rounded-lg px-4 py-2 text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500"
                            />
                            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-secondary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-secondary-500 text-sm">
                        © {new Date().getFullYear()} Poojatech. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-secondary-500 hover:text-primary-400 transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="text-secondary-500 hover:text-primary-400 transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-secondary-500 hover:text-primary-400 transition-colors"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
