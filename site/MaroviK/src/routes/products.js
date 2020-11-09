/******************   MÓDULOS   *******************/

var express = require('express');
var router = express.Router();

/******************   CONTROLADORES   *******************/

var controller = require('../controllers/productsController');

/******************   MIDDLEWARES   *******************/

const sessionUserCheck = require('../middlewares/sessionUserCheck');
const multerProduct = require('../middlewares/multerProduct');
const productsValidator = require('../validators/productsValidator');


/******************   RUTAS   *******************/

//router.get('/', controller.view_products);

router.get('/add', sessionUserCheck, controller.viewProductAdd);
//router.get("/search", controller.search);
router.get('/add/form', sessionUserCheck, controller.viewProductAdd);
router.get("/detail/:idproduct", controller.viewProductDetail);

router.get('/show/:id', sessionUserCheck, controller.viewProductShow);
router.put('/edit/:id', multerProduct.any(), sessionUserCheck, productsValidator, controller.updateProduct);
router.delete('/delete/:id', sessionUserCheck, controller.deleteProduct);


router.get('/:categoria', controller.viewForCategory);
router.get("/:categoria/:subcategoria", controller.viewForSubcategory);

router.post('/detail/:idproduct', controller.addCart);
router.post('/add/form', multerProduct.any(), sessionUserCheck, productsValidator, controller.publicProduct);

module.exports = router;