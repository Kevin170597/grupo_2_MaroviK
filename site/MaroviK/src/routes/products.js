/******************   MÓDULOS   *******************/

var express = require('express');
var router = express.Router();

/******************   CONTROLADORES   *******************/

var controller = require('../controllers/productsController');

/******************   MIDDLEWARES   *******************/

const sessionUserCheck = require('../middlewares/sessionUserCheck');
const multerProduct = require('../middlewares/multerProduct');


/******************   RUTAS   *******************/

//router.get('/', controller.view_products);

router.get('/add', sessionUserCheck, controller.viewProductAdd);
router.get("/search", controller.search);
router.get('/add/form', sessionUserCheck, controller.viewProductAdd);
router.get("/detail/:idproduct", controller.view_product_detail);

router.get('/show/:id', sessionUserCheck, controller.view_product_show);
router.put('/edit/:id', multerProduct.any(), sessionUserCheck, controller.update_product);
router.delete('/delete/:id', sessionUserCheck, controller.delete_product);


router.get('/:categoria', controller.view_for_category);
router.get("/categorias/:subcategoria", controller.view_for_subcategory);


router.post('/add/form', multerProduct.any(), sessionUserCheck, controller.publicProduct);

module.exports = router;