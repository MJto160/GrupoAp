const express = require('express');
const router = express.Router();
const maestroController = require('../controllers/maestro.controller');

// Rutas para maestros 
router.post('/', maestroController.crearMaestro);
router.get('/', maestroController.obtenerMaestros);
router.get('/:id', maestroController.obtenerMaestroPorId);
router.put('/:id', maestroController.actualizarMaestro);
router.put('/:id/estado', maestroController.cambiarEstadoMaestro);
router.delete('/:id', maestroController.eliminarMaestro);

module.exports = router;