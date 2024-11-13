const sequelize = require('sequelize');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {
    Op
} = require('sequelize');
const model = require('../models/usuario');
const modelprograma = require('../models/programas');
const { listarProgramasbyIESTP } = require('../services/libros/libros');
const { reporteLibros, reporteUsuarios, reporteaccesos } = require('../services/usuario/usuario');
const iestps = require('../models/iestps');
const programas = require('../models/programas');
const rol = require('../models/rol');
const menu = require('../models/menu');
const usuario = require('../models/usuario');
const artesano = require('../models/artesano');
const cliente = require('../models/cliente');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');
const { emailRecuperarContraseña } = require("../services/mails/mails");
const bcrypt = require('bcryptjs');
const { generatePassword } = require('../utils/generatePassword');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtenerDatosPerfil,
    obtener,
    listar,
    save,
    obtenerDNI, loginpersonal,
    verificarToken,
    recuperarcuenta, cambiarContrasenia, importarUsuarios
    , reportelibrosiestp, reporteaccesosiestp, reporteusuariosiestp,
    loginCliente, actualizarContraseniaCiente

};

/**
 * Metodo que actualiza la contrasenia cliente
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function actualizarContraseniaCiente (req, res) {
    const { id } = req.params
    const { contraseniaNueva } = req.body
    try {
        //cambio la clave por contrasenia nueva donde el id coincida
        await usuario.update({ clave: contraseniaNueva }, { where: { id } })
        res.status(200).send({ message: "Contraseña actualizada" })
    } catch (e) {
        console.error(e)
        handleHttpError(res, "Ocurrio un error actualizando la contraseña", 500)
    }
}

async function loginCliente (req, res) {
    try {
        const { clave } = req.body
        //encuentra el cliente que coincida con clave y contrasenia
        const user = await usuario.findOne({
            where:
                { usuario: req.body.usuario, clave }
        })
        //validaciones de rol y cliente existente
        if (!user) {
            return res.status(400).send({ error: "Usuario o contraseña incorrectos" })
        }
        if (user.rolid !== 3) {
            return res.status(400).send({ error: "Solo puedes ingresar con una cuenta de cliente" })
        }
        const data = {
            token: jwt.sign({ client: user }, '2C44-4D44-WppQ38S', { expiresIn: '1d' }),
            id: user.id,
            idCliente: await cliente.findClienteIdByUsuarioId(user.id)
        }
        return res.status(200).send({ data })
    } catch (e) {
        console.error(e)
        handleHttpError(res, "Error al iniciar sesion", 500)
    }
}
function guardar (req, res) {

    console.log('El request es:', req.body);
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
async function actualizar (req, res) {

    try {
        const id = req.params.id
        const body = req.body
        // console.log("El request es:",req.body)
        // console.log(req.params.id)
        const data = await usuario.update(body, { where: { id } })
        console.log("Data es", data)
        return res.status(200).send({ data })
    } catch (e) {
        handleHttpError(res, "Error updating item", 500)
    }
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

/*function obtener (req, res) {

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
}*/

