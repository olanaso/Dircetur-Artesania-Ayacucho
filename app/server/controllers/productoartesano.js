const sequelize = require('sequelize');
const model = require('../models/producto');
const { Op } = require('sequelize');
const PARAMETROS = require("../helpers/parametros");
const moment = require('moment');
const { DECIMAL } = require('sequelize');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    buscar,
    uploadFilproducto
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

function actualizar (req, res) {

    model.findOne({
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

    model
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



/*function listar (req, res) {

    model.findAll()
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}*/


function listar (req, res) {
    let sql = ``;
    sql =
        `
    select  p.imagen_principal,
            p.nombres_es,
            c.abreviatura,
            p.alto,
            p.ancho,
            p.materiales_es,
            p.cantidad,
            p.tipo_estado,
            p.precio
    from producto as  p
    inner join categoria c on p.categoria_id=c.id 
    where p.artesano_id= '${req.params.id}'
    `
    model.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
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
        precio = null,
        cantidad = null,
        id = null
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
    WHERE 1=1 and a.artesano_id = '${id}'
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

    if (!isNaN(precio) && precio !== '') {
        sql += ` AND a.precio <= '${req.query.precio}'`;
    }

    if (!isNaN(cantidad) && cantidad !== '') {
        sql += ` AND a.cantidad <= '${req.query.cantidad}'`;
    }



    sql += `
        ORDER BY a.id DESC
        LIMIT 100;
    `;

    console.log(sql)
    model.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


/*Guarda los datos generales de un predio*/
async function save (req, res, next) {
    const t = await model.sequelize.transaction();
    try {
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


