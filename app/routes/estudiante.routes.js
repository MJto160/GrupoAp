const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudiante.controller');

//crear rutas para estudiantes
router.post('/', estudianteController.crearEstudiante);
router.get('/', estudianteController.obtenerEstudiantes);
router.get('/:id', estudianteController.obtenerEstudiantePorId);
router.put('/:id', estudianteController.actualizarEstudiante);
router.put('/:id/estado', estudianteController.darBajaAltaEstudiante);
router.delete('/:id', estudianteController.eliminarEstudiante);

module.exports = router;
