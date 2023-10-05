const CART = require('../model/cart');
const PRODUCT = require('../model/product');

exports.getUserCart = async (req, res, next) => {
    try {
        const userId = req.userId;
        const carts = await CART.aggregate([
            { $match: { user: userId } },
            { $unwind: '$products' },
            {
                $lookup: {
                    from: 'products', // this should be the actual name of your products collection
                    localField: 'products.product',
                    foreignField: '_id',
                    as: 'products.productInfo'
                }
            },
            { $unwind: '$products.productInfo' },
            {
                $group: {
                    _id: '$_id',
                    user: { $first: '$user' },
                    products: {
                        $push: {
                            product: '$products.productInfo',
                            qty: '$products.qty',
                            total: '$products.total',
                            discountedPrice: '$products.discountedPrice'
                        }
                    }
                }
            },
            {
                $addFields: {
                    totalBill: {
                        $sum: '$products.total'
                    },
                    totalQty: {
                        $sum: '$products.qty'
                    },
                    totalDiscountedPrice: {
                        $sum: '$products.discountedPrice'
                    },
                    totalProducts: {
                        $size: '$products',
                    },
                }
            }
        ]);

        res.status(200).json({
            status: "Success",
            msg: 'Carts get Successfully',
            carts: carts
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Carts not Found",
            error: error
        });
    }
}

//create a cart

exports.addToCart = async (req, res, next) => {
    try {
        let { product, qty, total, discountedPrice } = req.body;
        userId = req.userId;
        let cart = await CART.findOne({ user: userId });
        product = await PRODUCT.findOne({ _id: req.body.product });
        total = product.price;
        discountedPrice = Math.floor(total * product.discountPercentage / 100);
        product = req.body.product;

        if (!cart) {

            cart = await CART.create({
                user: userId,
                products: [{ product, qty, total, discountedPrice }],
            });

        } else {
            let existingProduct = cart.products.find((p) => p.product.equals(req.body.product));
            if (existingProduct) {
                existingProduct.qty += 1;
                existingProduct.total += total;
                existingProduct.discountedPrice += discountedPrice;
                await cart.save();
            } else {
                cart = await CART.updateOne(
                    { _id: cart._id },
                    {
                        $push: {
                            products: { product, qty, total, discountedPrice },
                        },
                    }
                );
            }
        }
        res.status(200).json({
            status: "Success",
            msg: 'Product Add to cart Successfully',
        });

    } catch (error) {

        res.status(500).json({
            status: "Fail",
            msg: 'Product not added to Cart',
            error: error
        });
    }
}

// update qty pf product

exports.updateProductQty = async (req, res, next) => {
    try {

        const userId = req.userId;
        const productId = req.query.productId;
        const newQty = req.body.qty;

        // Find the user's cart
        let cart = await CART.findOne({ user: userId });

        // Find the product data
        const productData = await PRODUCT.findById(productId);

        // Check if the cart and product exist
        if (!cart || !productData) {
            return res.status(404).json({
                status: 'Fail',
                msg: 'Cart or product not found',
            });
        }

        // Find the product in the cart's products array
        cart.products.map((p) => {
            if (p.product._id.toString() === productId) {
                p.qty = newQty;
                p.total = newQty * productData.price;
                p.discountedPrice = Math.floor(
                    p.total * (productData.discountPercentage / 100)
                );
            }
        });

     await CART.findByIdAndUpdate(cart._id, cart);

        res.status(200).json({
            status: 'Success',
            msg: 'Product qty updated successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            msg: 'Product qty not updated',
            error: error.message,
        });
    }
}

//delete a cart

exports.removeProduct = async (req, res, next) => {

    try {

        const userId = req.userId;
        const productId = req.query.productId;
        const cart = await CART.findOne({ user: userId });

        if (!cart) {
            res.status(404).json({ message: 'Your Cart is Empty' });
        }

        cart.products = cart.products.filter((p) => !p.product._id.equals(productId));

        if (cart.products.length == 0) {

            await CART.findByIdAndDelete({ _id: cart._id });
            res.status(200).json({
                status: "Success",
                msg: 'Cart deleted',
            });

        } else {

            await cart.save();
            res.status(200).json({
                status: "Success",
                msg: 'Product removed from cart successfully',
            });
        }
        
    } catch (error) {

        res.status(400).json({
            status: "Fail",
            msg: "Product not removed from cart successfully",
            error: error
        });
    }
}