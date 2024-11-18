const jwt = require('jsonwebtoken');
const { handleHttpError } = require('../utils/handleError')
const { verificarToken } = require('../services/index')


const authenticateToken = async (req, res, next) => {
    let token = null;

    // Intentar obtener el token del encabezado
    if (req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
            token = parts[1];
        }
    }

    // Si no está en el encabezado, buscar en el cuerpo
    if (!token && req.body.token) {
        const parts = req.body.token.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
            token = parts[1];
        }
    }

    // Validar si se obtuvo el token
    if (!token) {
        throw new Error("Token not provided or invalid format");
    }

    console.log(token);
    if (token) {
        jwt.verify(token, '2C44-4D44-WppQ38S', async (err, decoded) => {
            if (err) {

                return next({
                    error: (err instanceof Error) ? err : JSON.stringify(err),
                    status: 401,
                    message: "Se expiro el token"
                });
            }
            //Validando si es el usuario que se encuentra en session

            if (req.session.user && req.session.user.dni === decoded.dni) {
                res.json({ message: 'Acceso autorizado 3', user: decoded.dni });
            } else {
                res.status(401).json({ message: 'Acceso no autorizado 4' });
            }

            next();
        });
    } else {
        return next({
            error: "Token no encontrado",
            status: 403,
            message: "Token no encontrado"
        });
    }
};

module.exports = { authenticateToken };