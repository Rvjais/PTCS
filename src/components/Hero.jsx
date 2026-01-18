import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-secondary-50">
            <div className="max-w-[1400px] w-full mx-auto relative">

                {/* Main Background Image Container */}
                <div className="relative w-full h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
                            alt="Modern Interior"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Centered Big Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-center z-10"
                        >
                            Contemporary
                        </motion.h1>
                    </div>

                    {/* Bottom Left Glass Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md"
                    >
                        <div className="glass-panel p-8 rounded-2xl text-white">
                            <p className="text-sm md:text-base text-white/90 mb-6 leading-relaxed font-light">
                                Crafting spaces that harmonize modern aesthetics with timeless elegance.
                                Our contemporary interior designs breathe life into every room,
                                redefining the essence of chic living.
                            </p>
                            <Link
                                to="/products"
                                className="glass-button inline-flex items-center px-6 py-3 rounded-full text-sm font-medium"
                            >
                                View More <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Bottom Center/Right Video Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="hidden md:block absolute bottom-12 left-1/2 transform translate-x-12"
                    >
                        <div className="glass-panel p-2 rounded-2xl w-64 h-40 relative group cursor-pointer overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                                alt="Video Preview"
                                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/50 transition-colors">
                                    <Play className="w-5 h-5 text-white fill-current" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Right Rotating Text */}
                    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 hidden lg:block">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                <path
                                    id="circlePath"
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="transparent"
                                />
                                <text className="text-[10px] uppercase font-medium tracking-widest fill-white">
                                    <textPath href="#circlePath" startOffset="0%">
                                        • Modern • Minimalist • Modern • Minimalist
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
