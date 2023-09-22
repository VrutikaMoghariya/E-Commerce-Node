var express = require('express');
var router = express.Router();

const categoryController = require('../controller/category');


router.get('/' , categoryController.allCategory);

router.post('/add' , categoryController.addCategory);

router.post('/update' , categoryController.updateCategory);

router.delete('/delete' , categoryController.deleteCategory);


module.exports = router;