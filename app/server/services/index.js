require('../config/config');
const jwt = require('jsonwebtoken');
module.exports = {
    createToken: async (usuarioDB)=>{
        const payload = {
            usuario: usuarioDB
        };

        console.log(payload);
        //Firmar el jwt
       return  await jwt.sign(payload,
            process.env.PALABRA_CLAVE, {
                expiresIn: process.env.CADUCIDAD_TOKEN
        }) ;

    }
};