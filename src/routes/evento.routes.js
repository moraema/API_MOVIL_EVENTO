const express = require('express');
const router = express.Router();
const { uploadFile } = require('../service/multer/multer.service');
const eventoController = require('../controllers/evento.controllers');
const middlewareController = require('../middlewares/auth.middleware');

router.get('/', middlewareController.verificarJwt, eventoController.getEvento);
router.get('/:id',  eventoController.getEventoById);
router.patch('/:id',middlewareController.verificarJwt, uploadFile.single('imagen'), eventoController.updateEvento);
router.post('/', middlewareController.verificarJwt, uploadFile.single('imagen'), eventoController.create);
router.delete('/:id', middlewareController.verificarJwt, eventoController.deletoEvento);

module.exports = router 