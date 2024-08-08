const jwt = require('jsonwebtoken');
const {handleHttpError} = require('../utils/handleError')
const {verificarToken} = require('../services/index')


const authenticateToken = async (req, res, next) => {


    try{
        if(!req.headers.authorization){
            console.log(req.headers.authorization)
            handleHttpError(res, 'No existe token',401)
            return
        }
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verificarToken(token)
        console.log(dataToken)
        next()
    }catch(e){
        handleHttpError(res, 'No autorizado',401)
    }

};

module.exports = { authenticateToken };