var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const cartController = require('../controller/cart');

router.get('/user-cart', auth, cartController.getUserCart);

router.post('/addToCart', auth, cartController.addToCart);

router.post('/updateQty' , auth , cartController.updateProductQty)

router.delete('/removeProduct', auth, cartController.removeProduct);


module.exports = router;
