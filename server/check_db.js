import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/poojatech';

const checkDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const count = await Product.countDocuments();
        console.log(`Product count: ${count}`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkDb();
