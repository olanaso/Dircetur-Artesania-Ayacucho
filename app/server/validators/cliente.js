const {check} = require('express-validator')
const {validateResults} = require('../utils/handleValidator')
const cliente = require('../models/cliente')

/**
 * Validamos que no se modifique el id del usuario, para eso validamos que
 * no se envie el campo usuario_id en el body
 * @type {(ValidationChain|(function(*, *, *): *))[]}
 */
const validatorUpdateCliente = [
    check('usuario_id').custom(async (usuarioId, {req}) => {
        if(req.body.usuario_id){
           throw new Error("No puedes modificar el id del usuario")
        }
        return true
    }),
    (req, res, next) =>{
        return validateResults(req, res, next)
    }
]

module.exports = {validatorUpdateCliente}