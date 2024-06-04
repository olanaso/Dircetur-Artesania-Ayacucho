const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('libro_programa', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    programa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'programa_id'
    },
    libro_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'libro_id'
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
    tableName: 'libro_programa',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
