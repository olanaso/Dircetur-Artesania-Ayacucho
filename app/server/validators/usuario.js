const {check} = require('express-validator')
const {validateResults} = require('../utils/handleValidator')
const usuario = require('../models/usuario')

const validatorUpdatePasswordCliente = [

    //validacion de existencia de usuario
    check().custom(async(_,{req}) =>{
        const{id} = req.params
        const usuarioEncontrado = await usuario.findUsuarioById(id)
        if(!usuarioEncontrado){
            throw new Error("El usuario no existe")
        }
    }),
    //validacion de contrasenia actual
    check('clave').custom(async(clave, {req})=>{
        const{id} = req.params
        const usuarioEncontrado = await usuario.findUsuarioById(id)
        if(clave !== usuarioEncontrado.clave){
            throw new Error("La contraseña no coincide con la actual")
        }
    }),
    //validacion de si la contrasenia nueva es la misma que la actual
    check('clave').custom(async(clave, {req}) =>{
        const{contraseniaNueva} = req.body
        if(clave === contraseniaNueva){
            throw new Error("La contraseña nueva es la misma que la actual")
        }
    }),
    //validacion de contrasenia nueva
    check('contraseniaNueva').notEmpty().withMessage('El campo de contraseña nueva es obligatorio'),
    check('contraseniaConfirmacion').notEmpty().withMessage('El campo de confirmación es obligatorio'),
    check('contraseniaNueva').custom(async(contraseniaNueva, {req}) =>{
        if(contraseniaNueva !== req.body.contraseniaConfirmacion){
            throw new Error("Las contrasenias no coinciden")
        }
    }),
    (req, res, next) => {
        return validateResults(req,res,next)
    }

]

module.exports = {validatorUpdatePasswordCliente}
