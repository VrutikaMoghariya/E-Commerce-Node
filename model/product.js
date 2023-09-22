const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
    },
    rating: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "category",
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ]
})

const PRODUCT = mongoose.model('product', productSchema);

module.exports = PRODUCT;