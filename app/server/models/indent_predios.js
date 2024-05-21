/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('indent_predios', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        epoch: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'epoch'
        },
        departamento: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'departamento'
        },
    codigo: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'codigo'
    },
        provincia: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'provincia'
        },
        distrito: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'distrito'
        },
        tramo: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'tramo'
        },
        referencia: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'referencia'
        },
        latitude: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'latitude'
        },
        longitude: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'longitude'
        },
        accuracy: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'accuracy'
        },
        equipo: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'equipo'
        },
        ip: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'ip'
        },
        fotos: {
            type: Sequelize.JSON,
            allowNull: true,
            field: 'fotos'
        },

        observaciones: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'observaciones'
        },
        usuario: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'usuario'
        }
    }, {
        tableName: 'indent_predios',

    }
);

