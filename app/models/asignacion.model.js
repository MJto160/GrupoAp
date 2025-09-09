module.exports = (sequelize, DataTypes) => {
    const Asignacion = sequelize.define('Asignacion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        },
        cursoId: {
            type: DataTypes.INTEGER,   
            allowNull: false,
            references: {
                model: 'curso',
                key: 'id'
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        fechaAsignacion: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },{
        tableName: 'asignaciones',
        timestamps: false
    });
    
    return Asignacion;
};
