const {validationResult} = require('express-validator')

const validateResults = (req,res,next) => {
    try{
        validationResult(req).throw()
        return next()
    }catch(e){
        res.status(400)
        res.send({error: e.array()})
    }
}

module.exports = {
    validateResults
}
