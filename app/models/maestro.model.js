//const { act } = require("react");

module.exports = (sequelize, DataTypes) => {
    const Maestro = sequelize.define('Maestro', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        especialidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
 
    }, {
        tableName: 'maestro',
        timestamps: false
    });

    return  Maestro;
}
