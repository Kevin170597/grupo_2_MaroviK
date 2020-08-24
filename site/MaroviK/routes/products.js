var express = require('express');
var router = express.Router();

var controller = require('../controllers/productsController');

router.get('/', controller.view_products);
router.get('/:categoria', controller.view_for_category);
//router.get('/:categoria/:subcategoria', )


module.exports = router;