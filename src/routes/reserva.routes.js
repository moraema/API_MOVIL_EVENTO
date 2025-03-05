const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controllers');

router.post('/', reservaController.create);

module.exports = router;