function obtener (req, res) {

    model.findOne({
        where: { id: req.params.id }
    })
        .then(resultset => {
            req.session.usuario = resultset;
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


function obtenerDatosPerfil (req, res) {

    model.findOne({
        where: { id: req.params.id }
    })
        .then(resultset => {


            let usuario = resultset.dataValues;
            usuario.clave = '***CHISMOSON***'

            res.status(200).json(usuario);
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
            if (resultset) {
                delete resultset.clave
            }
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}
/*function listar (req, res) {

    model.findAll({
        where: { id: req.query.id },
        attributes: {},
        order: [['id', 'DESC']]
    })
        .then(resultset => {

            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}
*/


function listar (req, res) {

    model.findAll()
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

/*Guarda los datos generales de un predio*/
/*async function save (req, res, next) {

    console.log(req.body)
    const t = await model.sequelize.transaction();
    try {

        let object = await model.findOne({
            where: {
                id: req.body.id ? req.body.id : 0
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
}*/
/*Guarda los datos generales de un predio*/
async function save (req, res, next) {
    console.log('usuario_save', req.body);
    const t = await model.sequelize.transaction();
    try {
        delete req.body.usuario;
        delete req.body.clave;
        let object = await model.findOne({
            where: {
                id: req.body.id ? req.body.id : 0
            }
        });

        if (object != null) {
            let obj = { ...object.dataValues, ...req.body };
            for (const prop in obj) {
                object[prop] = obj[prop];
            }
            object.usuaregistra_id = req.userId;
            await object.save({ transaction: t });
        } else {
            object = await model.create({ ...req.body }, { transaction: t });
        }
        await t.commit();
        // Envía el ID del objeto creado junto con el objeto
        const data = {
            message: "Cuenta creada con exito",
            token: await tokenSign(object),
            rolid: object.rolid,
            id: object.id,
            //funciona para crear cliente, pero al editar uno desde admin sale error
            // idCliente: await cliente.findIdByCorreo(object.correo)
        }
        console.log(data)


        //hice 2 intentos de cookies
        // const token = tokenSign(object)
        // req.session.token = token
        // res.cookie('token', data.token, { maxAge: 24 * 60 * 60 * 1000 })
        return res.status(200).send({ data });
    } catch (e) {
        await t.rollback();
        return next(e);
    }
}






async function cambiarContrasenia (req, res, next) {
    const { dni, clave_nueva, clave_ant } = req.body;
    console.log({body: req.body});

    const t = await model.sequelize.transaction();
    try {

        let object = await model.findOne({
            where: {
                usuario: dni ? dni : 0
            }
        });
        console.log({clave: object.clave});

        const esClaveAnteriorCorrecta = bcrypt.compareSync(clave_ant, object.clave);
        console.log(object);

        console.log({esClaveAnteriorCorrecta});

        if (esClaveAnteriorCorrecta) {
            console.log({claveNueva: clave_nueva});
            object.clave = bcrypt.hashSync(clave_nueva, 10);
            // console.log({claveNueva: object.clave});
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
    console.log({ login: req.body })

    try {

        let usuarioDB = await model.findOne({
            where: {
                [Op.or]: [
                    { usuario: req.body.usuario }, // Buscar por correo
                    //{ clave: req.body.clave }, // Buscar por DNI
                ]
            }
        });
        const roles = await rol.findOne({
            where: { id: usuarioDB.rolid }
        });

        console.log(roles)

        if (!usuarioDB) {
            return res.status(400).json({ ok: false, message: "El usuario no existe" });
        }

        console.log(usuarioDB.dataValues)
        console.log(req.body.clave)
        // let claveCorrecta = usuarioDB.dataValues.clave == req.body.clave;
        let claveCorrecta = bcrypt.compareSync(req.body.clave, usuarioDB.dataValues.clave);

        let token = null;

        if (!claveCorrecta) {
            return res.status(400).json({ ok: false, message: "Clave incorrecta" });
        }

        else {

            usuarioDB.clave = "chismoso"
            usuarioDB.url = roles.url;
            req.session.user = usuarioDB.dataValues; // Puedes almacenar cualquier informaci贸n adicional del usuario aqu铆
            console.log('Impmiendo session ----------------------')
            console.log(req.session.user);
            token = jwt.sign({ usuarioDB }, '2C44-4D44-WppQ38S', { expiresIn: '1d' });
            // Almacenar el token en una cookie para mantener la sesi贸n
            res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });


        }
        console.log("El usuario", usuarioDB.correo)
        //Encuentro el id del cliente por el correo, este id es usado por el front, lo almacena en local storage
        //que despues es usado para x cosaas idk xd


        const idClient = await cliente.findIdByCorreo(usuarioDB.correo)
        const rartesano = await artesano.findOne({
            where: { dni: usuarioDB.usuario }
        });
        usuarioDB.artesano = rartesano;

        res.status(200).json({
            islogueado: true,
            usuario: usuarioDB,
            artesano: rartesano,
            token: "Bearer " + token,
            idCliente: idClient
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

        //console.log(decoded)
        //console.log('----------------------')
        //console.log(req.session.user)
        let usuarios = decoded.usuarioDB;
        //console.log(usuarios)

        const iestp = await usuario.findOne({
            where: { usuario: usuarios.usuario }
        });

        /* let programa = []
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
             
 */
        let datosartesano = [];
        const idusu = usuarios.id;
        console.log(idusu)
        if (idusu) {

            datosartesano = await artesano.findAll({
                where: {
                    usuario_id: idusu
                }
            });
            usuarios.datos = datosartesano;
        } else {
            usuarios.datos = null; // o algún valor predeterminado
        }


        const role = await rol.findOne({
            where: { id: usuarios.rolid }
        });



        /*usuario.iestp = iestp;
        usuario.programas = programa; */
        let menuspadre = await menu.findAll({
            where: {
                rolid: usuarios.rolid,
                padreid: 0
            },
            order: [['orden', 'ASC']]
        });

        let menushijo = [];
        menushijo = await menu.findAll({
            where: {
                rolid: usuarios.rolid,
                padreid: {
                    [Op.ne]: 0
                }
            },
            order: [['orden', 'ASC']]
        });


        console.log(role)
        usuarios.rol = role;
        usuarios.menu = menuspadre;
        usuarios.menuhijo = menushijo;


        //console.log(datosartesano)

        console.log("Los headers", req.headers)
        return res.status(200).json({ isvalid: true, message: 'Token valido', usuarios });
    });
}


async function recuperarcuenta (req, res) {
    try {
        // Validar que se proporcione un correo
        const { correo } = req.body;
        if (!correo) {
            return res.status(400).json({ 
                isRecuperado: false, 
                message: "El correo es requerido" 
            });
        }

        // Buscar usuario
        const usuarioDB = await model.findOne({ 
            where: { correo: correo.toLowerCase().trim() } 
        });

        if (!usuarioDB) {
            return res.status(400).json({ 
                isRecuperado: false, 
                message: "El correo ingresado no se encuentra registrado" 
            });
        }

        // Generar nueva contraseña
        const nuevaClave = generatePassword();

         // Hashear la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const claveHasheada = await bcrypt.hash(nuevaClave, salt);
        
        // Actualizar la contraseña en la base de datos
        await usuarioDB.update({ 
            clave: claveHasheada,
        });

        console.log({ nuevaClave });
        console.log({ usuarioDB });

        const resultadoCorreo = await enviarcorreo(usuarioDB.dataValues, nuevaClave);
        console.log({ resultadoCorreo });

        // Verificar si el correo se envió correctamente
        if (!resultadoCorreo.isRecuperado) {
            throw new Error('Error al enviar el correo');
        }

        return res.status(200).send(resultadoCorreo);

    } catch (err) {
        return res.status(500).json({ ok: false, err });
    }
}

async function enviarcorreo (usuario, nuevaClave) {
    try {
        emailRecuperarContraseña({
            correos: usuario.correo, nombreUsuario: usuario.nombre_completo
            , usuarioArtesano: usuario.usuario, contrasenaArtesano: nuevaClave
        })

        return { isRecuperado: true }

    } catch (error) {
        return { isRecuperado: false }
    }
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
            subject: 'Bienvenido a BiblioIdeas ' + usuario.nombres,
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
            let usuario = listusuarios[i];
            let listErrores = []
            if (String(usuario.dni).trim() == '') {
                listErrores.push('DNI vacio')
            }
            else if (String(usuario.dni).length != 8) {
                listErrores.push('Tam. de DNI diferente de 8 digitos')
            } else {
                let object = await model.findOne({
                    where: {
                        dni: usuario.dni
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


        let result = await reporteaccesos(req.query.iestpid, req.query.fechini, req.query.fechfin)

        return res.status(200).send(result);

    } catch (err) {
        return res.status(500).json({ ok: false, err });
    }
}

/*
async function login(req,res ) {


    try {
        let usuarioDB = await model.findOne({where:{usuario:req.query.usuario}});

        if (!usuarioDB) {
            return res.status(400).json({ok: false, message: "El usuario no existe"});
        }

        let claveCorrecta = usuarioDB.clave == req.query.clave;

        if (!claveCorrecta) {
            return res.status(400).json({ok: false, message: "Clave incorrecta"});
        }

        res.status(200).json({
            ok: true,
            usuario: {...usuarioDB},
            token: "token"+usuarioDB.usuario
        });

    } catch (err) {
        return res.status(500).json({ok: false, err});
    }
}*/
