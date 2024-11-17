const sequelize = require('sequelize');
const model = require('../models/cliente');
const { Op } = require('sequelize');
const { handleHttpError } = require('../utils/handleError')
const usuario = require('../models/usuario')
const mails = require('../services/mails/mails')
const { generatePassword, encriptartexto, comprateTextEncripted } = require('../utils/generatePassword');


module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    filtrar,
    uploadFilimg,
    saveClienteTienda
};

function guardar (req, res) {

    model.create(req.body)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

async function actualizar (req, res) {
    const t = await model.sequelize.transaction()
    try {
        const id = req.params.id
        const clienteEncontrado = await model.findClienteById(id) //Con esto encuentro el cliente con el id
        const request = req.body
        console.log(clienteEncontrado)
        await clienteEncontrado.update(request) //actualizo el usuario encontrado en la base de datos
        //Encuentro el usuario con la llave foranea que almacena el cliente
        const usuarioEncontrado = await usuario.findUsuarioById(clienteEncontrado.usuario_id)
        //retiro valores del request que no voy a actualizar porque no existen en usuario
        let { direccion, region, ciudad, pais, tipo_documento, numero_documento,
            direccion_envio, foto_perfil, list_reclamos, usuario_id, ...requestForUser } = request
        requestForUser.nombre_completo = request.nombres + " " + request.apellidos
        await usuarioEncontrado.update(requestForUser)

        res.status(200).send({ message: "Cliente actualizado correctamente" })
        return await t.commit()
    } catch (e) {
        await t.rollback()
        handleHttpError(res, "Error actualizando", 500)
        console.error(e)
    }
}

async function eliminar (req, res) {
    const t = await model.sequelize.transaction()
    const { id } = req.params
    try {
        //encuentro el cliente con el id
        const clienteEncontrado = await model.findClienteById(id)
        const usuarioId = clienteEncontrado.usuario_id
        //Encuentro el usuario por su id
        const usuarioEncontrado = await usuario.findUsuarioById(usuarioId)
        //Elimino
        await usuarioEncontrado.destroy()
        await clienteEncontrado.destroy()
        res.status(200).send({ message: "Cliente eliminado correctamente" })
        return await t.commit()

    } catch (e) {
        await t.rollback()
        console.error(e)
        handleHttpError(res, "Error eliminando cliente", 500)
    }

}

function obtener (req, res) {

    model.findOne({
        where: { id: req.params.id }
    })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

async function obtenerMal (req, res) {
    const { id } = req.params
    console.log(id)
    try {
        clienteData = await model.FindUserAndClienteDataByClienteId(id)

        if (clienteData) {
            return res.status(200).send({ clienteData })
        }
        handleHttpError(res, "El cliente no existe", 404)

    } catch (e) {
        console.error(e)
        handleHttpError(res, "Error obteniendo datos del cliente", 500)
    }

}

const DEFAULT_PAGE_LIMIT = 10; // Número predeterminado de resultados por página

function listar (req, res) {
    const page = parseInt(req.query.page) || 1; // Página solicitada, por defecto la primera
    const limit = parseInt(req.query.limit) || DEFAULT_PAGE_LIMIT; // Límite de resultados por página

    const offset = (page - 1) * limit; // Calcular el desplazamiento

    model.findAndCountAll({
        limit: limit,
        offset: offset
    })
        .then(result => {
            const { count, rows } = result;
            const totalPages = Math.ceil(count / limit); // Calcular el número total de páginas

            res.status(200).json({
                totalItems: count,
                totalPages: totalPages,
                currentPage: page,
                clientes: rows
            });
        })
        .catch(error => {
            console.error('Error al listar clientes:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        });
}

/**
 * Funcion para crear un cliente, al crear el cliente se crea el usuario
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function save (req, res, next) {
    const t = await model.sequelize.transaction() //transaccion
    try {
        let requestOriginal = req.body
        //agrego nombre y le asigno el valor de nombres al request
        const requestUsuario = { ...requestOriginal, nombre: requestOriginal.nombres } //agrego nombre y le asigno el valor de nombres del request a nombre
        const usuarioCreado = await usuario.create(requestUsuario,
            { transaction: t }) //se crea el usuario
        //se actualiza el request para que tenga el id del usuario
        const requestCliente = { ...requestOriginal, usuario_id: usuarioCreado.id }
        //se crea el nuevo cliente
        const clienteCreado = await model.create(requestCliente)

        res.status(200).send({ message: "Cliente creado correctamente" })
        return await t.commit()
    } catch (e) {
        await t.rollback()
        console.error(e)
        handleHttpError(res, "Error creando cliente", 500)
    }
}

async function saveClienteTienda (req, res, next) {

    let cliente = model;
    const t = await model.sequelize.transaction() //transaccion
    try {
        //registrar un usuario cliente
        const { datosusuario, datoscliente } = req.body;


        mails.emailRegistrarCliente(datoscliente.correo, datosusuario.nombre_completo, datosusuario.usuario, datoscliente.numero_documento);

        let usuariovalue = datosusuario.usuario;
        let correovalue = datosusuario.correo;

        let usuario_buscado = null
        usuario_buscado = await usuario.findOne({
            where: { usuario: usuariovalue },
            transaction: t
        });

        // Si no existe el cliente, crearlo
        if (usuario_buscado) {
            throw new Error(`El cliente con usuario: ${usuariovalue} ya existe en el sistema, recupere su clave`)

        }

        usuario_buscado = await usuario.findOne({
            where: { correo: correovalue },
            transaction: t
        });

        // Si no existe el cliente, crearlo
        if (usuario_buscado) {
            throw new Error(`El cliente con correo: ${correovalue} ya existe en el sistema, recupere su clave`)
            // new throw ({ messaje: `El cliente con correo: ${correovalue} ya existe en el sistema, recupere su clave` })
        }


        let numero_documento_value = datoscliente.numero_documento;
        let correo_cliente_value = datoscliente.correo;



        let cliente_buscado = null
        cliente_buscado = await cliente.findOne({
            where: { correo: correo_cliente_value },
            transaction: t
        });

        // Si no existe el cliente, crearlo
        if (cliente_buscado) {
            throw new Error(`El cliente con correo: ${correovalue} ya existe en el sistema, recupere su clave`)
        }


        cliente_buscado = await cliente.findOne({
            where: { numero_documento: numero_documento_value },
            transaction: t
        });

        // Si no existe el cliente, crearlo
        if (cliente_buscado) {
            throw new Error(`El cliente con dni: ${numero_documento_value} ya existe en el sistema, recupere su clave`)
        }
        datosusuario.clave = encriptartexto(datoscliente.numero_documento)
        let ROL_CLIENTE = 3; //segun la tabla de roles
        datosusuario.tipousuario = ROL_CLIENTE;
        datosusuario.rol = ROL_CLIENTE;
        datosusuario.estado = true;

        let usuariocreado = null;
        usuariocreado = await usuario.create(
            datosusuario, // Asegúrate de que req.body.cliente tenga los datos correctos del cliente
            { transaction: t }
        );
        datoscliente.usuario_id = usuariocreado.dataValues.id;
        let clientecreado = null;
        clientecreado = await cliente.create(
            datoscliente, // Asegúrate de que req.body.cliente tenga los datos correctos del cliente
            { transaction: t }
        );



        res.status(200).send({ message: "Cliente creado correctamente" })

        return await t.commit()
    } catch (e) {
        await t.rollback()
        console.error(e.message)
        handleHttpError(res, "Error:" + e.message, 500)
    }
}


async function filtrar (req, res) {
    try {
        let { nombres, apellidos, correo, page, limit } = req.query;

        // Convertir a números enteros y establecer valores predeterminados si no se proporcionan
        page = parseInt(page) || 1;
        limit = parseInt(limit) || DEFAULT_PAGE_LIMIT;


        const whereCondition = {};
        if (nombres) {
            //whereCondition.nombres = nombres;
            whereCondition.nombres = {
                [Op.like]: `%${nombres}%`
            };
        }
        if (apellidos) {
            //whereCondition.apellidos = apellidos;
            whereCondition.apellidos = {
                [Op.like]: `%${apellidos}%`
            };
        }

        if (correo) {
            whereCondition.correo = correo;
        }

        const clientes = await model.findAll({ where: whereCondition });

        const offset = (page - 1) * limit; // Calcular el desplazamiento
        const result = await model.findAndCountAll({
            where: whereCondition,
            limit: limit,
            offset: offset
        });
        const totalPages = Math.ceil(result.count / limit); // Calcular el número total de páginas

        res.json({
            totalItems: result.count,
            totalPages: totalPages,
            currentPage: page,
            clientes: result.rows
        });
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


async function uploadFilimg (req, res, next) {
    try {
        let folder = 'files-app' + req.query.folder;
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        let file = folder + req.filenamesaved
        return res.status(200).send({
            nombrearchuvo: req.originalname, ruta: file
        });

    } catch (err) {
        return next(err);
    }
}