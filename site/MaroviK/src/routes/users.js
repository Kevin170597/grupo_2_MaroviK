/******************   MÓDULOS   *******************/

var express = require('express');
var router = express.Router();

/******************   CONTROLADORES   *******************/

let controller = require("../controllers/usersController");

/******************   VALIDACIONES   *******************/

let registerValidator = require("../validators/registerValidator");
let loginValidator = require("../validators/loginValidator");
let updatePasswordValidator = require("../validators/updatePasswordValidator");

/******************   MIDDLEWARES   *******************/

const multerAvatar = require("../middlewares/multerAvatar");
const sessionUserCheck = require('../middlewares/sessionUserCheck');

/******************   RUTAS   *******************/

/* GET users listing. */

router.get("/register", controller.register);
router.post("/register", multerAvatar.any(), registerValidator, controller.processRegister);

router.get("/login", controller.login);
router.post("/login", loginValidator, controller.processLogin);

router.get("/password", sessionUserCheck, controller.updatePasswordView);
router.put("/updatepassword/:id", updatePasswordValidator, controller.updatePassword);

router.get("/profile", sessionUserCheck, controller.viewProfile)

router.get('/profile/admin',  sessionUserCheck, controller.viewAdminProfile);
router.get("/searchupdate", sessionUserCheck, controller.search);

router.put('/updateProfile/:id', multerAvatar.any(),  sessionUserCheck, controller.updateProfile);
router.delete('/delete/:id',  sessionUserCheck, controller.delete);
router.get('/logout', controller.logout);

router.get('/add/cart', sessionUserCheck, controller.viewCart);
router.delete('/add/cart/:id', sessionUserCheck, controller.deleteAddProduct);

module.exports = router;