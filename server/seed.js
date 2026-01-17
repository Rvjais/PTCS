import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/poojatech';

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const productsPath = path.join(__dirname, '../src/data/products.json');
        const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

        // Clear existing data
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert new data
        await Product.insertMany(productsData);
        console.log(`Seeded ${productsData.length} products`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
