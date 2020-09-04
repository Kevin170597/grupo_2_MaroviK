var express = require('express');
var router = express.Router();

let controller = require("../controllers/usersController");
let registerValidator = require("../validators/registerValidator");
//let loginValidator = require("../validators/loginValidator");

/* GET users listing. */
router.get('/profile', controller.view_user_profile);

router.get("/register", controller.register);
router.post("/register", registerValidator, controller.processRegister);

router.get("/login", controller.login);
router.post("/login", /*loginValidator, controller.processLogin*/);

module.exports = router;