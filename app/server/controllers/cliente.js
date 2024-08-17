const sequelize = require('sequelize');
const model = require('../models/cliente');
const { Op } = require('sequelize');
const {handleHttpError} = require('../utils/handleError')
const usuario = require('../models/usuario')

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    filtrar,
    uploadFilimg
};

function guardar(req, res) {

    model.create(req.body)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

async function actualizar(req, res) {
    const t = await model.sequelize.transaction()
    try{
        const id = req.params.id
        const clienteEncontrado = await model.findClienteById(id) //Con esto encuentro el cliente con el id
        const request = req.body
        console.log(clienteEncontrado)
        await clienteEncontrado.update(request) //actualizo el usuario encontrado en la base de datos
        //Encuentro el usuario con la llave foranea que almacena el cliente
        const usuarioEncontrado = await usuario.findUsuarioById(clienteEncontrado.usuario_id)
       //retiro valores del request que no voy a actualizar porque no existen en usuario
        const {direccion, region, ciudad, pais, tipo_documento, numero_documento,
        direccion_envio, foto_perfil, list_reclamos, usuario_id, ...requestForUser} = request
        await usuarioEncontrado.update(requestForUser)

        res.status(200).send({message: "Cliente actualizado correctamente"})
        return await t.commit()
    }catch(e){
        await t.rollback()
        handleHttpError(res,"Error actualizando",500)
        console.error(e)
    }
}

async function eliminar(req, res) {
    const t = await model.sequelize.transaction()
    const {id} = req.params
    try{
        //encuentro el cliente con el id
        const clienteEncontrado = await model.findClienteById(id)
        const usuarioId = clienteEncontrado.usuario_id
        //Encuentro el usuario por su id
        const usuarioEncontrado = await usuario.findUsuarioById(usuarioId)
        //Elimino
        await usuarioEncontrado.destroy()
        await clienteEncontrado.destroy()
        res.status(200).send({message: "Cliente eliminado correctamente"})
        return await t.commit()

    }catch(e){
        await t.rollback()
        console.error(e)
        handleHttpError(res, "Error eliminando cliente", 500)
    }

}
function obtener(req, res) {

    model.findOne({
        where: {id: req.params.id}
    })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

const DEFAULT_PAGE_LIMIT = 10; // Número predeterminado de resultados por página

function listar(req, res) {
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
async function save(req, res, next) {
    const t = await model.sequelize.transaction() //transaccion
    try{
        let requestOriginal = req.body
        //agrego nombre y le asigno el valor de nombres al request
        const requestUsuario = {...requestOriginal, nombre: requestOriginal.nombres} //agrego nombre y le asigno el valor de nombres del request a nombre
        const usuarioCreado = await usuario.create(requestUsuario,
            {transaction: t}) //se crea el usuario
        //se actualiza el request para que tenga el id del usuario
        const requestCliente = {...requestOriginal, usuario_id : usuarioCreado.id}
        //se crea el nuevo cliente
        const clienteCreado = await model.create(requestCliente)

        res.status(200).send({message:"Cliente creado correctamente"})
        return await t.commit()
    }catch(e){
        await t.rollback()
        console.error(e)
        handleHttpError(res, "Error creando cliente", 500)
    }
}

async function filtrar(req, res) {
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