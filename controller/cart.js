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

    } else {

        // get all carts
        try {

            const carts = await CART.find().populate('product').populate('user');
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
}


exports.getUserCarts = async (req, res, next) => {
    try {
        const userId = req.userId;

        const carts = await CART.aggregate([
            {
                $match: {
                    user: mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$products"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "products.product"
                }
            },
            {
                $addFields: {
                    "products.qty": "$products.qty"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    user: { $first: "$user" },
                    products: { $push: "$products" },
                    total: { $first: "$total" },
                    discountedTotal: { $first: "$discountedTotal" },
                    totalProducts: { $first: "$totalProducts" },
                    totalQuantity: { $first: "$totalQuantity" },
                }
            }
        ]);

        const response = {
            carts: carts.map((cart) => ({
                id: cart._id,
                products: cart.products.map((product) => ({
                    id: product.product[0]._id,
                    title: product.product[0].title,
                    price: product.product[0].price,
                    quantity: product.qty,
                    total: product.product[0].price * product.qty,
                    discountPercentage: product.product[0].discountPercentage,
                    discountedPrice: product.product[0].discountedPrice
                })),
                total: cart.total,
                discountedTotal: cart.discountedTotal,
                userId: cart.user[0]._id, // Assuming there's only one user per cart
                totalProducts: cart.totalProducts,
                totalQuantity: cart.totalQuantity
            })),
            total: carts.length
        };

        res.status(200).json({
            status: "Success",
            message: 'Carts fetched successfully',
            data: response
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Carts not found",
            error: error
        });
    }
}

//create a cart

exports.createCart = async (req, res, next) => {

    try {

        req.body.user = req.userId;

        const cart = await CART.create(req.body);
        res.status(200).json({
            status: "Success",
            message: 'cart created successfully',
            cart: cart,
        });

    } catch (error) {

        res.status(500).json({
            status: "Fail",
            msg: "cart not created",
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
        });

    } catch (error) {

        res.status(500).json({
            status: "Fail",
            msg: "cart not deleted",
            data: error
        });
    }
}