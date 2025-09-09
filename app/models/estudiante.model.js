// estudiante.model.js
module.exports = (sequelize, DataTypes) => {
    const Estudiante = sequelize.define('Estudiante', {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true, 
          autoIncrement: true
        },
        nombre:{
        type: DataTypes.STRING,
        allowNull: false 
        },
        carnet:{
        type: DataTypes.STRING,
        allowNull: false 
        },
        email:{ 
        type: DataTypes.STRING, 
        allowNull: false 
        },
        telefono: { 
        type: DataTypes.STRING,
        allowNull: false 
        },
        direccion: {
        type: DataTypes.STRING,
        allowNull: false 
        },
        activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    }
    }, 
    
    { tableName: 'estudiantes', timestamps: false });

    return Estudiante;
};
