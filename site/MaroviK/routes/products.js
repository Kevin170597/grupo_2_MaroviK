var express = require('express');
var router = express.Router();

var controller = require('../controllers/productsController');

//router.get('/', controller.view_products);
router.get('/detail/:id', controller.view_product_detail);
router.get('/:categoria', controller.view_for_category);
router.get('/:categoria/:subcategoria', controller.view_for_subcategory);



module.exports = router;