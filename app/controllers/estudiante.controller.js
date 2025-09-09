
const db = require("../models");
const Estudiante = db.Estudiante;

// Crear un nuevo estudiante
exports.crearEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.create(req.body);
        res.status(201).json(estudiante);
    } catch (error) {
        console.error("Error al crear el estudiante:", error);
        res.status(500).json({ message: "Error al crear el estudiante" });
    }
};

// Obtener todos los estudiantes
exports.obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
        res.status(500).json({ message: "Error al obtener los estudiantes", error: error.message });
    }
};

// Obtener un estudiante por ID
exports.obtenerEstudiantePorId = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) return res.status(404).json({ message: "Estudiante no encontrado" });
        res.status(200).json(estudiante);
    } catch (error) {
        console.error("Error al obtener el estudiante:", error);
        res.status(500).json({ message: "Error al obtener el estudiante" });
    }
};

// Actualizar un estudiante por ID
exports.actualizarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) return res.status(404).json({ message: "Estudiante no encontrado" });

        await estudiante.update(req.body);
        res.json({ mensaje: 'Estudiante actualizado correctamente' });
    } catch (error) {
        console.error("Error al actualizar el estudiante:", error);
        res.status(500).json({ message: "Error al actualizar el estudiante" });
    }
};

// Eliminar un estudiante por ID
exports.eliminarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) return res.status(404).json({ message: "Estudiante no encontrado" });

        await estudiante.destroy();
        res.json({ mensaje: 'Estudiante eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar el estudiante:", error);
        res.status(500).json({ message: "Error al eliminar el estudiante" });
    }
};

// Dar de baja o alta a un estudiante (cambiar estado activo)
exports.darBajaAltaEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByPk(req.params.id);
        if (!estudiante) return res.status(404).json({ message: "Estudiante no encontrado" });

        estudiante.activo = !estudiante.activo;
        await estudiante.save();
        res.json({ mensaje: `Estudiante ${estudiante.activo ? 'habilitado' : 'deshabilitado'} correctamente` });
    } catch (error) {
        console.error("Error al cambiar el estado del estudiante:", error);
        res.status(500).json({ message: "Error al cambiar el estado del estudiante" });
    }
};
