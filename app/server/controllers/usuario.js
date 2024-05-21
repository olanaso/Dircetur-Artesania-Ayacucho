const sequelize = require('sequelize');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {
    Op
} = require('sequelize');
const model = require('../models/usuario');
const modelprograma = require('../models/programas');
const { listarProgramasbyIESTP } = require('../services/libros/libros');
const { reporteLibros,reporteUsuarios,reporteaccesos } = require('../services/usuario/usuario');
const iestps = require('../models/iestps');
const programas = require('../models/programas');
const rol = require('../models/rol');
const usuario = require('../models/usuario');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    obtenerDNI, loginpersonal,
    verificarToken,
    recuperarcuenta, cambiarContrasenia,importarUsuarios
    ,reportelibrosiestp, reporteaccesosiestp, reporteusuariosiestp

};

function guardar (req, res) {


    //req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //req.body.equipo=req.header('user-agent');

    model.create(req.body)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}
function actualizar (req, res) {
    model.findOne({
        where: { dni: req.params.dni }

    })
        .then(object => {
            object.update(req.body)
                .then(object => res.status(200).json(object))
                .catch(error => res.status(400).send(error))
        }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar (req, res) {

    model
        .findOne({
            where: { dni: req.body.dni }
        })
        .then(object => {
            object.destroy();
            res.status(200).json(object);
        }
        )
        .catch(error => res.status(400).send(error));
}

function obtener (req, res) {

    model.findOne({
        where: { correo: req.params.correo }
    })
        .then(resultset => {
            req.session.usuario = resultset;
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

function obtenerDNI (req, res) {

    model.findOne({
        where: { dni: req.query.dni }
    })
        .then(resultset => {
           if(resultset){
            delete resultset.clave
           }
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}
function listar (req, res) {

    model.findAll({
        where: { iestp: req.query.iestp },
        attributes: {},
        order: [['carrera', 'DESC']]
    })
        .then(resultset => {

            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

/*Guarda los datos generales de un predio*/
async function save (req, res, next) {

    console.log(req.body)
    const t = await model.sequelize.transaction();
    try {

        let object = await model.findOne({
            where: {
                dni: req.body.dni ? req.body.dni : 0
            }
        });

        if (object != null) {
            let obj = { ...object.dataValues, ...req.body }
            for (const prop in obj) {
                object[prop] = obj[prop]
            }
            object.usuaregistra_id = req.userId;
          
            await object.save({ t });
            
        } else {
            object = await model.create({ ...req.body }, { t });
              await enviarcorreoingreso (req.body);
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

async function cambiarContrasenia (req, res, next) {

    const t = await model.sequelize.transaction();
    try {

        let object = await model.findOne({
            where: {
                dni: req.body.dni ? req.body.dni : 0
            }
        });

        if (object.clave == req.body.clave_ant) {
            object.clave = req.body.clave_nueva;
            await object.save({ t });
        } else {
            object = { ischanged: false, msj: "La contraseña anterior no es correcta" }
        }
        t.commit().then();
        object.clave = '***CHISMOSON***'
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}


async function loginpersonal (req, res) {

    try {
        console.log(req.body)

        let usuarioDB = await model.findOne({
            where: {
                [Op.or]: [
                    { dni: req.body.usuario }, // Buscar por correo
                    { correo: req.body.usuario }, // Buscar por DNI
                ]
            }
        });

        if (!usuarioDB) {
            return res.status(400).json({ ok: false, message: "El usuario no existe" });
        }

        console.log(usuarioDB.dataValues)
        console.log(req.body.clave)
        let claveCorrecta = usuarioDB.dataValues.clave == req.body.clave;
        let token = null;

        if (!claveCorrecta) {
            return res.status(400).json({ ok: false, message: "Clave incorrecta" });
        }

        else {
            usuarioDB.clave = "chismoso"
            req.session.user = usuarioDB.dataValues; // Puedes almacenar cualquier informaci贸n adicional del usuario aqu铆
            console.log('Impmiendo session ----------------------')
            console.log(req.session.user);
            token = jwt.sign({ usuarioDB }, '2C44-4D44-WppQ38S', { expiresIn: '1d' });
            // Almacenar el token en una cookie para mantener la sesi贸n
            res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });


        }

        res.status(200).json({
            islogueado: true,
            usuario: usuarioDB,
            token: "Bearer " + token
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ ok: false, err });
    }
}

//para verificar la cuenta del token

async function verificarToken (req, res) {
    // Verificar si el token está presente en la cookie
    const token = req.body.token;
    console.log(token)

    if (!token) {
        return res.status(200).json({ isvalid: false, message: 'Token no valido' });
    }

    // Verificar y decodificar el token JWT
    jwt.verify(token.split(' ')[1], '2C44-4D44-WppQ38S', async (err, decoded) => {

        if (err) {
            return res.status(200).json({ isvalid: false, message: 'Token no valido' });
        }

        console.log(decoded)
        console.log('----------------------')
        console.log(req.session.user)
        let usuario = decoded.usuarioDB;
        console.log(usuario)

        const iestp = await iestps.findOne({
            where: { id: usuario.iestpid }
        });

        let programa = []
        if (usuario.rolid == 1) {
            programa = await listarProgramasbyIESTP({ iestpid: usuario.iestpid })
        }
        if (usuario.rolid == 2) {
            programa = await listarProgramasbyIESTP({ iestpid: usuario.iestpid })
        }
        if(usuario.rolid == 3) {
            programa = await programas.findAll({
                where: { id: usuario.programaid }
            });
        }


        const role = await rol.findOne({
            where: { id: usuario.rolid }
        });

        usuario.iestp = iestp;
        usuario.programas = programa;
        usuario.rol = role;


        return res.status(200).json({ isvalid: true, message: 'Token valido', usuario });
    });
}


async function recuperarcuenta (req, res) {
    try {
        let usuarioDB = await model.findOne({ where: { correo: req.body.correo } });

        if (!usuarioDB) {
            return res.status(400).json({ isRecuperado: false, message: "El correo ingresado no se ecuentra registrado" });
        }


        let result = await enviarcorreo(usuarioDB.dataValues)

        return res.status(200).send(result);

    } catch (err) {
        return res.status(500).json({ ok: false, err });
    }
}

async function enviarcorreo (usuario) {


    console.log('---------------USUARIO---------------------')
    console.log(usuario)



    return new Promise((resolve, reject) => {

        var transport = nodemailer.createTransport({
            host: "mail.biblioideas.com",
            secure: false,
            port: 25,
            auth: {
                user: "noreply@biblioideas.com", //generated by Mailtrap
                pass: "b=uQ6+(cAlET" //generated by Mailtrap
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'noreply@biblioideas.com',
            to: usuario.correo,
            subject: 'Recuperación de cuenta BiblioIdeas',
            html: `
            <h1>Recuperacion de cuenta de usuario</h1>
            <p>Usuario: ${usuario.dni}</p>
            <p>Clave: ${usuario.clave}</p>
            
            
            `
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                return reject(error)

            } else {

                return resolve({ isRecuperado: true })

            }
        });
    });


}



async function enviarcorreoingreso (usuario) { 


    console.log('---------------USUARIO---------------------')
    console.log(usuario)



    return new Promise((resolve, reject) => {

        var transport = nodemailer.createTransport({
            host: "mail.biblioideas.com",
            secure: false,
            port: 25,
            auth: {
                user: "noreply@biblioideas.com", //generated by Mailtrap
                pass: "b=uQ6+(cAlET" //generated by Mailtrap
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: 'noreply@biblioideas.com',
            to: usuario.correo,
            subject: 'Bienvenido a BiblioIdeas '+ usuario.nombres,
            html: `
            <h1>Datos de la cuenta de usuario</h1>
            <p>Usuario: ${usuario.dni}</p>
            <p>Clave: ${usuario.clave}</p>
            
            
            `
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                return reject(error)

            } else {

                return resolve({ isRecuperado: true })

            }
        });
    });


}


function esNumerico (valor) {
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}

/*Guarda los datos generales de un predio*/
async function importarUsuarios (req, res, next) {

    let listusuarios = req.body.listausuarios;
    const t = await model.sequelize.transaction();

    var listusuariosResultado = []
    try {

        for (let i = 0; i < listusuarios.length; i++) {
            //validamos que no el dni tenga 8 digitos y exista en la base de datos por el DNI
            let usuario=listusuarios[i];
            let listErrores = []
            if (String(usuario.dni).trim() == '') {
                listErrores.push('DNI vacio')
            }
            else if (String(usuario.dni).length != 8) {
                listErrores.push('Tam. de DNI diferente de 8 digitos')
            } else {
                let object = await model.findOne({
                    where: {
                        dni:usuario.dni 
                    }
                });

                if (object != null) {
                    listErrores.push('DNI ya registrado en el Sistema')
                }
            }

            //Validamos que el rol del usuario exista 
            if (!(esNumerico(usuario.rolid) && usuario.rolid >= 1 && usuario.rolid <= 3)) {
                listErrores.push("Rol invalido")
            }

            //validamos que el programa exista en la base de datos
            if (esNumerico(usuario.programaid)) {
                let object = await modelprograma.findOne({
                    where: {
                        id: usuario.programaid
                    }
                });
                if (object != null) {

                } else {
                    listErrores.push("Id de programa no existe en el sistema")
                }
            } else {
                listErrores.push("Id de programa invalido no es numerico")
            }

            //validamos que el nombre no sea vaicio

            if (usuario.nombres.trim().length == 0) {
                listErrores.push("El nombres no tiene valor o es nulo")
            }

            //validamos que el apellidos no sea vaicio
            if (usuario.apellidos.trim().length == 0) {
                listErrores.push("El apellidos no tiene valor o es nulo")
            }
            //Validamos que el correo no sea vacio

            if (usuario.correo.trim().length == 0) {
                listErrores.push("El correo no tiene valor o es nulo")
            }

            //validamos que la la clave no sea vacio
            if (String(usuario.clave).trim().length == 0) {
                listErrores.push("El clave no tiene valor o es nulo")
            }
            if (listErrores.length > 0) {
                usuario.errores = listErrores.join(', ')
                listusuariosResultado.push(usuario)
            } else {
                let usuarioinsertado = await model.create(usuario);
                usuario.errores = 'NINGUNO'
                listusuariosResultado.push(usuario)
            }

        }
        t.commit().then();
        return res.status(200).send(listusuariosResultado);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}



async function reporteusuariosiestp (req, res) {
    try {
        

        let result = await reporteUsuarios(req.query.iestpid)

        return res.status(200).send(result);

    } catch (err) {
        return res.status(500).json({ ok: false, err });
    }
}


async function reportelibrosiestp (req, res) {
    try {
        
        let result = await reporteLibros(req.query.iestpid)

        return res.status(200).send(result);

    } catch (err) {
        return res.status(500).json({ ok: false, err });
    }
}


async function reporteaccesosiestp (req, res) {
    try {
        

        let result = await reporteaccesos(req.query.iestpid,req.query.fechini,req.query.fechfin )

        return res.status(200).send(result);

    } catch (err) {
        return res.status(500).json({ ok: false, err });
    }
}