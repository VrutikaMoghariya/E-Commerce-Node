var express = require('express');
var router = express.Router();

const paymentController = require('../controller/payment');


router.post('/createpayment', paymentController.createPayment);

module.exports = router;
