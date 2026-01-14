import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-secondary-100"
        >
            <div className="aspect-w-4 aspect-h-3 bg-secondary-50 overflow-hidden relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Action Button */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <Link
                        to={`/products?category=${product.category}`}
                        className="block w-full py-3 bg-white/90 backdrop-blur-sm text-secondary-900 text-center text-sm font-semibold rounded-xl hover:bg-primary-600 hover:text-white transition-colors shadow-lg"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full mb-2">
                        {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-secondary-900 leading-tight group-hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>
                </div>

                {product.subcategory && (
                    <p className="text-sm text-secondary-500 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-300"></span>
                        {product.subcategory}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default ProductCard;
