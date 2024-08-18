const sequelize = require('sequelize');
const artesano = require('../models/artesano');
const artesanos = require('../models/usuario');
const { Op } = require('sequelize');
const PARAMETROS = require("../helpers/parametros");
const moment = require('moment');
const categoria = require('../models/categoria')
const product = require('../models/producto')
const {handleHttpError} = require("../utils/handleError");



module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    buscar,
    obtenerDNI,
    uploadFilartesano,
    saveUsuarioArtesano,
    getAllArtesanosByCategoria
};

/**
 * funcion para obtener la lista de artesanos de acuerdo a la categoria productos con las que han trabajado
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllArtesanosByCategoria(req,res){
    const t = await artesano.sequelize.transaction()
    try{
        //id de las categorias
        const idCategorias = await categoria.findAllCategoriasId()
        //set con id de artesanos, set para que no guarde repetidos
        let allArtesanosId = new Set()

        for(let idCategoria of idCategorias){
            //obtengo todos los ids de los artesanos que han trabajado con esa categoria
            const artesanosId = await product.findAllArtesanoIdByCategoriaId(idCategoria)
            allArtesanosId[idCategoria] = [...new Set(artesanosId)]
        }

        const resultadoFinal = []

        for(const[categoriaId, artesanoIds] of Object.entries(allArtesanosId)){
            if(artesanoIds.length > 0){
                //encuentra artesanos por ids dentro del arreglo artesanoIds
                const artesanosEncontrados = await artesano.findAll({
                    where: {
                        id : {
                            [Op.in] : artesanoIds
                        }
                    }
                })
                //Encuentro la categoria de los artesanos de acuerdo a su id
                const categoriaEncontrada = await categoria.findOne({where: {id: categoriaId}})

                if(categoriaEncontrada) {
                    resultadoFinal.push({
                        categoria: categoriaEncontrada.denominacion,
                        //selecciono nombres y foto
                        artesanos: artesanosEncontrados.map(artesano => ({nombres: artesano.nombres, foto1: artesano.foto1}))
                    })
                }
            }
        }

        console.log("El resultado final es:", resultadoFinal)
        console.log("Los ids del artesano son:", allArtesanosId)
        res.json(resultadoFinal)
        return await t.commit()
    }catch(e){
        await t.rollback()
        console.error(e)
        handleHttpError(res,"Ocurrio un error obteniendo los artesanos", 500)
    }

}

function guardar (req, res) {

    artesano.create(req.body)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar (req, res) {

    artesano.findOne({
        where: { id: req.params.id }

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

    artesano
        .findOne({
            where: { id: req.body.id }
        })
        .then(object => {
            object.destroy();
            res.status(200).json(object);
        }
        )
        .catch(error => res.status(400).send(error));
}


function obtener (req, res) {

    artesano.findOne({
        where: { id: req.params.id }
    })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}
function obtenerDNI (req, res) {

    artesano.findOne({
        where: { dni: req.params.dni }
    })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}



function listar (req, res) {
    let sql = ``;
    sql =
        `
        SELECT 
        a.id,
        CONCAT(a.nombres, ' - ', a.apellidos) AS completo,
        a.correo,
        CASE 
            WHEN c.tipousuario = 1 THEN 'artesano'
            WHEN c.tipousuario = 2 THEN 'cliente'
            ELSE 'otro'
        END AS tipousuario
    FROM artesano a 
    INNER JOIN usuario c ON c.id = a.usuario_id
    ORDER BY a.id DESC
    LIMIT 50;
    `
    artesano.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


function buscar (req, res) {


    const {
        nombre = '',
        correo = '',
    } = req.query;




    let sql = ``;
    sql =
        `
        SELECT 
        a.id,
        CONCAT(a.nombres, ' - ', a.apellidos) AS completo,
        a.correo,
        CASE 
            WHEN c.tipousuario = 2 THEN 'Artesano'
            WHEN c.tipousuario = 3 THEN 'Cliente'
            ELSE 'otro'
        END AS tipousuario
    FROM artesano a 
    INNER JOIN usuario c ON c.id = a.usuario_id 
    `;


    if (nombre !== '') {
        sql += ` AND CONCAT(a.nombres, ' - ', a.apellidos) LIKE '%${nombre}%'`;
    }

    if (correo !== '') {
        sql += ` AND a.correo LIKE '%${correo}%'`;
    }


    sql += `
        ORDER BY a.id DESC
        LIMIT 50;
    `;


    artesano.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


/*Guarda los datos generales de un predio*/

async function saveUsuarioArtesano (req, res, next) {
    const t = await artesano.sequelize.transaction();
    try {
        const { usuario, artesano } = req.body;

        //Guardar usuario 
        let modelArtesano = artesano;

        let objectUsuario = await artesanos.findOne({
            where: {
                id: usuario.id ? usuario.id : 0
            }
        });
        let usuario_result = objectUsuario;

        if (objectUsuario != null) { //proceso de actualizacion
            let obj = { ...objectUsuario.dataValues, ...usuario };
            for (const prop in obj) {
                objectUsuario[prop] = obj[prop];
            }
            objectUsuario.usuaregistra_id = req.userId;
            await objectUsuario.save({ transaction: t });

        } else {  //registro de nuevo usuario
            // usuario.id = artesano.id;
            usuario_result = await artesanos.create({ ...usuario }, { transaction: t });

        }

        let artesano_result = null;

        let objectArtesano = await modelArtesano.findOne({
            where: {
                usuario_id: usuario_result.id ? usuario_result.id : 0
            }
        });

        //Guardado de artesano

        if (objectArtesano != null) { //proceso de actualizacion
            let obj = { ...objectArtesano.dataValues, ...artesano };
            for (const prop in obj) {
                objectArtesano[prop] = obj[prop];
            }
            objectArtesano.usuario_id = usuario_result.id;
            await objectArtesano.save({ transaction: t });

        } else {  //registro de nuevo usuario
            artesano.usuario_id = usuario_result.id;
            artesano_result = await modelArtesano.create({ ...artesano }, { transaction: t });

        }



        //Gudardao de usuario

        await t.commit();
        // Envía el ID del objeto creado junto con el objeto
        return res.status(200).send({ id: artesano.artesanoId, artesano_result, usuario_result });

    } catch (e) {
        await t.rollback();
        return next(e);
    }
}


async function save (req, res, next) {
    const t = await artesano.sequelize.transaction();
    try {
        let object = await artesano.findOne({
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
            object = await artesano.create({ ...req.body }, { transaction: t });
        }
        await t.commit();
        // Envía el ID del objeto creado junto con el objeto
        return res.status(200).send({ id: object.id, object });
    } catch (e) {
        await t.rollback();
        return next(e);
    }
}



async function uploadFilartesano (req, res, next) {
    try {
        let folder = 'files-app' + req.query.folder;
        let filenamesaved = req.filenamesaved;
        if (!filenamesaved) throw {
            error: "No se logro subir el archivo",
            message: "Ha habido un error",
            status: 400
        }
        //console.log(req.ciudadano)
        let file = folder + '/' + req.filenamesaved
        return res.status(200).send({
            filename: req.originalname, path: file
        });

    } catch (err) {
        return next(err);
    }
}
