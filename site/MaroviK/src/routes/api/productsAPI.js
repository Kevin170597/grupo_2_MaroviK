var express = require('express');
var router = express.Router();
const productsController = require("../../controllers/api/productsController");

router.get('/listar', productsController.list);
router.get('/:id', productsController.id);

module.exports = router;