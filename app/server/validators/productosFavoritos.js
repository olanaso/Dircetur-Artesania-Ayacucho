const {check} = require('express-validator')
const {validateResults} = require('../utils/handleValidator')
const productosFavoritos = require('../models/productos_favoritos')

/**
 * Funcion que valida que un usuario no registre el mismo pedidop
 * @type {(ValidationChain|(function(*, *, *): *))[]}
 */
const ValidatorCreateWishProduct = [
    check('id_producto').exists().withMessage('El id del producto es requerido'),
    check('id_cliente').exists().withMessage('El id del cliente es requerido'),
    check(['id_producto', 'id_cliente']).custom(async (value, {req}) =>{
        const {id_producto, id_cliente} = req.body
        //busca el producto del cliente en la base de datos
        const wishProduct = await productosFavoritos.findOne(
            {where: {id_producto, id_cliente}})
        if(wishProduct){ //si existe
            throw new Error('El producto ya se encuentra en la lista de deseados')
        }
        return true
    }),
    (req, res, next) =>{
        return validateResults(req, res, next)
    }
]

module.exports = {ValidatorCreateWishProduct}