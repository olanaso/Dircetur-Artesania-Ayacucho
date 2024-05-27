/* jshint indent: 1 */
const db = require('../config/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

module.exports = sequelize.define('categoria', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    abreviatura: {
        type: Sequelize.STRING(10),
        allowNull: true,
        field: 'abreviatura'
    },
    denominacion: {
        type: Sequelize.STRING(155),
        allowNull: true,
        field: 'denominacion'
    },
    descripcion: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'descripcion'
    },
    foto_referente: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'foto_referente'
    },
    usuariocreacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariocreacion_id'
    },
    usuariomodificion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariomodificion_id'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updatedAt'
    }
}, {
    tableName: 'categoria',
    timestamps: true
});
