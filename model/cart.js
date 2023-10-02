const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
       type:String,
       require : true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        require : true,
        unique: true
    },
    qty: {
        type: Number,
        default: 1,
    }
});

const CART = mongoose.model('cart', cartSchema);

module.exports = CART;
