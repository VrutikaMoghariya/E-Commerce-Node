var express = require('express');
var router = express.Router();
const multer = require('../middleware/multer');

var userController = require('../controller/user');


router.get('/', userController.getAllUser);

router.post('/login' , userController.loginUser);

router.post('/add' , userController.addUser);


module.exports = router;
