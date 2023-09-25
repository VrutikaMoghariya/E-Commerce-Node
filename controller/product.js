const PRODUCT = require('../model/product');



// get  products from the database

exports.allProducts = async (req, res, next) => {

    if (req.query._id) {

        try {
            const _id = req.query._id;
            const product = await PRODUCT.findById(_id).populate('category');
            res.status(200).json({
                status: "Success",
                message: 'Product get successfully',
                product: product,
            })

        } catch (error) {

            res.status(400).json({
                status: "Fail",
                msg: "Product not found",
                data: error
            });
        }

    } else if (req.query.skip && req.query.limit) {

        try {
            const skip = req.query.skip;
            const limit = req.query.limit;

            const products = await PRODUCT.find().skip(skip).limit(limit).populate('category');

            res.status(200).json({
                status: "Success",
                message: 'Products get successfully',
                products: products,
                total: products.length,
            })
        } catch (error) {
            res.status(400).json({
                status: "Fail",
                msg: "Product not found",
                data: error
            });
        }
    }
    else if (req.query.category) {

        try {

            const category = req.query.category;
            const products = await PRODUCT.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category",
                    },
                },
                {
                    $match: {
                        'category.title': { $regex: new RegExp(category, 'i') }
                    }
                }
            ]);

            res.status(200).json({
                status: "Success",
                message: 'Products by category get successfully',
                products: products,
                total: products.length,
                category: category,
            })
        } catch (error) {

            res.status(400).json({
                status: "Fail",
                msg: "Product not found",
                data: error
            });
        }
    }
    else {

        try {
            const products = await PRODUCT.find().populate('category');
            res.status(200).json({
                status: "Success",
                message: 'Products get successfully',
                products: products,
                total: products.length,
            })
        } catch (error) {
            res.status(400).json({
                status: "Fail",
                msg: "Product not found",
                data: error
            });
        }
    }
}


// serach product from products collection 

exports.searchProduct = async (req, res, next) => {

    try {
        const search = req.query.q;

        // Check if the search query is provided
        if (!search) {
            return res.status(400).json({
                status: "Fail",
                message: "Search query is missing",
            });
        }

        const regex = new RegExp(search, 'i');

        const products = await PRODUCT.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $match: {
                    $or: [
                        { title: { $regex: regex } },
                        { description: { $regex: regex } },
                        { brand: { $regex: regex } },
                        { 'category.title': { $regex: regex } },
                    ]
                }
            },
        ]);

        res.status(200).json({
            status: "Success",
            message: 'Products get successfully',
            products: products,
            total: products.length,
        });

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Product not found",
            data: error
        });
    }
}


// Add a new product

exports.addProduct = async (req, res, next) => {

    try {

        req.body.thumbnail = req.files.thumbnail[0].filename;
        req.body.images = req.files.images.map((item) => {
            return item.filename;
        });

        const product = await PRODUCT.create(req.body);
        res.status(200).json({
            status: "Success",
            message: 'Product added successfully',
            product: product,
        });

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Product not added",
            data: error
        });
    }
}

// Update a product

exports.updateProduct = async (req, res, next) => {

    try {

        if (req.files.thumbnail) {
            req.body.thumbnail = req.files.thumbnail[0].filename;
        }
        if (req.files.images) {

            req.body.images = req.files.images.map((item) => {
                return item.filename;
            });
        }

        await PRODUCT.findByIdAndUpdate(req.query._id, req.body);

        res.status(200).json({
            status: "Success",
            message: 'Product updated successfully',
        });

    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Product not updated",
            data: error
        });
    }
}

// Delete a product

exports.deleteProduct = async (req, res, next) => {

    try {
        const product = await PRODUCT.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            message: 'Product deleted successfully',
            product: product,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Product not deleted",
            data: error
        });
    }
}
