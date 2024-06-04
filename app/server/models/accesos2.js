const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('accesos', {
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
    usuario: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'usuario'
    },
    libro: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'libro'
    },
    autor: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'autor'
    },
    programa: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'programa'
    },
    ip: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'ip'
    },
    iestp: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'iestp'
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
    tableName: 'accesos',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
