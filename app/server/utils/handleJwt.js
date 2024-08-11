const jwt = require('jsonwebtoken')

const verificarToken = async (tokenJwt) =>{
    try{
        if(!tokenJwt){
            return null
        }
        return jwt.verify(tokenJwt.split(' ')[1], '2C44-4D44-WppQ38S')
    }catch(e){
        console.error(e)
        return null
    }
}

const tokenSign = async(user) =>{
    const sign = jwt.sign(
        {
            id: user.id,
            role: user.rolid
        },
        '2C44-4D44-WppQ38S',
        { expiresIn: '1d' }
    )
    console.log("el sign es:", sign)
    return sign
}

module.exports = {verificarToken, tokenSign}