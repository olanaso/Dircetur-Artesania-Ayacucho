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
    DNI: {
        type: Sequelize.STRING(8),
        allowNull: true,
        field: 'DNI'
    },
    RUC: {
        type: Sequelize.STRING(11),
        allowNull: true,
        field: 'RUC'
    },
    NOMBRES: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'NOMBRES'
    },
    APELLIDOS: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'APELLIDOS'
    },
    CORREO: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'CORREO'
    },
    CELULAR: {
        type: Sequelize.STRING(20),
        allowNull: true,
        field: 'CELULAR'
    },
    FOTO1: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'FOTO1'
    },
    FOTO2: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'FOTO2'
    },
    UBIGEO: {
        type: Sequelize.STRING(6),
        allowNull: true,
        field: 'UBIGEO'
    },
    LUGARNACIMIENTO: {
        type: Sequelize.STRING(300),
        allowNull: true,
        field: 'LUGARNACIMIENTO'
    },
    TIPOLENGUA: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'TIPOLENGUA'
    },
    LOGINID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'LOGINID'
    },
    list_especialidadtecnicas: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_especialidadtecnicas'
    },
    list_contactos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_contactos'
    },
    list_reconocimientos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_reconocimientos'
    },
    list_medios_pago: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'list_medios_pago'
    },
    ESTADO: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'ESTADO'
    },
    USUARIOCREACION_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'USUARIOCREACION_id'
    },
    USUARIOMODIFICACION_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'USUARIOMODIFICACION_id'
    }

}, {
    tableName: 'artesano',
    timestamps: true

});
