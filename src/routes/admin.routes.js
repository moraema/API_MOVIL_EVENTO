const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin.controllers');
const middlewareController = require('../middlewares/auth.middleware');

router.post('/',  adminControllers.create);
router.delete('/:id', middlewareController.verificarJwt, adminControllers.deleteAdministrador);

module.exports = router;