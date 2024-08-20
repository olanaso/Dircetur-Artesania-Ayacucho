const db = require('../config/db');
const {DataTypes} = require('sequelize');
const cliente = require('./cliente')
const producto = require('./producto')
const artesano = require('./artesano')
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

productosFavoritos.belongsTo(cliente, {
    foreignKey: 'id_cliente',
    as: 'datosCliente'
})

productosFavoritos.belongsTo(producto, {
    foreignKey: 'id_producto',
    as: 'datosProducto'
})

productosFavoritos.findAllWishProductsByClientId = async (idCliente) => {
    return await productosFavoritos.findAll(
        {where : {id_cliente: idCliente},
            attributes: ['id_producto', 'id_cliente'],
        include: [
            {
                model: producto,
                as: 'datosProducto',
                attributes: ['artesano_id', 'nombres_es', 'precio', 'imagen_principal', 'lst_imagenes'],
                include: [
                    {
                        model: artesano,
                        as: 'datos_artesano',
                        attributes: ['nombres', 'apellidos']
                    }
                ]
            }
        ]
    })
}


module.exports = productosFavoritos