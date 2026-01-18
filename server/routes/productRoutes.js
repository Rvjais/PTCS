import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, '../../src/data/products.json');

// Helper to read products
const readProducts = () => {
    try {
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products file:', error);
        return [];
    }
};

// Helper to write products
const writeProducts = (products) => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error writing products file:', error);
        throw error;
    }
};

// GET all products
router.get('/', (req, res) => {
    try {
        const products = readProducts();
        // Sort by createdAt if available, otherwise just return list (or reverse for "newest first" if array order implies time)
        // For JSON file, we can just return as is or reverse if we assume append-only. 
        // Let's just return them.
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create product
router.post('/', (req, res) => {
    try {
        const products = readProducts();
        const productData = req.body;

        if (!productData.id) {
            productData.id = randomUUID();
        }

        // Add createdAt timestamp
        productData.createdAt = new Date().toISOString();

        products.unshift(productData); // Add to beginning
        writeProducts(products);

        res.status(201).json(productData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update product
router.put('/:id', (req, res) => {
    try {
        const products = readProducts();
        const index = products.findIndex(p => p.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = { ...products[index], ...req.body };
        products[index] = updatedProduct;

        writeProducts(products);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE delete product
router.delete('/:id', (req, res) => {
    try {
        let products = readProducts();
        const initialLength = products.length;
        products = products.filter(p => p.id !== req.params.id);

        if (products.length === initialLength) {
            return res.status(404).json({ message: 'Product not found' });
        }

        writeProducts(products);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
