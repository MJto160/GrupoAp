const e = require("cors");
const { obtenerEstudiantePorId } = require("../controllers/estudiante.controller");

module.exports = (sequelize, DataTypes) => {
    const Grado = sequelize.define('Grado', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nota: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipoEvaluacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,   
            defaultValue: DataTypes.NOW
        },
        cursoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cursos',
                key: 'id'
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        estudianteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estudiantes',
                key: 'id'
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }

    }, {
        tableName: 'grados',
        timestamps: false
    });
    
    return Grado;
};