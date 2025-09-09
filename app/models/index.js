const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

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


db.Usuario = require("./usuario.model.js")(sequelize, DataTypes);
db.Estudiante = require("./estudiante.model.js")(sequelize, DataTypes);
db.Maestro = require("./maestro.model.js")(sequelize, DataTypes);
db.Curso = require("./curso.model.js")(sequelize, DataTypes);
db.Asignacion = require("./asignacion.model.js")(sequelize, DataTypes);
db.Grado = require("./grado.model.js")(sequelize, DataTypes);


db.Curso.hasMany(db.Grado, { foreignKey: "cursoId", as: "grados" });
db.Grado.belongsTo(db.Curso, { foreignKey: "cursoId", as: "curso" });

db.Estudiante.hasMany(db.Grado, { foreignKey: "estudianteId", as: "grados" });
db.Grado.belongsTo(db.Estudiante, { foreignKey: "estudianteId", as: "estudiante" });

db.Maestro.hasMany(db.Curso, { foreignKey: "maestroId", as: "cursos" });
db.Curso.belongsTo(db.Maestro, { foreignKey: "maestroId", as: "profesor" });

db.Estudiante.hasMany(db.Asignacion, { foreignKey: "estudianteId", as: "asignaciones" });
db.Asignacion.belongsTo(db.Estudiante, { foreignKey: "estudianteId", as: "estudiante" });

db.Curso.hasMany(db.Asignacion, { foreignKey: "cursoId", as: "asignaciones" });
db.Asignacion.belongsTo(db.Curso, { foreignKey: "cursoId", as: "curso" });

db.Usuario.hasOne(db.Maestro, { foreignKey: "usuarioId", as: "maestro" });
db.Maestro.belongsTo(db.Usuario, { foreignKey: "usuarioId", as: "usuario" });

db.Usuario.hasOne(db.Estudiante, { foreignKey: "usuarioId", as: "estudiante" });
db.Estudiante.belongsTo(db.Usuario, { foreignKey: "usuarioId", as: "usuario" });


console.log("DEBUG: Modelos cargados:");
console.log("Estudiante:", !!db.Estudiante);
console.log("Maestro:", !!db.Maestro);
console.log("Curso:", !!db.Curso);

module.exports = db;
