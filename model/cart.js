const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema =  new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product model
            },
            qty: {
                type: Number,
                default: 1,
            },
        },
    ],
    total: {
        type: Number,
        default: 0,
    },
    discountedTotal: {
        type: Number,
        default: 0,
    },
    totalProducts: {
        type: Number,
        default: 0,
    },
    totalQuantity: {
        type: Number,
        default: 0,
    },
});

const CART = mongoose.model('cart', cartSchema);

module.exports = CART;
