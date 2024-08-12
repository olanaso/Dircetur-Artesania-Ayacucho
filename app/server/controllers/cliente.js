const sequelize = require('sequelize');
const model = require('../models/cliente');
const { Op } = require('sequelize');
const {handleHttpError} = require('../utils/handleValidator')
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
    try{
        const id = req.params.id
        const {idUsuario, ...restOfbody} = req.body // Con esto estoy sacando el idUsuario del body
        const usuarioEncontrado = await usuario.findUsuarioById(idUsuario) //Con esto encuentro el usuario con el id(En nuestro contexto ese id esta en el local storage
        const nombreDelUsuarioEncontrado = usuarioEncontrado.nombre_completo // nombre que voy a dividir para el cliente
        //divison del nombre completo del usuario en nombres y apellidos
        const partes = nombreDelUsuarioEncontrado.split(' ')
        const nombres = partes.slice(0,2).join(' ') // Tomo los dos primeros elementos del array y los uno con un espacio
        const apellidos = partes.slice(2).join(' ') // Tomo los elementos restantes y los uno con un espacio

        //Actualizo Cliente
        await model.update({nombres, apellidos, restOfbody},{where:{id}})
        return res.status(200).send({message:"Cliente actualizado correctamente"})


        console.log(nombres)
        console.log(apellidos)


    }catch(e){
        handleHttpError(res,"Error actualizando",500)
    }
}

function eliminar(req, res) {
    model
        .findOne({
            where: {id: req.body.id}
        })
        .then(object => {
                object.destroy();
                res.status(200).json(object);
        })
        .catch(error => res.status(400).send(error));
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

async function save(req, res, next) {
    const t = await model.sequelize.transaction();
    try {

        let object = await model.findOne({
            where: {
                id: req.body.id ? req.body.id : 0
            }
        });

        if (object != null) {
            let obj = {...object.dataValues, ...req.body}
            for (const prop in obj) {
                object[prop] = obj[prop]
            }
            object.id= req.id;
            await object.save({t});
        } else {
            object = await model.create({ ...req.body }, { t });
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
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