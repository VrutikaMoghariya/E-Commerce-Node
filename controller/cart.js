const CART = require('../model/cart');
const PRODUCT = require('../model/product');

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

        let carts = await CART.find({ user: userId }).populate('product');

        let total = 0;
        let discountedTotal = 0;
        let totalProducts = 0;
        let totalQty = 0;

        carts.map((item) => {

            total = total + (item.product.price * item.qty);
            discountedTotal = discountedTotal + (item.product.price * item.qty * item.product.discountPercentage / 100);
            totalProducts++;
            totalQty = totalQty + item.qty;

        });

        carts = await CART.aggregate([
            {
                $match: {
                    user: userId,
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product",
                }
            },
            {
                $addFields: {
                    total: {
                        $sum: product.price
                    },
                    discountedTotal: discountedTotal,
                    totalProducts: totalProducts,
                    totalQty: {
                        $sum: qty
                    }
                }
            }
        ]);

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

        let { product, qty, total, discountedPrice } = req.body;

        userId = req.userId;
        let cart = await CART.findOne({ user: userId });
        product = await PRODUCT.findOne({ _id: req.body.product });
        total = product.price;
        discountedPrice = total * product.discountPercentage / 100;


        if (!cart) {

            cart = await CART.create({
                user: userId,
                products: [{ product, qty, total, discountedPrice }],
            });

            console.log("cart : " + cart);


        } else {

            let existingProduct = cart.products.find((p) => p.product.equals(req.body.product));
            if (existingProduct) {

                existingProduct.qty += 1;
                existingProduct.total += total;
                existingProduct.discountedPrice += discountedPrice;

            } else {
                cart.products.push({ product, qty, total, discountedPrice });
            }

            await cart.save();
        }

        res.status(200).json({
            status: "Success",
            message: 'Product Add to cart Successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: 'Product not added to Cart',
        });
    }
}

//update a cart

exports.updateCart = async (req, res, next) => {

    try {

        const cart = await CART.updateOne({ 'product._id': req.query.productId }, { $set: { qty: req.body.qty } });
        console.log(cart);
        res.status(200).json({
            status: "Success",
            message: 'Cart item updated Successfully',
            cart: cart,
        });

    } catch (error) {

        res.status(400).json({
            status: "Fail",
            msg: "Cart item not Updated",
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