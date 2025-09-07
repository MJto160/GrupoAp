const e = require("cors");
const db = require("../models");
const  Maestro = db.Maestro;

//Creo un maestro
exports.crearMaestro = async (req, res) => {
    try {
        const maestro = await Maestro.create(req.body);
        res.status(201).json(maestro);
    }catch (error) {
        console.error("Error al crear el maestro:", error);
        res.status(500).json({ message: "Error al crear el maestro" });
    }
};

//obtengo los maestros
exports.obtenerMaestros = async (req, res) => {
    try {
        const maestros = await Maestro.findAll();
        res.status(200).json(maestros);
    } catch (error) {
        console.error("Error al obtener los maestros:", error);
        res.status(500).json({ message: "Error al obtener los maestros" });
    }
};

//obtener maestros por id
exports.obtenerMaestroPorId = async (req, res) => {
    try {
        const maestro = await Maestro.findByPk(req.params.id);
        if(!maestro) return res.status(404).json({ message: "Maestro no encontrado" });
        res.status(200).json(maestro);
    } catch (error) {
        console.error("Error al obtener el maestro:", error);
        res.status(500).json({ message: "Error al obtener el maestro" });
    }
};

//Actualizo un maestro por id
exports.actualizarMaestro = async (req, res) => {
    try {
        const maestro = await Maestro.findByPk(req.params.id);
        if(!maestro) return res.status(404).json({ message: "Maestro no encontrado" });

        await maestro.update(req.body);
        res.json({mensaje: 'Maestro actualizado correctamente'});
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el maestro" });
    }
};

//Eliminar profesor
exports.eliminarMaestro = async (req, res) => {
    try {
        const maestro = await Maestro.findByPk(req.params.id);
        if(!maestro) return res.status(404).json({ message: "Maestro no encontrado" });

        await maestro.destroy();
        res.json({mensaje: 'Maestro eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el maestro" });
    }
};

//dar de baja a un maestro o altaerlo de nuevo
exports.cambiarEstadoMaestro = async (req, res) => {
    try {
        const maestro = await Maestro.findByPk(req.params.id);
        if(!maestro) return res.status(404).json({ message: "Maestro no encontrado" });

        maestro.activo = !maestro.activo; 
        await maestro.save();
        res.json({ mensaje: `Maestro ${maestro.activo ? 'habilitado' : 'deshabilitado'} correctamente` });
    } catch (error) {
        res.status(500).json({ message: "Error al cambiar el estado del maestro" });
    }
};
