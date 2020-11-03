/******************   MÓDULOS   *******************/
var express = require('express');
var router = express.Router();

/******************   MIDDLEWARES   *******************/

const cookieCheck = require('../middlewares/cookieCheck');
/******************   CONTROLADORES   *******************/
var controller = require('../controllers/mainController');

/******************   RUTAS   *******************/
router.get('/', cookieCheck, controller.index);
router.get('/nosotros', controller.nosotros);

module.exports = router;
