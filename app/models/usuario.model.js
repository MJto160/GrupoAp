// usuario.model.js
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        rol: { type: DataTypes.ENUM('admin','maestro','estudiante'), allowNull: false }
    }, { tableName: 'usuarios', timestamps: true });

    return Usuario;
    
};

