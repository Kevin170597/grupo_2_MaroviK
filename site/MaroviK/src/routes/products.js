var express = require('express');
var router = express.Router();

var controller = require('../controllers/productsController');

//-----------     PREPARACIÓN PARA PODER SUBIR IMAGENES       --------------
//-- Módulos  Para el manejo de imÁgenes --
const multer = require('multer');
const path = require('path');

//--Método que recibe como parámetro un objeto literal --
//-- destination(req, file, callback)
let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})

//router.get('/', controller.view_products);
router.get('/add', controller.view_product_add);
router.get('/add/form', controller.view_product_add);
router.get('/detail/:id', controller.view_product_detail);

router.get('/show/:id', controller.view_product_show);
router.put('/edit/:id', upload.any(), controller.update_product);
router.delete('/delete/:id', controller.delete_product);

router.get('/:categoria', controller.view_for_category);
router.get('/:categoria/:subcategoria', controller.view_for_subcategory);

router.post('/add/form', upload.any(), controller.public_product);

module.exports = router;