const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require("./usuario.model.js")(sequelize, Sequelize.DataTypes);
db.Estudiante = require("./estudiante.model.js")(sequelize, Sequelize.DataTypes);
db.Maestro = require("./maestro.model.js")(sequelize, Sequelize.DataTypes);
db.Curso = require("./curso.model.js")(sequelize, Sequelize,Sequelize.DataTypes);
db.Asignacion = require("./asignacion.model.js")(sequelize, Sequelize,Sequelize.DataTypes);
db.Grado = require("./grado.model.js")(sequelize, Sequelize.DataTypes);


//esto es la relacion entre curso y grado
db.Curso.hasMany(db.Grado, { foreignKey: "cursoId", as: "grados" });
db.Grado.belongsTo(db.Curso, { foreignKey: "cursoId", as: "curso" });

//relacion entre estudiante y grado
db.Estudiante.hasMany(db.Grado, { foreignKey: "estudianteId", as: "grados" });
db.Grado.belongsTo(db.Estudiante, { foreignKey: "estudianteId", as: "estudiante" });

//relacion entre maestro y curso
db.Maestro.hasMany(db.Curso, { foreignKey: "maestroId", as: "cursos" });
db.Curso.belongsTo(db.Maestro, { foreignKey: "maestroId", as: "profesor" });

//relacion entre estudiante y curso a traves de asignacion
db.Estudiante.hasMany(db.Asignacion, { foreignKey: "estudianteId", as: "asignaciones" });
db.Asignacion.belongsTo(db.Estudiante, { foreignKey: "estudianteId", as: "estudiante" });

//relacion entre curso y estudiante a traves de asignacion
db.Curso.hasMany(db.Asignacion, { foreignKey: "cursoId", as: "asignaciones" });
db.Asignacion.belongsTo(db.Curso, { foreignKey: "cursoId", as: "curso" });

//relacion de usuario con maestro
db.Usuario.hasOne(db.Maestro,{ foreignKey: "usuarioId", as: "maestro"});
db.Maestro.belongsTo(db.Usuario,{ foreignKey: "usuarioId", as: "usuario"});


//Relacion estudiante con usuario
db.Usuario.hasOne(db.Estudiante,{ foreignKey: "usuarioId", as: "estudiante"});
db.Estudiante.belongsTo(db.Usuario,{ foreignKey: "usuarioId", as: "usuario"});



module.exports = db;
