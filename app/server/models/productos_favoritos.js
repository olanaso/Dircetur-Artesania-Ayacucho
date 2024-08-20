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

/**
 * Obtener todos los productos deseados de un cliente por su id
 * @param idCliente
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
productosFavoritos.findAllWishProductsByClientId = async (idCliente) => {
    return await productosFavoritos.findAll(
        {where : {id_cliente: idCliente},
            attributes: ['id_producto', 'id_cliente'],
        include: [  // include para traer los datos del del producto
            {
                model: producto,
                as: 'datosProducto',
                attributes: ['artesano_id', 'nombres_es', 'precio', 'imagen_principal', 'lst_imagenes'],
                include: [ //include para traer los datos del artesano
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