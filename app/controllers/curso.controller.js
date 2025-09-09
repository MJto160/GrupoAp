const db = require("../models");
const  Curso = db.Curso;

//Creo un curso
exports.crearCurso = async (req, res) => {
    try {
        const curso = await Curso.create(req.body);
        res.status(201).json(curso);
    }catch (error) {
        console.error("Error al crear el curso:", error);
        res.status(500).json({ message: "Error al crear el curso" });
    }
};

//obtengo los cursos 
exports.obtenerCursos = async (req, res) => {
    try {
        const { estudianteId } = req.query; // capturamos el query param

        let cursos;
        if (estudianteId) {
            // Filtrar cursos de ese estudiante
            cursos = await Curso.findAll({ where: { estudianteId } });
        } else {
            // Todos los cursos
            cursos = await Curso.findAll();
        }

        res.status(200).json(cursos);
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        res.status(500).json({ message: "Error al obtener los cursos" });
    }
};

//obtener curso por id
exports.obtenerCursoPorId = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if(!curso) return res.status(404).json({ message: "Curso no encontrado" });
        res.status(200).json(curso);
    } catch (error) {
        console.error("Error al obtener el curso:", error);
        res.status(500).json({ message: "Error al obtener el curso" });
    }
};

//Actualizar curso
exports.actualizarCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if(!curso) return res.status(404).json({ message: "Curso no encontrado" });

        await curso.update(req.body);
        res.json({mensaje: 'Curso actualizado correctamente'});
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el curso" });
    }
};

//Eliminar curso
exports.eliminarCurso = async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if(!curso) return res.status(404).json({ message: "Curso no encontrado" });

        await curso.destroy();
        res.json({mensaje: 'Curso eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el curso" });
    }
};