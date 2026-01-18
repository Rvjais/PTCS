import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { Plus, Edit2, Trash2, Search, X, Save, Image as ImageIcon, Download, Package, Layers, Grid, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubcategory, setSelectedSubcategory] = useState('All');

    // UI States for "Add New" toggles
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isNewSubcategory, setIsNewSubcategory] = useState(false);

    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [loginError, setLoginError] = useState('');

    React.useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === 'muhmelele') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'true');
            setLoginError('');
        } else {
            setLoginError('Invalid password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_auth');
    };

    const initialFormState = {
        name: '',
        category: '',
        subcategory: '',
        image: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    // Extract unique categories
    const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

    // Extract unique subcategories based on selected category for FILTER
    const subcategories = useMemo(() => {
        if (selectedCategory === 'All') return [];
        const subs = products
            .filter(p => p.category === selectedCategory)
            .map(p => p.subcategory)
            .filter(Boolean);
        return ['All', ...new Set(subs)];
    }, [products, selectedCategory]);

    // Extract unique subcategories based on form category for MODAL
    const formSubcategories = useMemo(() => {
        if (!formData.category || isNewCategory) return [];
        const subs = products
            .filter(p => p.category === formData.category)
            .map(p => p.subcategory)
            .filter(Boolean);
        return [...new Set(subs)];
    }, [products, formData.category, isNewCategory]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSubcategory = selectedSubcategory === 'All' || product.subcategory === selectedSubcategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesSubcategory && matchesSearch;
        });
    }, [products, selectedCategory, selectedSubcategory, searchQuery]);

    // Reset subcategory filter when category changes
    React.useEffect(() => {
        setSelectedSubcategory('All');
    }, [selectedCategory]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            updateProduct(editingProduct.id, formData);
        } else {
            addProduct(formData);
        }
        closeModal();
    };

    const openModal = (product = null) => {
        setIsNewCategory(false);
        setIsNewSubcategory(false);
        if (product) {
            setEditingProduct(product);
            setFormData(product);
        } else {
            setEditingProduct(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData(initialFormState);
        setIsNewCategory(false);
        setIsNewSubcategory(false);
    };

    const handleDownloadJson = () => {
        const dataStr = JSON.stringify(products, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'products.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // Stats
    const stats = [
        { label: 'Total Products', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Categories', value: categories.length - 1, icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Subcategories', value: new Set(products.map(p => p.subcategory).filter(Boolean)).size, icon: Grid, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel w-full max-w-md p-8 rounded-2xl relative z-10"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Admin Access</h2>
                        <p className="text-white/70">Enter your credentials to manage the catalog</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all"
                                placeholder="Enter password"
                            />
                        </div>
                        {loginError && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-300 text-sm text-center bg-red-500/20 py-2 rounded-lg"
                            >
                                {loginError}
                            </motion.p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3 bg-white text-secondary-900 rounded-xl hover:bg-white/90 transition-colors font-bold text-lg shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50 pb-20 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-secondary-900 tracking-tight">Dashboard</h1>
                        <p className="text-secondary-500 mt-1">Manage your product catalog and inventory.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                        <button
                            onClick={handleDownloadJson}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-secondary-700 border border-secondary-200 rounded-xl hover:bg-secondary-50 transition-colors shadow-sm font-medium"
                        >
                            <Download size={20} />
                            <span className="hidden sm:inline">Export JSON</span>
                        </button>
                        <button
                            onClick={() => openModal()}
                            className="flex items-center gap-2 px-5 py-2.5 bg-secondary-900 text-white rounded-xl hover:bg-secondary-800 transition-colors shadow-lg shadow-secondary-900/20 font-medium"
                        >
                            <Plus size={20} />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 flex items-center gap-4"
                        >
                            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-secondary-500 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden">

                    {/* Filters Bar */}
                    <div className="p-6 border-b border-secondary-100 flex flex-col md:flex-row gap-4 items-center bg-secondary-50/50">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products, categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full md:w-48 px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            {subcategories.length > 0 && (
                                <select
                                    value={selectedSubcategory}
                                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                                    className="w-full md:w-48 px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none cursor-pointer animate-in fade-in slide-in-from-left-4 duration-300"
                                >
                                    {subcategories.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    {/* Product Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary-50/50 border-b border-secondary-100 text-xs uppercase text-secondary-500 font-semibold tracking-wider">
                                    <th className="px-8 py-5">Product</th>
                                    <th className="px-6 py-5">Category</th>
                                    <th className="px-6 py-5">Subcategory</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-100">
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-secondary-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary-100 border border-secondary-200 shadow-sm flex-shrink-0">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-secondary-400">
                                                            <ImageIcon size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-semibold text-secondary-900">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-secondary-600">{product.subcategory}</td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openModal(product)}
                                                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this product?')) {
                                                            deleteProduct(product.id);
                                                        }
                                                    }}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-secondary-400">
                                                <Package size={48} className="mb-4 opacity-50" />
                                                <p className="text-lg font-medium text-secondary-600">No products found</p>
                                                <p className="text-sm">Try adjusting your search or filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={closeModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10"
                        >
                            <div className="p-6 border-b border-secondary-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                <h2 className="text-xl font-bold text-secondary-900">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={closeModal} className="text-secondary-400 hover:text-secondary-600 transition-colors p-2 hover:bg-secondary-50 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-secondary-700">Product Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                            placeholder="e.g. Modern Sofa"
                                        />
                                    </div>

                                    {/* Category Field with Toggle */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="block text-sm font-semibold text-secondary-700">Category</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsNewCategory(!isNewCategory);
                                                    setFormData(prev => ({ ...prev, category: '' }));
                                                    if (!isNewCategory) {
                                                        setIsNewSubcategory(true);
                                                        setFormData(prev => ({ ...prev, category: '', subcategory: '' }));
                                                    }
                                                }}
                                                className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                                            >
                                                {isNewCategory ? 'Select Existing' : '+ Add New'}
                                            </button>
                                        </div>
                                        {isNewCategory ? (
                                            <input
                                                type="text"
                                                required
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                                placeholder="Enter new category name"
                                                autoFocus
                                            />
                                        ) : (
                                            <select
                                                required
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none cursor-pointer"
                                            >
                                                <option value="">Select Category</option>
                                                {categories.filter(c => c !== 'All').map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>

                                    {/* Subcategory Field with Toggle */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="block text-sm font-semibold text-secondary-700">Subcategory</label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsNewSubcategory(!isNewSubcategory);
                                                    setFormData(prev => ({ ...prev, subcategory: '' }));
                                                }}
                                                className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                                                disabled={isNewCategory} // Force new subcategory if category is new
                                            >
                                                {isNewSubcategory ? 'Select Existing' : '+ Add New'}
                                            </button>
                                        </div>
                                        {isNewSubcategory || isNewCategory ? (
                                            <input
                                                type="text"
                                                value={formData.subcategory}
                                                onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                                                className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
                                                placeholder="Enter new subcategory name"
                                            />
                                        ) : (
                                            <select
                                                value={formData.subcategory}
                                                onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none cursor-pointer"
                                                disabled={!formData.category}
                                            >
                                                <option value="">Select Subcategory</option>
                                                {formSubcategories.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-secondary-700">Description</label>
                                    <textarea
                                        value={formData.description || ''}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none resize-none transition-all"
                                        placeholder="Detailed product description..."
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-secondary-700">Product Image</label>
                                    <div className="flex items-start gap-6">
                                        <div className="w-32 h-32 rounded-xl border-2 border-dashed border-secondary-300 flex items-center justify-center overflow-hidden bg-secondary-50 relative group hover:border-primary-500 transition-colors">
                                            {formData.image ? (
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center text-secondary-400">
                                                    <ImageIcon size={32} className="mb-2" />
                                                    <span className="text-xs">Upload</span>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <p className="text-sm text-secondary-500 leading-relaxed">
                                                Upload a high-quality image for your product.
                                                <br />Supported formats: JPG, PNG, WebP.
                                                <br />Recommended size: 800x800px.
                                            </p>
                                            {formData.image && (
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, image: '' })}
                                                    className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
                                                >
                                                    Remove Image
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-end gap-3 border-t border-secondary-100">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-6 py-2.5 text-secondary-700 bg-secondary-100 rounded-xl hover:bg-secondary-200 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-secondary-900 text-white rounded-xl hover:bg-secondary-800 transition-colors flex items-center gap-2 font-medium shadow-lg shadow-secondary-900/20"
                                    >
                                        <Save size={18} />
                                        {editingProduct ? 'Save Changes' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
