var express = require('express');
var router = express.Router();

const productController = require('../controller/product');


router.get('/' , productController.allProducts);

router.get('/search' , productController.searchProduct);

router.get('/categories' , productController.allCategories);

router.post('/add' , productController.addProduct);

router.post('/update' , productController.updateProduct);

router.delete('/delete', productController.deleteProduct);

module.exports = router;
