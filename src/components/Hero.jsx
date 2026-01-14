import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative h-[90vh] flex items-center overflow-hidden bg-secondary-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 via-secondary-900/80 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Elevate Your Space with <span className="text-primary-400">Premium Design</span>
                        </h1>
                        <p className="text-lg md:text-xl text-secondary-300 mb-8 leading-relaxed">
                            Discover our curated collection of high-quality furniture and healthcare equipment.
                            Designed for comfort, durability, and modern aesthetics.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-secondary-900 bg-primary-400 hover:bg-primary-300 transition-colors md:text-lg"
                            >
                                Explore Products
                                <ArrowRight className="ml-2 -mr-1" size={20} />
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 border border-secondary-600 text-base font-medium rounded-full text-white hover:bg-secondary-800 transition-colors md:text-lg"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
