const db = require('../config/db');
const {DataTypes} = require('sequelize');
sequelize = db.sequelize;

const productosFavoritos = sequelize.define('productos_favoritos',
    {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
    },
    {
        timestamps: true,
        underscored: true,
        tableName: 'productos_favoritos',

})

module.exports = productosFavoritos