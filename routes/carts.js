var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

const cartController = require('../controller/cart');

router.get('/' , cartController.getAllCarts);

router.get('/user-carts', auth , cartController.getUserCarts);

router.post('/add' , auth ,  cartController.createCart);

router.post('/update' , auth , cartController.updateCart);

router.delete('/delete' ,  auth  , cartController.deleteCart);


module.exports = router;
