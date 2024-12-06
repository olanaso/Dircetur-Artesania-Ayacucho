require('../config/config');

const jwt = require('jsonwebtoken');

const createToken = async (usuarioDB)=>{
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

const verificarToken = async (tokenJwt) =>{
    try{
        return jwt.verify(tokenJwt, process.env.PALABRA_CLAVE)
    }catch(e){
        console.error(e)
        return null
    }

}

module.exports = {createToken, verificarToken}