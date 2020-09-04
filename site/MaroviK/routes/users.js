var express = require('express');
var router = express.Router();

const controller = require('../controllers/usersController');
/* GET users listing. */
router.get('/profile', controller.view_user_profile);

//router.get("/login", controller);

module.exports = router;
