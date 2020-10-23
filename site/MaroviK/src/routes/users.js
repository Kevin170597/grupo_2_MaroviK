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
const sessionUserCheck = require('../middlewares/sessionUserCheck');

/******************   RUTAS   *******************/

/* GET users listing. */

router.get("/register", controller.register);
router.post("/register", multerAvatar.any(), registerValidator, controller.processRegister);

router.get("/login", controller.login);
router.post("/login", loginValidator, controller.processLogin);

router.get("/profile", sessionUserCheck, controller.viewProfile)
router.get('/profile/admin',  sessionUserCheck, controller.viewAdminProfile);
router.put('/updateProfile/:id', multerAvatar.any(),  sessionUserCheck, controller.updateProfile);
router.delete('/delete/:id',  sessionUserCheck, controller.delete);
router.get('/logout', controller.logout);

module.exports = router;