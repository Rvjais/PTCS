import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Custom string ID for frontend compatibility
    name: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    image: { type: String }, // Base64 string or URL
    importPath: { type: String }, // Import path for asset reference
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Transform _id to id for frontend compatibility
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
