const express = require('express');
const router = express.Router();
const { uploadFile } = require('../service/multer/multer.service');
const eventoController = require('../controllers/evento.controllers');

router.get('/', eventoController.getEvento);
router.get('/:id', eventoController.getEventoById);
router.patch('/:id',uploadFile.single('imagen'), eventoController.updateEvento);
router.post('/', uploadFile.single('imagen'), eventoController.create);
router.delete('/:id', eventoController.deletoEvento);

module.exports = router