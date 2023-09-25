const CART = require('../model/cart');

exports.getAllCarts = async (req, res, next) => {

    if (req.query._id) {    // get single cart

        try {
            const _id = req.query._id;
            const cart = await CART.findById(_id).populate('user').populate('products');
            res.status(200).json({
                status: "Success",
                message: 'cart get successfully',
                cart: cart,
            });

        } catch (error) {

            res.status(500).json({
                status: "Fail",
                msg: "Product not found",
                data: error
            });
        }

    } else if (req.query.userId) {       // get  carts of user
        try {
            const userId = req.query.userId;
            const carts = await CART.find({ userId: userId }).populate('user').populate('products');
            res.status(200).json({
                status: "Success",
                message: 'carts get successfully',
                carts: carts,
                total: carts.length,
            });

        } catch (error) {
            res.status(500).json({
                status: "Fail",
                msg: "carts not found",
                data: error
            });

        }
    }
    else {      // get all carts
        try {
            const carts = await CART.find().populate('products').populate('user');
            res.status(200).json({
                status: "Success",
                message: 'carts get successfully',
                carts: carts,
                total: carts.length,
            });

        } catch (error) {

            res.status(500).json({
                status: "Fail",
                msg: "Product not found",
                data: error
            });
        }
    }
}


//create a cart

exports.createCart = async (req, res, next) => {


    try {
        // const cart = await CART.create(req.body);
        res.status(200).json({
            status: "Success",
            message: 'cart created successfully',
            cart: cart,
        });

    } catch (error) {

        res.status(500).json({
            status: "Fail",
            msg: "cart not created",
            data: error
        });
    }
}

//update a cart

exports.updateCart = async (req, res, next) => {

    try {
        const cart = await CART.findByIdAndUpdate(req.query._id, req.body);
        res.status(200).json({
            status: "Success",
            message: 'cart updated successfully',
            cart: cart,
        });

    } catch (error) {

        res.status(500).json({
            status: "Fail",
            msg: "cart not updated",
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
            message: 'cart deleted successfully',
            cart: cart,
        });

    } catch (error) {

        res.status(500).json({
            status: "Fail",
            msg: "cart not deleted",
            data: error
        });
    }
}