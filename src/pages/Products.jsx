import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Search, Filter } from 'lucide-react';

const Products = () => {
    const { products: productsData } = useProducts();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
    const [selectedSubcategory, setSelectedSubcategory] = useState('All');

    // Reset subcategory when category changes
    React.useEffect(() => {
        setSelectedSubcategory('All');
    }, [selectedCategory]);

    // Extract unique categories
    const categories = ['All', ...new Set(productsData.map(p => p.category))];

    // Extract unique subcategories for the selected category
    const subcategories = useMemo(() => {
        if (selectedCategory === 'All') return [];
        const subs = productsData
            .filter(p => p.category === selectedCategory)
            .map(p => p.subcategory)
            .filter(Boolean); // Remove undefined/null
        return ['All', ...new Set(subs)];
    }, [selectedCategory]);

    const filteredProducts = useMemo(() => {
        return productsData.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory || (selectedCategory === 'Food Industry' && product.category === 'Food Indutries Furniture');
            const matchesSubcategory = selectedSubcategory === 'All' || product.subcategory === selectedSubcategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesSubcategory && matchesSearch;
        });
    }, [selectedCategory, selectedSubcategory, searchQuery]);

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-secondary-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 to-secondary-800/90"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                        Our <span className="text-primary-400">Products</span>
                    </h1>
                    <p className="text-xl text-secondary-300 max-w-2xl leading-relaxed">
                        Discover our extensive collection of premium furniture and equipment, designed for modern industries and healthcare facilities.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                {/* Search Bar */}
                <div className="bg-white rounded-2xl shadow-xl p-2 mb-12 max-w-4xl mx-auto flex items-center">
                    <Search className="text-secondary-400 ml-4" size={24} />
                    <input
                        type="text"
                        placeholder="Search for products, categories, or specific items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 text-lg rounded-xl border-none focus:ring-0 focus:outline-none placeholder-secondary-400 text-secondary-900"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-8 mb-12">
                    {/* Main Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-secondary-900 text-white shadow-lg scale-105'
                                    : 'bg-white text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 shadow-sm'
                                    }`}
                            >
                                {category === 'Food Indutries Furniture' ? 'Food Industry' : category}
                            </button>
                        ))}
                    </div>

                    {/* Subcategory Filter */}
                    {subcategories.length > 1 && (
                        <div className="flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
                            {subcategories.map(subcategory => (
                                <button
                                    key={subcategory}
                                    onClick={() => setSelectedSubcategory(subcategory)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${selectedSubcategory === subcategory
                                        ? 'bg-primary-50 text-primary-700 border-primary-200 shadow-sm'
                                        : 'bg-transparent text-secondary-500 border-transparent hover:bg-white hover:shadow-sm'
                                        }`}
                                >
                                    {subcategory}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-secondary-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 mb-4">
                            <Search className="text-secondary-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-secondary-900 mb-2">No products found</h3>
                        <p className="text-secondary-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
