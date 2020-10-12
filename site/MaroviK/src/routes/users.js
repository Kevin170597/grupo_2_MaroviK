/******************   MÓDULOS   *******************/

var express = require('express');
var router = express.Router();

/******************   CONTROLADORES   *******************/

let controller = require("../controllers/usersController");

/******************   VALIDACIONES   *******************/

let registerValidator = require("../validators/registerValidator");
let loginValidator = require("../validators/loginValidator");

/******************   MIDDLEWARES   *******************/

const multerAvatar = require("../middlewares/multerAvatar");

/******************   RUTAS   *******************/

/* GET users listing. */

router.get("/register", controller.register);
router.post("/register", multerAvatar.any(), registerValidator, controller.processRegister);

router.get("/login", controller.login);
router.post("/login", loginValidator, controller.processLogin);

router.get('/profile', controller.viewUserProfile);
router.post('/updateProfile/:id', multerAvatar.any(), controller.updateProfile);
router.delete('/delete/:id', controller.delete);

router.get('/logout', controller.logout);

module.exports = router;