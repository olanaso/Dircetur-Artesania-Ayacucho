const { handleHttpError } = require('../utils/handleError')


const checkRol = (rolesValidos) => (req, res, next) => {
    try {
        // const {usuario} = req

        const roleByUser = req.headers.rol
        const checkValueRol = rolesValidos.some((rolSingle) => roleByUser.includes(rolSingle))
        if (!checkValueRol) {
            handleHttpError(res, 'No tienes permisos para acceder a este recurso', 401)
            return
        }
        next()
    } catch (e) {
        handleHttpError(res, 'No tienes permiso para este recurso', 401)
        console.error(e)
    }
}

module.exports = { checkRol }