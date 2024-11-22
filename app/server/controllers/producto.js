const sequelize = require('sequelize');
const product = require('../models/producto');
const categoria = require('../models/categoria')
const { Op } = require('sequelize');
const PARAMETROS = require("../helpers/parametros");
const moment = require('moment');
const { DECIMAL } = require('sequelize');
const { handleHttpError } = require("../utils/handleError");
const { convertirMoneda } = require('../utils/convertirMoneda');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    buscar,
    uploadFilproducto,
    reportegeneral, productoFiltrados,
    getProductsByCategoryAbbreviation,
    getProductsByArtesanoId,
    filtro
};


async function filtro (req, res) {
    const { cat = [], of, des, pmin } = req.query;
    let { pmax } = req.query
    if (pmax <= pmin) {
        pmax = 9999
    }
    console.log(cat, of, des, pmin, pmax)
    const categorias = Array.isArray(cat) ? cat : [cat]
    console.log(typeof cat)
    try {
        let sql = `
         SELECT p.nombres_es, p.imagen_principal, p.precio, p.palabra_clave_es, p.lst_imagenes,
            a.nombres,
            c.abreviatura, c.denominacion, c.id
         FROM artesania.producto p
         INNER JOIN artesania.categoria c ON p.categoria_id = c.id
         INNER JOIN artesania.artesano a ON p.artesano_id = a.id
         WHERE 1 = 1
     `;
        if (cat.length > 0 && cat[0] !== '0') {
            const categoriaFiltro = categorias.map(categoria => `p.categoria_id = ${categoria}`).join(' OR ')
            sql += ` AND (${categoriaFiltro})`
        }
        if (pmin > 0 || pmax > 0)
            sql += ` AND p.precio >= ${pmin} AND p.precio <= ${pmax}`


        if (des === 1) {
            sql += ` AND p.tipo_estado = 'destacado'`
        }

        const list = await product.sequelize.query(sql, { type: product.sequelize.QueryTypes.SELECT })
        if (!list || list.length === 0) {
            return handleHttpError(res, "No existen los datos", 401)
        }
        return res.status(200).send({ list })
    } catch (e) {
        console.error(e)
        handleHttpError(res, "Ocurrion un error", 500)
        return
    }
}
/**
 * funcion para obtener los productos de a traves del id de un artesano
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getProductsByArtesanoId (req, res) {
    try {
        const { id } = req.params
        const data = await product.findAllProductsByArtesanoId(id)
        res.status(200).send({ data })
    } catch (e) {
        console.error(e)
        handleHttpError(res, "Ocurrio un error obteniendo el recuros", 500)
    }
}

/**
 * funcion para obtener los productos de a traves de la abreviatura de una categoria
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getProductsByCategoryAbbreviation (req, res) {
    try {
        //obtenemos la abreviatura de la categoria que viene en el request
        const { abreviatura } = req.params
        //encuentro el id de la categoria a traves de la abreviatura
        const idCategoria = await categoria.findCategoryIdByAbreviatura(abreviatura)
        //Obtengo todos los productos de la categoria a traves del id de la cateogria
        const data = await product.findAllProductsByCategoryId(idCategoria)
        res.status(200).send({ data })
    } catch (e) {
        console.log(e)
        handleHttpError(res, "Ocurrio un error obteniendo el recuros", 500)
    }

}

function guardar (req, res) {

    product.create(req.body)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}

function actualizar (req, res) {

    product.findOne({
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

    product
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


async function obtener (req, res) {
    const { id } = req.params
    console.log(id)

    try {
        const result = await product.findProductoAndArtesanoByProdId(id)

        const convertido = await convertirMoneda('PEN', 'USD', result.precio || 0);

        result.precio_usd = convertido || 0;

        res.status(200).send(result)

    } catch (e) {
        console.error(e)
        handleHttpError(res, "Ocurrio un error obteniendo el recurso", 500)
    }
}



/*function listar (req, res) {

    model.findAll()
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}*/


function reportegeneral (req, res) {
    let sql = ``;
    sql =
        `
        SELECT
            (SELECT COUNT(*) FROM producto) AS producto,
            (SELECT COUNT(*) FROM usuario) AS usuario,
            (SELECT COUNT(*) FROM artesano) AS artesano,
            (SELECT COUNT(*) FROM categoria) AS categoria;
    `
    product.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
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
        a.imagen_principal,
        a.nombres_es,
        c.nombre_completo,
        a.precio,
        a.cantidad
    FROM producto a
    INNER JOIN artesano b ON a.artesano_id = b.id
    INNER JOIN usuario c ON c.id = b.usuario_id 
    order by a.id desc
    limit 50
    `
    product.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}



function buscar (req, res) {


    const {
        nombres_es = '',
        nombre_completo = '',
        precio = null,
        cantidad = null,
    } = req.query;




    let sql = ``;
    sql =
        `
        SELECT 
        a.id,
        a.imagen_principal,
        a.nombres_es,
        c.nombre_completo,
        a.precio,
        a.cantidad
    FROM producto a
    INNER JOIN artesano b ON a.artesano_id = b.id
    INNER JOIN usuario c ON c.id = b.usuario_id 
    WHERE 1=1 
    `;

    /* if (nombres_es !== '') {
         sql += ` AND a.nombres_es LIKE '%${req.body.nombres_es}%'`;
     }
     if (nombre_completo !== '') {
         sql += ` AND c.nombre_completo LIKE '%${req.body.nombres_es}%'`;
     }*/

    if (nombres_es !== '') {
        sql += ` AND a.nombres_es LIKE '%${nombres_es}%'`;
    }
    if (nombre_completo !== '') {
        sql += ` AND c.nombre_completo LIKE '%${nombre_completo}%'`;
    }

    if (!isNaN(precio) && precio !== '') {
        sql += ` AND a.precio <= '${req.query.precio}'`;
    }

    if (!isNaN(cantidad) && cantidad !== '') {
        sql += ` AND a.cantidad <= '${req.query.cantidad}'`;
    }



    sql += `
        ORDER BY a.id DESC
        LIMIT 50;
    `;


    product.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


/*Guarda los datos generales de un predio*/
async function save (req, res, next) {
    const t = await product.sequelize.transaction();
    try {
        let object = await product.findOne({
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
            object = await product.create({ ...req.body }, { transaction: t });
        }
        await t.commit();
        // Envía el ID del objeto creado junto con el objeto
        return res.status(200).send({ id: object.id, object });
    } catch (e) {
        await t.rollback();
        return next(e);
    }
}


async function uploadFilproducto (req, res, next) {
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
async function productoFiltrados (req, res) {
    try {
        const { categoria, oferta, precio_min, precio_max } = req.params;

        let filters = {};
        if (categoria) {
            filters.categoria_id = categoria;
        }

        if (oferta) {
            filters.lst_ofertas = {
                [Op.ne]: '[]'
            };
        }

        if (precio_min) {
            filters.precio = {
                [Op.gte]: precio_min
            };
        }

        if (precio_max) {
            filters.precio = {
                ...filters.precio,
                [Op.lte]: precio_max
            };
        }
        const productos = await product.findAll({ where: filters });

        if (productos) {
            res.status(200).json(productos);
        } else {
            res.status(500).json({ error: 'no se han encontrado productos' })
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


