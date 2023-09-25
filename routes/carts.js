var express = require('express');
var router = express.Router();

const cartController = require('../controller/cart');

router.get('/', cartController.getAllCarts);

router.post('/add' , cartController.createCart);

router.post('/update' , cartController.updateCart);

router.delete('/delete' , cartController.deleteCart);


module.exports = router;
