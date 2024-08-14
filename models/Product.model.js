const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    images: [String],
    stock: { type: Number, required: true },
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number },
            review: { type: String },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    averageRating: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
