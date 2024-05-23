const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('slider', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    descripcion: {
        type: Sequelize.STRING(250),
        allowNull: true,
        field: 'descripcion'
    },
    imagen: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'imagen'
    },
    usuariocreacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        field: 'usuariocreacion_id'
    },
    usuariomodificacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        field: 'usuariomodificacion_id'
    },
    createdate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'createdAt'
    },
    updatedate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updatedAt'
    }
}, {
    tableName: 'slider',
    timestamps: true,
});