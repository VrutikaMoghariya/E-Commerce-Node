var express = require('express');
var router = express.Router();

const productController = require('../controller/product');
const multer = require('multer');


router.get('/' , productController.allProducts);

router.get('/search' , productController.searchProduct);

router.get('/categories' , productController.allCategories);

// const uploadImages = multer.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }])

router.post('/add'  , productController.addProduct);

router.post('/update' , productController.updateProduct);

router.delete('/delete', productController.deleteProduct);

module.exports = router;




