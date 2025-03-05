const express = require('express');
const router = express.Router();
const loginAdministrador = require('../auth/login-admin');
const loginUsuario = require('../auth/login-usuario');

router.post('/login-admin', loginAdministrador.loginAdmin);
router.post('/login-usuario', loginUsuario.loginUsuario);

module.exports = router; 