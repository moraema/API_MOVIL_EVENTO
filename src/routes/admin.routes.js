const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin.controllers');

router.post('/', adminControllers.create);
router.delete('/:id', adminControllers.deleteAdministrador);

module.exports = router;