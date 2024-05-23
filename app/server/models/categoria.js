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
        allowNull: true,  // Es NULL según la imagen
        field: 'abreviatura'
    },
    denominacion: {
        type: Sequelize.STRING(255),
        allowNull: true,  // Es NULL según la imagen
        field: 'denominacion'
    },
    descripcion: {
        type: Sequelize.STRING(255),  // Cambiado de TEXT a STRING(255)
        allowNull: true,  // Es NULL según la imagen
        field: 'descripcion'
    },
    foto_referente: {
        type: Sequelize.STRING(255),
        allowNull: true,  // Es NULL según la imagen
        field: 'foto_referente'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: 'updatedAt'
    },

}, {
    tableName: 'categoria',
    timestamps: true
});
