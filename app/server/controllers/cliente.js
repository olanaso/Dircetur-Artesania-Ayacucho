const sequelize = require('sequelize');
const model = require('../models/cliente');
const { Op } = require('sequelize');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    filtrar
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

function actualizar(req, res) {

    model.findOne({
        where: {id: req.params.id}
    })
        .then(object => {
            object.update(req.body)
                .then(object => res.status(200).json(object))
                .catch(error => res.status(400).send(error))
        })
        .catch(error => res.status(400).send(error));
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


/*
function listar(req, res) {

    model.findAll()
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}
*/

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

        console.log(`bbbb: ${JSON.stringify(whereCondition)}`)

        const offset = (page - 1) * limit; // Calcular el desplazamiento
        const result = await model.findAndCountAll({ 
            where: whereCondition,
            limit: limit,
            offset: offset
        });
        console.log(`ccccc: ${result.count}`)
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