const CATEGORY = require('../model/category');


// get all category

exports.allCategory = async (req, res, next) => {

    try {
        const category = await CATEGORY.find();
        res.status(200).json({
            status: "Success",
            message: 'Category get successfully',
            category: category,
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Category not Found",
            data: error
        });
    }
}



// Add a new category

exports.addCategory = async (req, res, next) => {

    try {
        const category = await CATEGORY.create(req.body);
        res.status(201).json({
            status: "Success",
            message: 'Category added successfully',
            category: category,
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Category not added",
            data: error
        });
    }
}


// update category

exports.updateCategory = async (req, res, next) => {

    try {
        const category = await CATEGORY.findByIdAndUpdate(req.query._id, req.body);
        res.status(200).json({
            status: "Success",
            message: 'Category updated successfully',
            category: category,
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Category not updated",
            data: error
        });
    }
}

// Delete a product

exports.deleteCategory = async (req, res, next) => {

    try {
        const category = await CATEGORY.findByIdAndDelete(req.query._id);
        res.status(200).json({
            status: "Success",
            message: 'Category deleted successfully',
            category: category,
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            msg: "Category not deleted",
            data: error
        });
    }
}




