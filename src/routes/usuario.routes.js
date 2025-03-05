const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controllers');

router.post('/', usuarioController.create);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;