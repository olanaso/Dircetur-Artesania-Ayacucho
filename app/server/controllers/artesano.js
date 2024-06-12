const sequelize = require('sequelize');
const model = require('../models/artesano');
const { Op } = require('sequelize');
const PARAMETROS = require("../helpers/parametros");
const moment = require('moment');
 
 

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar, 
    save,
    buscar,
    obtenerDNI,
    uploadFilartesano
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
function obtenerDNI (req, res) {

    model.findOne({
        where: { dni: req.params.dni }
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



async function uploadFilartesano(req, res, next) {
    try {
        let folder = 'artesano-app' + req.query.folder; 
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