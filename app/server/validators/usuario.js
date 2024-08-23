const {check} = require('express-validator')
const {validateResults} = require('../utils/handleValidator')
const usuario = require('../models/usuario')

const validatorUpdatePasswordCliente = [
    //validacion de contrasenia actual
    check('clave').custom(async(clave, {req})=>{
        const{id} = req.params
        const usuarioEncontrado = await usuario.findUsuarioById(id)
        if(clave !== usuarioEncontrado.clave){
            throw new Error("La contraña no coincide con la actual")
        }
    }),
    //validacion de existencia de usuario
    check().custom(async(_,{req}) =>{
        const{id} = req.params
        const usuarioEncontrado = await usuario.findUsuarioById(id)
        if(!usuarioEncontrado){
            throw new Error("El usuario no existe")
        }
    }),
    //validacion de contrasenia nueva
    check('contraseniaNueva').notEmpty().withMessage('El campo de contraseña nueva es obligatorio'),
    check('contraseniaConfirmacion').notEmpty().withMessage('El campo de confirmación es obligatorio'),
    check('contraseniaNueva','contraseniaConfirmacion').custom(async(contraseniaNueva, contraseniaConfirmacion) =>{
        if(contraseniaNueva !== contraseniaConfirmacion){
            throw new Error("Las contrasenias no coinciden")
        }
    }),
    (req, res, next) => {
        return validateResults(req,res,next)
    }

]

module.exports = {validatorUpdatePasswordCliente}
