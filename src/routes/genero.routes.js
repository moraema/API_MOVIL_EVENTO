const express = require('express');
const router = express.Router();
const generoController = require('../controllers/genero.controllers');


router.post('/',  generoController.create);

module.exports = router;