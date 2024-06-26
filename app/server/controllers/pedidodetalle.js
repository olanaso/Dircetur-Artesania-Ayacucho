const sequelize = require('sequelize');
const model = require('../models/pedidodetalle');
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

 

 
function listar(req, res) {
    let sql = ``; 
        sql = 
        `
      SELECT 
            CONCAT('[', total_subtotal_sum, ', ', row_number, ']') AS columna1,
            total_subtotal as columna2
        FROM (
            SELECT 
                (@row_number := @row_number + 1) AS row_number,
                cat.abreviatura AS total_subtotal,
                SUM(pd.subtotal) AS total_subtotal_sum
            FROM 
                (SELECT @row_number := 0) AS rn,
                pedidodetalle AS pd
            INNER JOIN pedido AS p ON pd.pedido_id = p.num_pedido
            INNER JOIN producto AS pro ON pd.producto_id = pro.id
            INNER JOIN categoria AS cat ON pro.categoria_id = cat.id
            WHERE 
                p.artesano_id = '${req.params.id}'
            GROUP BY 
                cat.abreviatura
        ) AS subquery;
    `    
    model.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


function buscar(req, res) {

    
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

    
    model.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


/*Guarda los datos generales de un predio*/
async function save(req, res, next) {
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


