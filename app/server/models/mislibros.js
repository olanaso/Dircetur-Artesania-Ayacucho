const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('mislibros', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    libroid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'libroid'
    },
    usuarioid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuarioid'
    },
    paginainicio: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'paginainicio'
    },
    paginafin: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'paginafin'
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
    tableName: 'mislibros',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
