import React, { createContext, useState, useEffect, useContext } from 'react';
import initialProducts from '../data/products.json';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:5000/api/products';

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message);
            // Fallback to initial data if needed, or just empty
            if (products.length === 0) setProducts(initialProducts);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            if (!response.ok) throw new Error('Failed to add product');
            const newProduct = await response.json();
            setProducts(prev => [newProduct, ...prev]);
        } catch (err) {
            console.error('Error adding product:', err);
            alert('Failed to add product');
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });
            if (!response.ok) throw new Error('Failed to update product');
            const result = await response.json();
            setProducts(prev => prev.map(p => p.id === id ? result : p));
        } catch (err) {
            console.error('Error updating product:', err);
            alert('Failed to update product');
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete product');
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('Failed to delete product');
        }
    };

    // Function to reset to default data (Optional: could re-seed DB)
    const resetProducts = async () => {
        // For now, just reload from API or clear
        fetchProducts();
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, addProduct, updateProduct, deleteProduct, resetProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
