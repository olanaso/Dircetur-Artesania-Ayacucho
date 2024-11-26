/* jshint indent: 1 */
const db = require('../config/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const { Op } = require('sequelize');

const accesos = sequelize.define('accesos', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    cliente: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'cliente'
    },
    clienteid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'clienteid'
    },
    productoid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'productoid'
    },
    producto: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'producto'
    },
    ip: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'ip'
    },
    horario: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'horario'
    },
    palabrasclave: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'palabrasclave'
    },
    horaacceso: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'horaacceso'
    },
    fecha_cliente: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'fecha_cliente'
    },
    dispositivo: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'dispositivo'
    },
    url: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'url'
    },
    createdat: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        field: 'createdat'
    },
    updatedat: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        field: 'updatedat'
    }
}, {
    tableName: 'accesos',
    timestamps: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat'
});


module.exports = accesos;
