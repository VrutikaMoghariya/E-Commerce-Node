var express = require('express');
var router = express.Router();

const productController = require('../controller/product');
const multer = require('../middleware/multer');


router.get('/' , productController.allProducts);

router.get('/search' , productController.searchProduct);

const uploadImages = multer.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]);

router.post('/add', uploadImages, productController.addProduct);

router.post('/update' , uploadImages , productController.updateProduct);

router.delete('/delete', productController.deleteProduct);

module.exports = router;




