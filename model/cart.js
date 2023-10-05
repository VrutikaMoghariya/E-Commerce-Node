const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            _id : false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
                required: true,
            },
            qty: {
                type: Number,
                default: 1
            },
            total: {
                type: Number
            },
            discountedPrice: {
                type: Number
            }
        }
    ]
});

const CART = mongoose.model('cart', cartSchema);

module.exports = CART;
