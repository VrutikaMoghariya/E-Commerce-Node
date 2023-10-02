const CART = require('../model/cart');

exports.getAllCarts = async (req, res, next) => {

    // get all carts
    try {
        const carts = await CART.find().populate('product');
        res.status(200).json({
            status: "Success",
            message: 'Carts get Successfully',
            carts: carts,
            total: carts.length,
        });

    } catch (error) {

        res.status(400).json({
            status: "Fail",
            msg: "Carts not Found",
            data: error
        });
    }
}


exports.getUserCarts = async (req, res, next) => {
    try {

        const userId = req.userId;
        console.log(userId);
        const carts = await CART.find({ user: userId }).populate('product');

        let total = 0;
        let discountedTotal = 0;
        let totalProducts = 0 ;
        let totalQty = 0;

        carts.map((item) => {

            total = total + (item.product.price * item.qty);
            discountedTotal = discountedTotal + (item.product.price * item.qty * item.product.discountPercentage / 100);
            totalProducts++;
            totalQty = totalQty + item.qty;

        });

        res.status(200).json({
            status: "Success",
            message: 'Carts get Successfully',
            data: carts
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Carts not Found",
            error: error
        });
    }
}

//create a cart

exports.createCart = async (req, res, next) => {

    try {

        req.body.user = req.userId;

        const cart = await CART.create(req.body);
        res.status(201).json({
            status: "Success",
            message: 'Cart created Successfully',
            cart: cart,
        });

    } catch (error) {

        res.status(400).json({
            status: "Fail",
            msg: "Cart not Created",
            data: error.message
        });
    }
}

//update a cart

exports.updateCart = async (req, res, next) => {

    try {
        const cart = await CART.findByIdAndUpdate(req.query._id, req.body);
        res.status(200).json({
            status: "Success",
            message: 'Cart updated Successfully',
            cart: cart,
        });

    } catch (error) {

        res.status(400).json({
            status: "Fail",
            msg: "Cart not Updated",
            data: error
        });
    }
}

//delete a cart

exports.deleteCart = async (req, res, next) => {

    try {
        const cart = await CART.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            message: 'Cart deleted Successfully',
        });

    } catch (error) {

        res.status(400).json({
            status: "Fail",
            msg: "Cart not Deleted",
            data: error
        });
    }
}