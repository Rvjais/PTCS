import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategorySection = ({ categories }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
                    >
                        Our Collections
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-secondary-500 max-w-2xl mx-auto"
                    >
                        Explore our wide range of products tailored for specific needs.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group rounded-2xl overflow-hidden cursor-pointer h-96"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                                <p className="text-secondary-300 mb-4 line-clamp-2">{category.description}</p>
                                <Link
                                    to={`/products?category=${category.name}`}
                                    className="inline-flex items-center text-white font-medium hover:text-primary-400 transition-colors"
                                >
                                    Explore Collection <ArrowRight className="ml-2" size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
