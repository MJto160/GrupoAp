const db = require("../models");
const Asignacion = db.Asignacion;

//Creo una asignacion
exports.crearAsignacion = async (req, res) => {
    try {
        const asignacion = await Asignacion.create(req.body);
        res.status(201).json(asignacion);
    }catch (error) {
        console.error("Error al crear la asignacion:", error);
        res.status(500).json({ message: "Error al crear la asignacion" });
    }
};

//obtengo las asignaciones
exports.obtenerAsignaciones = async (req, res) => {
    try {
        const asignaciones = await Asignacion.findAll();
        res.status(200).json(asignaciones);
    } catch (error) {
        console.error("Error al obtener las asignaciones:", error);
        res.status(500).json({ message: "Error al obtener las asignaciones" });
    }
};

//obtener asignacion por id
exports.obtenerAsignacionPorId = async (req, res) => {
    try {
        const asignacion = await Asignacion.findByPk(req.params.id);
        if(!asignacion) return res.status(404).json({ message: "Asignacion no encontrada" });
        res.status(200).json(asignacion);
    } catch (error) {
        console.error("Error al obtener la asignacion:", error);
        res.status(500).json({ message: "Error al obtener la asignacion" });
    }
};

//Actualizar asignacion
exports.actualizarAsignacion = async (req, res) => {
    try {
        const asignacion = await Asignacion.findByPk(req.params.id);
        if(!asignacion) return res.status(404).json({ message: "Asignacion no encontrada" });

        await asignacion.update(req.body);
        res.json({mensaje: 'Asignacion actualizada correctamente'});
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la asignacion" });
    }
};

//Eliminar asignacion
exports.eliminarAsignacion = async (req, res) => {
    try {
        const asignacion = await Asignacion.findByPk(req.params.id);
        if(!asignacion) return res.status(404).json({ message: "Asignacion no encontrada" });

        await asignacion.destroy();
        res.json({mensaje: 'Asignacion eliminada correctamente'});
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la asignacion" });
    }
};