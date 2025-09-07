const db = require("../models");
const Grado = db.Grado;

//Crear un grado
exports.crearGrado = async (req, res) => {
    try {
        const grado = await Grado.create(req.body);
        res.status(201).json(grado);
    } catch (error) {
        console.error("Error al crear el grado:", error);
        res.status(500).json({ message: "Error al crear el grado" });
    }
};

//Obtengo todos los grados
exports.obtenerGrados = async (req, res) => {
    try {
        const grados = await Grado.findAll();
        res.status(200).json(grados);
    } catch (error) {
        console.error("Error al obtener los grados:", error);
        res.status(500).json({ message: "Error al obtener los grados" });
    }
};

//Obtengo un grado por id
exports.obtenerGradoPorId = async (req, res) => {
    try {
        const grado = await Grado.findByPk(req.params.id);
        if (!grado) return res.status(404).json({ message: "Grado no encontrado" });
        res.status(200).json(grado);
    } catch (error) {
        console.error("Error al obtener el grado:", error);
        res.status(500).json({ message: "Error al obtener el grado" });
    }
};

//Actualizar un grado por id
exports.actualizarGrado = async (req, res) => {
    try {
        const grado = await Grado.findByPk(req.params.id);
        if (!grado) return res.status(404).json({ message: "Grado no encontrado" });

        await grado.update(req.body);
        res.json({ mensaje: 'Grado actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el grado" });
    }
};

//Eliminar un grado por id
exports.eliminarGrado = async (req, res) => {
    try {
        const grado = await Grado.findByPk(req.params.id);
        if (!grado) return res.status(404).json({ message: "Grado no encontrado" });

        await grado.destroy();
        res.json({ mensaje: 'Grado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el grado" });
    }
};
    