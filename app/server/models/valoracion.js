const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('valoracion', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    productoid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'productoid'
    },
    artesanoid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'artesanoid'
    },
    valor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'valor'
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
    tableName: 'valoracion',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
