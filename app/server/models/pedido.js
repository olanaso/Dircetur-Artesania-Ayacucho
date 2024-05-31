/* jshint indent: 1 */
const db = require('../config/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

module.exports = sequelize.define('pedido', {
    num_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'num_pedido'
    },
    artesano_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'artesano_id'
    },
    cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'cliente_id'
    },
    fecha_pedido: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'fecha_pedido'
    },
    list_productos: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
        field: 'list_productos'
    },
    imagen_pago: {
        type: Sequelize.STRING(155),
        allowNull: true,
        field: 'imagen_pago'
    },
    list_reclamo: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
        field: 'list_reclamo'
    },
    comprobante_solic: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'comprobante_solic'
    },
    estado: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'estado'
    },
    list_atencion: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
        field: 'list_atencion'
    },
    usuariocreacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariocreacion_id'
    },
    usuariomodificacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariomodificacion_id'
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
    tableName: 'pedido',
    timestamps: true
});
