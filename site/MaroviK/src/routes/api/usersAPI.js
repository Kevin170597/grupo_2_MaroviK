var express = require('express');
var router = express.Router();
const usersController = require("../../controllers/api/usersController");

router.get('/listar', usersController.list);
router.get('/:id', usersController.id);
router.get("/email/:email", usersController.validatorEmail);

module.exports = router;