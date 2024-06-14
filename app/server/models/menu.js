const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('menu', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'nombre'
    },
    enlace: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'enlace'
    },
    padreid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'padreid'
    },
    hijoid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'hijoid'
    },
    imagen: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'imagen'
    },
    estilo: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'estilo'
    },
    estado: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'estado'
    },
    rolid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'rolid'
    }, 
    orden: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'orden'
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
    tableName: 'menu',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
