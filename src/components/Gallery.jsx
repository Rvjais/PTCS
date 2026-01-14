import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import galleryVideo from '../assets/gallery/Poojatech1.mp4';

const videos = [
    {
        id: 1,
        title: "Manufacturing Excellence",
        src: galleryVideo,
        category: "Industrial"
    },
    {
        id: 2,
        title: "Modern Office Spaces",
        src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Dummy video
        category: "Interior"
    },
    {
        id: 3,
        title: "Warehouse Logistics",
        src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // Dummy video
        category: "Logistics"
    },
    {
        id: 4,
        title: "Healthcare Solutions",
        src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Dummy video
        category: "Healthcare"
    }
];

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    // Calculate visible slides (showing 3 at a time on desktop effectively by shifting)
    // For a simple carousel, let's show 1 main video and previews, or a sliding track.
    // Given "make it smaller", a row of cards is best.

    return (
        <section className="py-24 bg-secondary-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary-900 via-transparent to-secondary-900" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Our Work in <span className="text-primary-400">Action</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-primary-500/80 p-3 rounded-full text-white hover:bg-primary-400 transition-colors backdrop-blur-sm hidden md:block"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-primary-500/80 p-3 rounded-full text-white hover:bg-primary-400 transition-colors backdrop-blur-sm hidden md:block"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Carousel Track */}
                    <div className="overflow-hidden py-8">
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: `-${currentIndex * 100}%` }} // Simple slide for mobile, need adjusted logic for multi-item
                        // Let's implement a more robust multi-item logic for desktop
                        >
                            {/* We'll map differently to ensure smooth infinite-like feel or just simple sliding */}
                        </motion.div>

                        {/* Revised Grid/Carousel Approach for "Smaller" look */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* We display 3 items starting from currentIndex */}
                            {[0, 1, 2].map((offset) => {
                                const index = (currentIndex + offset) % videos.length;
                                const video = videos[index];
                                return (
                                    <motion.div
                                        key={`${video.id}-${index}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group"
                                    >
                                        <div className="relative rounded-xl overflow-hidden aspect-video bg-black border border-secondary-800 shadow-xl">
                                            <video
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                                controls // Keep controls for functionality
                                                poster=""
                                            >
                                                <source src={video.src} type="video/mp4" />
                                            </video>

                                            {/* Overlay Info */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pointer-events-none">
                                                <span className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-1 block">
                                                    {video.category}
                                                </span>
                                                <h3 className="text-white font-medium text-sm md:text-base truncate">
                                                    {video.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Navigation Dots */}
                    <div className="flex justify-center gap-2 mt-8 md:hidden">
                        {videos.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary-400 w-6' : 'bg-secondary-700'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
