const {check} = require('express-validator')
const {validateResults} = require('../utils/handleValidator')
const usuario = require('../models/usuario')

// const validatorUpdateUsuario = [
//     check('nombre_completo').custom(async nombre_completo =>{
//         const usuarioEncontrado = await usuario.findOne({where: {nombre_completo}})
//         if(!usuarioEncontrado){
//
//         }
//
//     })
//
// ]
