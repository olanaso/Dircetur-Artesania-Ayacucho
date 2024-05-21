/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('libros', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    iestp: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'iestp'
    },
    carrera: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'carrera'
    },
     fecha_registro: {
        type: Sequelize.DATEONLY, 
        allowNull: true,
        field: 'fecha_registro'
    },
    libro: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'libro'
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'autor'
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'usuario'
    },
    modalidad: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'modalidad'
    },
    ip: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'ip'
    }

}, {
    tableName: 'accesos',
    timestamps: false,
});