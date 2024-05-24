/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('artesano', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuario_id'
    },
    ruc: {
        type: Sequelize.CHAR(11),
        allowNull: true,
        field: 'ruc'
    },
    foto1: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'foto1'
    },
    foto2: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'foto2'
    },
    ubigeo: {
        type: Sequelize.STRING(6),
        allowNull: true,
        field: 'ubigeo'
    },
    lugar_nacimiento: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'lugar_nacimiento'
    },
    region: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'region'
    },
    distrito: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'distrito'
    },
    provincia: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'provincia'
    },
    lengua_materna: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'lengua_materna'
    },
    info_taller: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'info_taller',
    },
    list_videos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_videos',
    },
    list_especialidadtecnicas: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_especialidadtecnicas',
    },
    list_contactos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_contactos',
    },
    list_reconocimientos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_reconocimientos',
    },
    list_medios_pago: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_medios_pago',
    },
    estado: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
        field: 'estado'
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
    tableName: 'artesano',
    timestamps: true

});
