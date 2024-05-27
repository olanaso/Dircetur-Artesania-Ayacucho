/* jshint indent: 1 */
const db = require('../config/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

module.exports = sequelize.define('historial_atencion', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'pedido_id'
    },
    comentario: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'comentario'
    },
    estado_atencion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'estado_atencion'
    },
    notificar_cliente: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
        field: 'notificar_cliente'
    },
    subida_archivo: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'subida_archivo'
    },
    fecha_atencion: {
        type: Sequelize.DATE(6),
        allowNull: true,
        field: 'fecha_atencion'
    },
    usuariocreacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariocreacion_id'
    },
    usuariomodificacion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariomodificacion'
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
    tableName: 'historial atencion',
    timestamps: true
});
