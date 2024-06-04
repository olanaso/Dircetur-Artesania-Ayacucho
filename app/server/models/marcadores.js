const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('marcadores', {
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
    nropagina: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'nropagina'
    },
    detalle: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'detalle'
    }
}, {
    tableName: 'marcadores',
    timestamps: false,
});
