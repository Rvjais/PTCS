import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/poojatech';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images

// Routes
app.use('/api/products', productRoutes);

// Database Connection
// Database Connection (Removed - using file system)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

