/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
DataTypes = db.Sequelize;

module.exports = sequelize.define('accesos', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    cliente: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    productoid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    producto: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ip: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    horario: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    horaacceso: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fecha_cliente: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dispositivo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'createdat',
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'updatedat',
    },

}, {
    tableName: 'accesos',
    timestamps: false,
});