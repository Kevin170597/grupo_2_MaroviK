var express = require('express');
var router = express.Router();

let controller = require("../controllers/usersController");
let registerValidator = require("../validators/registerValidator");
//let loginValidator = require("../validators/loginValidator");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/register", controller.register);
router.post("/register", registerValidator, controller.processRegister);

router.get("/login", controller.login);
router.post("/login", /*loginValidator, controller.processLogin*/);

module.exports = router;