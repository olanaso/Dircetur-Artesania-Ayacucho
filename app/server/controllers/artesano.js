const sequelize = require('sequelize');
const artesanoModel = require('../models/artesano');
const artesanos = require('../models/usuario');
const { Op } = require('sequelize');
const PARAMETROS = require("../helpers/parametros");
const moment = require('moment');
const categoria = require('../models/categoria')
const product = require('../models/producto')
const { handleHttpError } = require("../utils/handleError");
const { emailRegistroArtesano } = require("../services/mails/mails");

const { generatePassword, encriptartexto, comprateTextEncripted } = require('../utils/generatePassword');


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
    getAllArtesanosByCategoria,
    listarCombo, listarArtesanosMapa, listarArtesanosWeb, listarFiltroArtesanosWeb
};

/**
 * funcion para obtener la lista de artesanos de acuerdo a la categoria productos con las que han trabajado
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllArtesanosByCategoria (req, res) {
    const t = await artesanoModel.sequelize.transaction()
    try {

        //obtengo todas los id de las categorias y sus denominaciones
        const categorias
            = await categoria.findAllIdAndDenominacion() //id y categoria

        //obtengo el id del artesano y el de la categoria de los productos que ha trabajado
        const artesanosPorCategoria
            = await product.findAllArtesanoIdAndCategoriaIdByCategorias(categorias)

        //areglo con ids de artesano
        const artesanosIds = [...new Set(artesanosPorCategoria.map(artesano => artesano.artesano_id))]

        //encuentro los artesanos por ids
        const artesanosEncontrados = await artesanoModel.findArtesanosByIds(artesanosIds)


        //resultado final haciendo uso de map, filter y find
        const resultadoFinal = categorias.map(categoria => {
            const artesanosFiltrados
                = artesanosPorCategoria.filter(apc =>
                    apc.categoria_id === categoria.id).map(apc => {
                        const artesano = artesanosEncontrados.find(a => a.id === apc.artesano_id)
                        return artesano ? { id: artesano.id, nombres: artesano.nombres, foto1: artesano.foto1, foto2: artesano.foto2 } : null
                    })
                    .filter(artesano => artesano !== null)

            return {
                categoria: categoria.denominacion, //categoria
                artesanos: artesanosFiltrados   //array con artesanos que trabajan en esa categoria
            }
        }).filter(categoria => categoria.artesanos.length > 0)

        res.status(200)
        res.json(resultadoFinal)

        return await t.commit()

    } catch (e) {
        await t.rollback()
        console.error(e)
        handleHttpError(res, "Ocurrio un error obteniendo los artesanos", 500)
    }

}

function guardar (req, res) {

    artesanoModel.create(req.body)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar (req, res) {

    artesanoModel.findOne({
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

    artesanoModel
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

    artesanoModel.findOne({
        where: { id: req.params.id }
    })
        .then(async resultset => {

            let productos = await product.findAllProductsByArtesanoId(resultset.id)
            // resultset.productos = productos;
            res.status(200).json({ ...resultset.dataValues, productos })

        })
        .catch(error => {
            res.status(400).send(error)
        })
}
function obtenerDNI (req, res) {

    artesanoModel.findOne({
        where: { dni: req.params.dni }
    })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}



// function listar (req, res) {
// let {dni,nombre,correo}=req.query

//     let sql = ``;
//     sql =
//         `
//         SELECT 
//         a.id,
//         CONCAT(a.nombres, ' - ', a.apellidos) AS completo,
//         a.correo,
//             a.dni,
//         CASE 
//             WHEN c.tipousuario = 1 THEN 'artesano'
//             WHEN c.tipousuario = 2 THEN 'cliente'
//             ELSE 'otro'
//         END AS tipousuario
//     FROM artesano a 
//     INNER JOIN usuario c ON c.id = a.usuario_id
//     ORDER BY a.id DESC
//     LIMIT 50;
//     `
//     artesanoModel.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
//         .then(resultset => {
//             res.status(200).json(resultset)
//         })
//         .catch(error => {
//             res.status(400).send(error)
//         })
// }

function listar (req, res) {
    let { dni, nombre, correo } = req.query;

    let sql = `
        SELECT 
            a.id,
            CONCAT(a.nombres, ' - ', a.apellidos) AS completo,
            a.correo,
            a.dni,
            CASE 
                WHEN c.tipousuario = 1 THEN 'Artesano'
                WHEN c.tipousuario = 2 THEN 'Artesano'
                ELSE 'otro'
            END AS tipousuario
        FROM artesano a 
        INNER JOIN usuario c ON c.id = a.usuario_id
    `;

    // Agregar condiciones WHERE dinámicas basadas en los valores de req.query
    let conditions = [];
    let params = {};

    if (dni) {
        conditions.push(`a.dni = :dni`);
        params.dni = dni;
    }
    if (nombre) {

        const nombreTerms = nombre.trim().split(/\s+/);
        const nombreConditions = nombreTerms.map((term, index) => {
            params[`nombre${index}`] = `%${term}%`;
            return `(a.nombres LIKE :nombre${index} OR a.apellidos LIKE :nombre${index})`;
        });
        conditions.push(`(${nombreConditions.join(' AND ')})`);
    }
    if (correo) {
        conditions.push(`a.correo LIKE :correo`);
        params.correo = `%${correo}%`;
    }

    // Si existen condiciones, agregarlas al SQL
    if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(' AND ');
    }

    // Agregar la cláusula ORDER BY y LIMIT
    sql += `
        ORDER BY a.id DESC
        LIMIT 50;
    `;

    // Ejecutar la consulta con los parámetros reemplazados
    artesanoModel.sequelize.query(sql, { replacements: params, type: sequelize.QueryTypes.SELECT })
        .then(resultset => {
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}


function listarArtesanosMapa (req, res) {
    // Consulta SQL
    let sql = `
       SELECT id,nombres, apellidos, foto1, foto2, lst_taller, lst_especialidadtecnicas
       FROM artesano
    `;

    // Ejecutar la consulta sin parámetros
    artesanoModel.sequelize.query(sql, {
        type: artesanoModel.sequelize.QueryTypes.SELECT
    })
        .then(resultset => {
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}



function listarArtesanosWeb (req, res) {
    // Consulta SQL
    let sql = `
SELECT a.id,a.nombres,a.apellidos,a.celular,a.foto1,a.foto2,a.correo
,COALESCE(b.categorias, 'OTRO') categoria_artesano  FROM artesano a
LEFT JOIN (
SELECT
    a.artesano_id,
  GROUP_CONCAT(DISTINCT b.denominacion SEPARATOR ', ') AS categorias
FROM
    producto a
INNER JOIN categoria b ON a.categoria_id = b.id
GROUP BY
    a.artesano_id) b ON a.id=b.artesano_id
ORDER BY
 categoria_artesano ASC;
    `;

    // Ejecutar la consulta sin parámetros
    artesanoModel.sequelize.query(sql, {
        type: artesanoModel.sequelize.QueryTypes.SELECT
    })
        .then(resultset => {
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}



function listarFiltroArtesanosWeb (req, res) {
    // Consulta SQL
    let sql = `
SELECT distinct COALESCE(b.id,9999) id
,COALESCE(b.categorias, 'OTRO') categoria_artesano  FROM artesano a
LEFT JOIN (
SELECT
    a.artesano_id,
  b.denominacion AS categorias,
  b.id
FROM
    producto a
INNER JOIN categoria b ON a.categoria_id = b.id
GROUP BY
    a.artesano_id) b ON a.id=b.artesano_id
ORDER BY
 id ;
    `;

    // Ejecutar la consulta sin parámetros
    artesanoModel.sequelize.query(sql, {
        type: artesanoModel.sequelize.QueryTypes.SELECT
    })
        .then(resultset => {
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}





function listarCombo (req, res) {

    let sql = ``;
    sql =
        `
        SELECT
        a.id,
        a.dni,
        CONCAT( a.dni,' - ',a.nombres, ' ', a.apellidos) AS completo,
        a.correo
        FROM artesano a
        INNER JOIN usuario c ON c.id = a.usuario_id
        WHERE c.tipousuario = 2
        ORDER BY completo asc

    `
    artesanoModel.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
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


    artesanoModel.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


/*Guarda los datos generales de un predio*/

async function saveUsuarioArtesano (req, res, next) {
    const t = await artesanoModel.sequelize.transaction();
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

            usuario.clave = encriptartexto(usuario.clave)
            usuario_result = await artesanos.create({ ...usuario }, { transaction: t });


        }
        console.log('El id!!', usuario.id)
        let artesano_result = null;

        let objectArtesano = await artesanoModel.findArtesanoByUserId(usuario.id)


        console.log('model artesano', modelArtesano)
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
            artesano_result = await artesanoModel.create({ ...artesano }, { transaction: t });
            if (artesano_result) {

                emailRegistroArtesano({
                    correo: artesano_result.correo, nombreArtesano: artesano_result.nombres + ' ' + artesano_result.apellidos
                    , usuarioArtesano: artesano_result.dni, contrasenaArtesano: usuario_result.clave, logoUrl: null
                })
            }

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

    const t = await artesanoModel.sequelize.transaction();

    try {
        let object = await artesanoModel.findOne({
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
            object = await artesanoModel.create({ ...req.body }, { transaction: t });
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
