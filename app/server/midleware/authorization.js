const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || req.body.token;
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