const express = require('express');
const router = express.Router();
const gradoController = require('../controllers/grado.controller');

//rutas para grados 
router.post('/', gradoController.crearGrado);
router.get('/', gradoController.obtenerGrados);
router.get('/:id', gradoController.obtenerGradoPorId);
router.put('/:id', gradoController.actualizarGrado);
router.delete('/:id', gradoController.eliminarGrado);

module.exports = router;