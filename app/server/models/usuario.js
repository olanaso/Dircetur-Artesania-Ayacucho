const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    dni: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'dni'
    },
    nombres: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'nombres'
    },
    apellidos: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'apellidos'
    },
    correo: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'correo'
    },
    clave: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'clave'
    },
    rolid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'rolid'
    },
    iestpid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'iestpid'
    },
    programaid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'programaid'
    },
    telefonos: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'telefonos'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'createdat'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updatedat'
    }
}, {
    tableName: 'usuario',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
