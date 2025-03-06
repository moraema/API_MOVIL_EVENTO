const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controllers');
const middlewareController = require('../middlewares/auth.middleware');

router.post('/', middlewareController.verificarJwt, reservaController.create);

module.exports = router;