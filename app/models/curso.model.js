// curso.model.js
module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define('Curso', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING, allowNull: false },
        codigo: { type: DataTypes.STRING, allowNull: false, unique: true },
        semestre: { type: DataTypes.STRING, allowNull: false },
        creditos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        maestroId: { type: DataTypes.INTEGER, allowNull: false } // quitar referencias directas
    }, { tableName: 'curso', timestamps: false });

    return Curso;
};
