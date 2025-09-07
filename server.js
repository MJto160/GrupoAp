const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Rutas
const asignacionRoutes = require('./app/routes/asignacion.routes');
const maestroRoutes = require('./app/routes/maestro.routes');
const estudianteRoutes = require('./app/routes/estudiante.routes');
const cursoRoutes = require('./app/routes/curso.routes');
const gradoRoutes = require('./app/routes/grado.routes');
const usuarioRoutes = require('./app/routes/usuario.routes');

//prejijo de rutas
app.use('/api/asignaciones', asignacionRoutes);
app.use('/api/maestros', maestroRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/grados', gradoRoutes);
app.use('/api/usuarios', usuarioRoutes);

//Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de la escuela' });
}
);

//Sincronizar la base de datos y luego iniciar el servidor
db.sequelize.sync({}).then(() => {
    console.log("Base de datos sincronizada");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
});

//middleware para manejar errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

